import heapq
from datetime import datetime
from db.db_manager import DBManager
class Heap:
    def __init__(self):
        self.heap = heapq.heapify([])
        self.currentQuestion = None

    def insert(self, questions):
        self.heap = []
        for question in questions:
            heapq.heappush(self.heap, question)
        print(self.size())
    
    def set_first_question(self):
        if(len(self.heap) == 0):
            return None
        self.currentQuestion = heapq.heappop(self.heap)

    def get_next_question(self, isCurrentQuestionAnsweredCorrectly=None):
        if(self.currentQuestion == None):
            self.set_first_question()
            return self.currentQuestion
        self.currentQuestion.update_question_priorities(isCurrentQuestionAnsweredCorrectly)
        DBManager().update_question_priorities(self.currentQuestion)
        heapq.heappush(self.heap, self.currentQuestion)
        self.currentQuestion = heapq.heappop(self.heap)
        return self.currentQuestion
    
    def create_heap(self, topic_id):
        questions = DBManager().get_questions_by_topic(topic_id)
        self.insert(questions)
        self.currentQuestion = None

    def peek(self):
        return self.heap

    def size(self):
        return len(self.heap)

# if __name__ == '__main__':
#     obj = Heap()
#     obj.create_heap('2025-01-25 18:52:45')
#     obj.get_next_question()
#     obj.get_next_question(True)
#     print("HI")