from datetime import datetime
import pymysql
from etc import constants
from models.question import Question
from models.topic import Topic


class DBManager:
    """
    Database Manager to handle CRUD operations for topics and questions.
    Manages the connection to the database and provides methods to interact with the data.
    """

    def __init__(self):
        """
        Initializes the DBManager with the database configuration and establishes a connection.
        """
        self.db_config = constants.db_config
        self.connection = self.get_db_connection()
        self.cursor = self.connection.cursor()

    def get_db_connection(self):
        """
        Establishes a connection to the database using the configuration.

        Returns:
            pymysql.connections.Connection: The database connection object.
        """

        return pymysql.connect(**self.db_config)

    def insert_topic(self, topic):
        """
        Inserts a new topic into the database.

        Args:
            topic (str): The name of the topic.

        Returns:
            Topic: The created Topic object if successful, otherwise False.
        """

        new_topic_obj = Topic(topic)
        query = "INSERT INTO topic (id, name) VALUES (%s, %s)"
        try:
            self.cursor.execute(query, (new_topic_obj.get_id(), new_topic_obj.get_name()))
            self.connection.commit()
            return new_topic_obj
        except Exception as e:
            print(f"Error inserting topic: {e}")
            return False

    def rename_topic(self, topic_id, new_topic):
        """
        Renames an existing topic.

        Args:
            topic_id (str): The ID of the topic to rename.
            new_topic (str): The new name for the topic.

        Returns:
            bool: True if successful, otherwise False.
        """

        query = "UPDATE topic SET name = %s WHERE id = %s"
        try:
            self.cursor.execute(query, (new_topic, topic_id))
            self.connection.commit()
            return True
        except Exception as e:
            print(f"Error renaming topic: {e}")
            return False

    def delete_topic(self, topic_id):
        """
        Deletes a topic by its ID.

        Args:
            topic_id (str): The ID of the topic to delete.

        Returns:
            bool: True if successful, otherwise False.
        """

        query = "DELETE FROM topic WHERE id = %s"
        try:
            self.cursor.execute(query, (topic_id,))
            self.connection.commit()
            return True
        except Exception as e:
            print(f"Error deleting topic: {e}")
            return False

    def get_all_topics(self):
        """
        Retrieves all topics from the database.

        Returns:
            list[Topic]: A list of Topic objects.
        """

        query = "SELECT id, name FROM topic"
        self.cursor.execute(query)
        rows = self.cursor.fetchall()
        return [Topic(row[1], row[0]) for row in rows]

    def insert_question(self, question, answer, topic):
        """
        Inserts a new question into the database.

        Args:
            question (str): The question text.
            answer (str): The answer text.
            topic (str): The topic associated with the question.

        Returns:
            bool: True if successful, otherwise False.
        """

        new_question_obj = Question(question, answer, topic)
        query = """
            INSERT INTO questions (id, question, answer, topic, last_visited, priority) 
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        try:
            self.cursor.execute(query, (
                new_question_obj.get_id(),
                new_question_obj.get_question(),
                new_question_obj.get_answer(),
                new_question_obj.get_topic(),
                new_question_obj.get_last_visited(),
                new_question_obj.get_priority()
            ))
            self.connection.commit()
            return True
        except Exception as e:
            print(f"Error inserting question: {e}")
            return False

    def update_question(self, question, answer, topic):
        """
        Updates an existing question's details.

        Args:
            question (str): The updated question text.
            answer (str): The updated answer text.
            topic (str): The updated topic.

        Returns:
            bool: True if successful, otherwise False.
        """

        query = "UPDATE questions SET question = %s, answer = %s, topic = %s WHERE id = %s"
        try:
            self.cursor.execute(query, (question, answer, topic, question.get_id()))
            self.connection.commit()
            return True
        except Exception as e:
            print(f"Error updating question: {e}")
            return False

    def delete_question(self, question_id):
        """
        Deletes a question by its ID.

        Args:
            question_id (str): The ID of the question to delete.

        Returns:
            bool: True if successful, otherwise False.
        """

        query = "DELETE FROM questions WHERE id = %s"
        try:
            self.cursor.execute(query, (question_id,))
            self.connection.commit()
            return True
        except Exception as e:
            print(f"Error deleting question: {e}")
            return False

    def get_questions_by_topic(self, topic):
        """
        Retrieves all questions associated with a specific topic.

        Args:
            topic (str): The topic name.

        Returns:
            list[Question]: A list of Question objects.
        """

        query = "SELECT question, answer, topic, last_visited, priority, id FROM questions WHERE topic = %s"
        self.cursor.execute(query, (topic,))
        rows = self.cursor.fetchall()
        return [Question(row[0], row[1], row[2], row[3], row[4], row[5]) for row in rows]

    def update_question_priorities(self, question):
        """
        Updates the priority and last visited timestamp of a question.

        Args:
            question (Question): The Question object to update.

        Returns:
            bool: True if successful, otherwise False.
        """
        
        query = """
            UPDATE questions 
            SET last_visited = %s, priority = %s 
            WHERE id = %s
        """
        try:
            self.cursor.execute(query, (
                question.get_last_visited(),
                question.get_priority(),
                question.get_id()
            ))
            self.connection.commit()
            return True
        except Exception as e:
            print(f"Error updating question priorities: {e}")
            return False
