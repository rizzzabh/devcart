from flask import Flask, request, jsonify
from flask_cors import CORS
from search_model import smart_search

app = Flask(__name__)
CORS(app)

@app.route('/search', methods=['POST'])
def search():
    data = request.get_json()
    query = data.get('query', '')
    results = smart_search(query)
    return jsonify({'results': results})

if __name__ == '__main__':
    app.run(debug=True)
