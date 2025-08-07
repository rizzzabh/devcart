import json
import os
import numpy as np
import pandas as pd
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Download NLTK resources if not already present
nltk.download('punkt', quiet=True)
nltk.download('wordnet', quiet=True)
nltk.download('omw-1.4', quiet=True)
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

# Load tools data
DATA_PATH = os.path.join(os.path.dirname(__file__), 'data', 'sample_tools.json')
with open(DATA_PATH, 'r') as f:
    data = json.load(f)
    tools = data['tools']

lemmatizer = WordNetLemmatizer()

# Simple keyword expansion dictionary
KEYWORD_EXPANSION = {
    'api': ['api', 'rest', 'endpoint', 'service'],
    'react': ['react', 'javascript', 'ui'],
    'database': ['database', 'sql', 'nosql', 'mongodb', 'mysql', 'redis'],
    'testing': ['testing', 'test', 'e2e', 'unit'],
    'container': ['container', 'docker', 'kubernetes', 'orchestration'],
    'cloud': ['cloud', 'aws', 'cli'],
    'frontend': ['frontend', 'ui', 'design'],
    'backend': ['backend', 'server', 'nodejs', 'express'],
    'ci': ['ci', 'cd', 'jenkins', 'automation'],
    'editor': ['editor', 'ide', 'code'],
}

def preprocess(text):
    tokens = word_tokenize(text.lower())
    tokens = [lemmatizer.lemmatize(t) for t in tokens if t.isalnum()]
    return ' '.join(tokens)

def expand_keywords(query):
    tokens = word_tokenize(query.lower())
    expanded = set(tokens)
    for t in tokens:
        if t in KEYWORD_EXPANSION:
            expanded.update(KEYWORD_EXPANSION[t])
    return ' '.join(expanded)

def smart_search(query):
    # Preprocess and expand query
    preprocessed_query = preprocess(query)
    expanded_query = expand_keywords(preprocessed_query)

    # Prepare tool descriptions
    tool_texts = [preprocess(tool['name'] + ' ' + tool['description'] + ' ' + ' '.join(tool['tags'])) for tool in tools]

    # Vectorize
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(tool_texts + [expanded_query])
    query_vec = tfidf_matrix[-1]
    tool_vecs = tfidf_matrix[:-1]

    # Compute cosine similarity
    similarities = cosine_similarity(query_vec, tool_vecs).flatten()

    # Rank tools
    ranked_indices = np.argsort(similarities)[::-1]
    ranked_tools = []
    for idx in ranked_indices:
        tool = tools[idx].copy()
        tool['score'] = float(similarities[idx])
        ranked_tools.append(tool)
    # Return top 5
    return ranked_tools[:5]
