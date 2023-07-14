from flask import Flask, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app, resources=['/api/*'])
# cors = CORS(app, resources={r'/api/*': {'origin': 'http://localhost'}})

class TrieNode:
    def __init__(self):
        self.children = {}
        self.isEnd = False

def insert_word(root, word):
    node = root
    for char in word:
        if not node.children.get(char):
            node.children[char] = TrieNode()
        node = node.children.get(char)
    node.isEnd = True

def generate_random_word(root):
    node = root
    word = ""
    path = []
    while True:
        if node.isEnd:
            break
        chars = node.children.keys()
        randomChar = random.choice(list(chars))
        word += randomChar
        path.append(node)
        node = node.children.get(randomChar)
    
    # removes the word from the trie
    while node != root:
        if node.children:
            break
        del node
        node = path.pop()
    return word

def lookup(root, word):
    node = root
    for char in word:
        node = node.children.get(char)
        if not node:
            return False
    return node.isEnd

def buildFromFile(filename):
    root = TrieNode()
    num = 0
    with open(filename, 'r') as f:
        for line in f:
            word = line.rstrip()
            if word:
                insert_word(root, word)
                num += 1
    assert num == 5757
    return root


rootTrie = buildFromFile("backend/5LetterWords.txt")
usedWordsTrie = TrieNode()

# Routes
@app.route("/api/word_exists/<word>/")
def word_exists(word):
    result = lookup(rootTrie, word) or lookup(usedWordsTrie, word)
    return jsonify({"exists": result})
    
@app.route("/api/get_word/")
def get_word():
    word = generate_random_word(rootTrie)
    print("word")
    insert_word(usedWordsTrie, word)
    return jsonify({"word": word})

@app.route("/api/letters/")
def get_letters():
    letters = "abcdefghijklmnopqrstuvwxyz"
    lst = [0] * len(letters)
    for i in range(len(letters)):
        lst[i] = dict()
        lst[i]["key"] = letters[i]
    return jsonify(lst)

@app.route("/used_words/")
def usedWords():
    words = []
    def dfs(node, currWord):
        if node.isEnd:
            words.append(currWord)
        for char, child in node.children.items():
            dfs(child, currWord + char)
    dfs(usedWordsTrie, "")
    return words

    


if __name__ == '__main__':
    app.run(port= 8000, debug=True)
