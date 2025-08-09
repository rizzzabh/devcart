import pandas as pd
import json
import numpy as np
from collections import Counter
import re

def clean_ai_tools_dataset():
    """Clean and prepare the AI Tools dataset for training."""
    
    print("=== Cleaning AI Tools Dataset ===\n")
    
    # Load dataset with low_memory=False to avoid warnings
    df = pd.read_csv('data/ai_tools_dataset.csv', low_memory=False)
    print(f"📊 Original dataset: {df.shape}")
    
    # Select relevant columns
    relevant_columns = [
        'company_name', 'short_description', 'primary_task', 
        'applicable_tasks', 'full_description', 'pros', 'cons'
    ]
    
    # Create cleaned dataset
    cleaned_df = df[relevant_columns].copy()
    
    # Remove rows with missing essential data
    cleaned_df = cleaned_df.dropna(subset=['company_name', 'short_description', 'primary_task'])
    print(f"📊 After removing missing data: {cleaned_df.shape}")
    
    # Clean text data
    def clean_text(text):
        if pd.isna(text):
            return ""
        # Remove special characters and normalize
        text = str(text)
        text = re.sub(r'[^\w\s]', ' ', text)
        text = re.sub(r'\s+', ' ', text)
        return text.strip().lower()
    
    # Clean all text columns
    for col in ['short_description', 'full_description', 'pros', 'cons']:
        cleaned_df[col] = cleaned_df[col].apply(clean_text)
    
    # Clean applicable_tasks (split and clean)
    def clean_applicable_tasks(tasks_str):
        if pd.isna(tasks_str):
            return []
        tasks = [task.strip().lower() for task in str(tasks_str).split(',')]
        tasks = [task for task in tasks if len(task) > 2]  # Remove very short tasks
        return tasks
    
    cleaned_df['applicable_tasks_clean'] = cleaned_df['applicable_tasks'].apply(clean_applicable_tasks)
    
    # Create combined text for each tool
    def create_combined_text(row):
        """Combine all text fields for better representation."""
        texts = []
        if row['short_description']:
            texts.append(row['short_description'])
        if row['full_description']:
            texts.append(row['full_description'])
        if row['pros']:
            texts.append(row['pros'])
        if row['cons']:
            texts.append(row['cons'])
        return ' '.join(texts)
    
    cleaned_df['combined_text'] = cleaned_df.apply(create_combined_text, axis=1)
    
    # Extract unique tasks for analysis
    all_tasks = []
    for tasks in cleaned_df['applicable_tasks_clean']:
        all_tasks.extend(tasks)
    
    task_counts = Counter(all_tasks)
    print(f"\n📋 Total unique tasks: {len(task_counts)}")
    print(f"🏆 Top 20 tasks: {task_counts.most_common(20)}")
    
    # Save cleaned dataset
    cleaned_df.to_csv('data/processed/ai_tools_clean.csv', index=False)
    print(f"\n✅ Cleaned dataset saved to: data/processed/ai_tools_clean.csv")
    
    return cleaned_df

def create_training_pairs(cleaned_df):
    """Create query-tag training pairs from the cleaned dataset."""
    
    print("\n=== Creating Training Pairs ===\n")
    
    training_pairs = []
    
    # Method 1: Use short descriptions as queries, tasks as tags
    for _, row in cleaned_df.iterrows():
        if row['short_description'] and row['applicable_tasks_clean']:
            query = row['short_description']
            tags = row['applicable_tasks_clean']
            training_pairs.append({
                'query': query,
                'tags': tags,
                'source': 'description_to_tasks'
            })
    
    # Method 2: Use primary task as query, applicable tasks as tags
    for _, row in cleaned_df.iterrows():
        if row['primary_task'] and row['applicable_tasks_clean']:
            query = row['primary_task'].lower()
            tags = row['applicable_tasks_clean']
            training_pairs.append({
                'query': query,
                'tags': tags,
                'source': 'primary_task_to_tasks'
            })
    
    # Method 3: Create synthetic queries from pros/cons
    for _, row in cleaned_df.iterrows():
        if row['pros'] and row['applicable_tasks_clean']:
            # Extract key phrases from pros
            pros_text = row['pros']
            if len(pros_text) > 20:  # Only if pros has substantial content
                # Create a query from the first part of pros
                query = ' '.join(pros_text.split()[:10])  # First 10 words
                tags = row['applicable_tasks_clean']
                training_pairs.append({
                    'query': query,
                    'tags': tags,
                    'source': 'pros_to_tasks'
                })
    
    print(f"📊 Created {len(training_pairs)} training pairs")
    
    # Save training pairs
    with open('data/processed/training_pairs.json', 'w') as f:
        json.dump(training_pairs, f, indent=2)
    
    print(f"✅ Training pairs saved to: data/processed/training_pairs.json")
    
    # Show sample training pairs
    print(f"\n📝 Sample Training Pairs:")
    for i, pair in enumerate(training_pairs[:5]):
        print(f"\n{i+1}. Query: '{pair['query'][:100]}...'")
        print(f"   Tags: {pair['tags'][:5]}...")
        print(f"   Source: {pair['source']}")
    
    return training_pairs

def analyze_training_data(training_pairs):
    """Analyze the created training data."""
    
    print("\n=== Training Data Analysis ===\n")
    
    # Analyze query lengths
    query_lengths = [len(pair['query'].split()) for pair in training_pairs]
    print(f"📏 Query length stats:")
    print(f"   Average: {np.mean(query_lengths):.1f} words")
    print(f"   Min: {min(query_lengths)} words")
    print(f"   Max: {max(query_lengths)} words")
    
    # Analyze tag counts
    tag_counts = [len(pair['tags']) for pair in training_pairs]
    print(f"\n🏷️ Tag count stats:")
    print(f"   Average: {np.mean(tag_counts):.1f} tags per query")
    print(f"   Min: {min(tag_counts)} tags")
    print(f"   Max: {max(tag_counts)} tags")
    
    # Analyze unique tags
    all_tags = []
    for pair in training_pairs:
        all_tags.extend(pair['tags'])
    
    unique_tags = set(all_tags)
    print(f"\n📋 Unique tags: {len(unique_tags)}")
    print(f"🏆 Most common tags: {Counter(all_tags).most_common(10)}")

if __name__ == "__main__":
    # Clean the dataset
    cleaned_df = clean_ai_tools_dataset()
    
    # Create training pairs
    training_pairs = create_training_pairs(cleaned_df)
    
    # Analyze the training data
    analyze_training_data(training_pairs)
    
    print("\n=== Next Steps ===")
    print("1. Review the cleaned dataset")
    print("2. Examine training pairs quality")
    print("3. Design the LSTM model architecture")
    print("4. Prepare for model training")
