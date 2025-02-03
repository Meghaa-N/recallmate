from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
from services.services import TopicManager

app = Flask(__name__)

topic_manager = TopicManager()
app.register_blueprint(topic_manager.blueprint, url_prefix='/api')
CORS(app)


if __name__ == '__main__':
    app.run(debug=True)