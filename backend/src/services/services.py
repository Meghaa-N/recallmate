from models.heap import Heap
from db.db_manager import DBManager
from flask import Flask, request, jsonify, Blueprint

class TopicManager:
    def __init__(self):
        self.heap = Heap()
        self.db_manager = DBManager()
        self.blueprint = Blueprint('topic_manager', __name__)
        self.add_routes()

    def add_routes(self):
        @self.blueprint.route('/create_topic', methods=['POST'])
        def create_topic():
            data = request.get_json()
            newTopic = self.db_manager.insert_topic(data['name'])
            return jsonify(newTopic.__dict__)

        @self.blueprint.route('/rename_topic', methods=['POST'])
        def rename_topic():
            data = request.get_json()
            result = self.db_manager.rename_topic(data['topic_id'], data['new_topic'])
            return jsonify(success=result)

        @self.blueprint.route('/delete_topic', methods=['POST'])
        def delete_topic():
            data = request.get_json()
            result = self.db_manager.delete_topic(data['topic_id'])
            return jsonify(success=result)

        @self.blueprint.route('/create_heap', methods=['POST'])
        def create_heap():
            data = request.get_json()
            self.heap.create_heap(data['topic_id'])
            return jsonify(success=self.heap.size())

        @self.blueprint.route('/insert_question', methods=['POST'])
        def insert_question():
            data = request.get_json()
            result = self.db_manager.insert_question(data['question'], data['answer'], data['topic'])
            return jsonify(success=result)

        @self.blueprint.route('/update_question', methods=['POST'])
        def update_question():
            data = request.get_json()
            result = self.db_manager.update_question(data['question_id'], data['question'], data['answer'], data['topic'])
            return jsonify(success=result)

        @self.blueprint.route('/delete_question', methods=['POST'])
        def delete_question():
            data = request.get_json()
            self.db_manager.delete_question(data['question_id'])
            return jsonify(success=True)

        @self.blueprint.route('/get_next_question', methods=['POST'])
        def get_next_question():
            data = request.get_json()
            question = self.heap.get_next_question(data['isCurrentQuestionAnsweredCorrectly'])
            return question.__dict__

        @self.blueprint.route('/get_first_question', methods=['POST'])
        def get_first_question():
            question = self.heap.get_first_question()
            return jsonify({
                'question': question.get_question(),
                'answer': question.get_answer()
            })
        @self.blueprint.route('/get_all_topics', methods=['POST'])
        def get_all_topics():
            topics = self.db_manager.get_all_topics()
            return [{'id': topic.get_id(), 'name': topic.get_name()} for topic in topics]

        @self.blueprint.route('/meghaa', methods=['POST','GET'])
        def meghaa():
            return jsonify('meghaa')
        @self.blueprint.route('/meghaa', methods=['OPTIONS'])
        def handle_ptions():
            response = jsonify(success=True)
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            return response




