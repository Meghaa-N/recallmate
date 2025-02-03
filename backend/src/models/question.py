from datetime import datetime
class Question:
    def __init__(self, question, answer, topic, last_visited=None, priority=None, id=None):
        self.id = id if id != None else f"q{datetime.now().timestamp()}" # Unique ID
        self.question = question
        self.answer = answer
        self.topic = topic
        self.last_visited = last_visited if last_visited != None else datetime.now()
        self.priority = priority if priority != None else 0
    
    def get_id(self):
        return self.id

    def get_question(self):
        return self.question
    
    def set_question(self, question):
        self.question = question
    
    def get_answer(self):
        return self.answer
    
    def set_answer(self, answer):
        self.answer = answer
    
    def get_topic(self):
        return self.topic
    
    def get_last_visited(self):
        return self.last_visited
    
    def set_last_visited(self):
        self.last_visited = datetime.now()
    
    def get_priority(self):
        return self.priority
    
    def set_priority(self, isAnswerCorrect):
        self.priority = max(0, self.priority - 1) if isAnswerCorrect else (self.priority + 1)
    
    def update_question_priorities(self, isAnswerCorrect=None):
        if(isAnswerCorrect != None):
            self.set_last_visited()
            self.set_priority(isAnswerCorrect)
    
    def __lt__(self, other):
        # Compare by last visited, priority, and then ID as a tiebreaker
        if self.last_visited != other.last_visited:
            return self.last_visited < other.last_visited
        if self.priority != other.priority:
            return self.priority > other.priority
        return self.id < other.id  # Use ID as a tiebreaker

