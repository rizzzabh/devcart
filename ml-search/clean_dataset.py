import pandas as pd
import json
import numpy as np
from collections import Counter
import re

def clean_ai_tools_dataset():
    """Clean and prepare the AI Tools dataset for training."""
    
    
    # Load dataset with low_memory=False to avoid warnings
    df = pd.read_csv('data/ai_tools_dataset.csv', low_memory=False)
    
    # Select relevant columns
    relevant_columns = [
        'company_name', 'short_description', 'primary_task', 
        'applicable_tasks', 'full_description', 'pros', 'cons'
    ]
    
    # Create cleaned dataset
    cleaned_df = df[relevant_columns].copy()
    
    # Remove rows with missing essential data
    cleaned_df = cleaned_df.dropna(subset=['company_name', 'short_description', 'primary_task'])
    
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

    
    # Save cleaned dataset
    cleaned_df.to_csv('data/processed/ai_tools_clean.csv', index=False)
    
    return cleaned_df

def create_training_pairs(cleaned_df):
    """Create query-tag training pairs from the cleaned dataset."""
    
    
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
    
    
    with open('data/processed/training_pairs.json', 'w') as f:
        json.dump(training_pairs, f, indent=2)
    
    
    return training_pairs


if __name__ == "__main__":

    cleaned_df = clean_ai_tools_dataset()

    training_pairs = create_training_pairs(cleaned_df)
 
    
