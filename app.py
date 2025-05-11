from flask import Flask, jsonify, request # type: ignore
from flask_cors import CORS # type: ignore

app = Flask(__name__)
CORS(app)

tasks = []

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks/<int:index>', methods=['DELETE'])
def delete_task(index):
    if 0 <= index < len(tasks):
        tasks.pop(index)
        return jsonify({"message": "Silindi"}), 200
    return jsonify({"error": "Geçersiz index"}), 400

@app.route('/tasks/<int:index>', methods=['PUT'])
def update_task(index):
    if 0 <= index < len(tasks):
        data = request.get_json()
        tasks[index].update(data)
        return jsonify(tasks[index]), 200
    return jsonify({"error": "Geçersiz index"}), 400

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    tasks.append(data)
    return jsonify({"message": "Task is added!"}), 201

@app.route('/')
def index():
    return "Flask backend is working!"