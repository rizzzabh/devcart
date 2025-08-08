import pandas as pd
import json
import numpy as np
from collections import Counter

def explore_ai_tools_dataset():
    """Explore the AI Tools dataset to understand its structure and quality."""
    
    print("=== AI Tools Dataset Exploration ===\n")
    
    # Load the dataset
    try:
        df = pd.read_csv('data/ai_tools_dataset.csv')
        print(f"✅ Dataset loaded successfully!")
        print(f"📊 Shape: {df.shape}")
        print(f"📋 Columns: {list(df.columns)}\n")
        
        # Basic info
        print("=== Basic Information ===")
        print(df.info())
        print("\n")
        
        # Check for missing values
        print("=== Missing Values ===")
        missing_values = df.isnull().sum()
        print(missing_values)
        print("\n")
        
        # Sample data
        print("=== Sample Data (First 3 rows) ===")
        print(df.head(3))
        print("\n")
        
        # Column analysis
        print("=== Column Analysis ===")
        for col in df.columns:
            print(f"\n--- {col} ---")
            if df[col].dtype == 'object':
                print(f"Unique values: {df[col].nunique()}")
                print(f"Sample values: {df[col].dropna().head(3).tolist()}")
            else:
                print(f"Data type: {df[col].dtype}")
                print(f"Min: {df[col].min()}, Max: {df[col].max()}")
        

        
        
    except Exception as e:
        print(f"❌ Error loading dataset: {e}")
        return None

def compare_with_sample_tools():
    """Compare AI Tools dataset with your sample tools."""
    
    print("\n=== Comparison with Sample Tools ===")
    
    # Load your sample tools
    with open('data/sample_tools.json', 'r') as f:
        sample_tools = json.load(f)
    
    print(f"Your sample tools: {len(sample_tools['tools'])}")
    print(f"AI Tools dataset: {len(pd.read_csv('data/ai_tools_dataset.csv'))}")
    
    # Show sample tool structure
    print("\nSample tool structure:")
    print(json.dumps(sample_tools['tools'][0], indent=2))

if __name__ == "__main__":
    # Explore the dataset
    df = explore_ai_tools_dataset()
    
    # Compare with your tools
    compare_with_sample_tools()
    
    print("\n=== Next Steps ===")
    print("1. Review the data quality issues")
    print("2. Plan data cleaning strategy")
    print("3. Design training data structure")
