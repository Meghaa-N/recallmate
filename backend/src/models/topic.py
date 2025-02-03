from datetime import datetime

class Topic:
    def __init__(self, name, id=None):
        self.id = id if id != None else f"{datetime.now()}"
        self.name = name

    def get_id(self):
        return self.id
    
    def get_name(self):
        return self.name
    
    def set_name(self, name):
        self.name = name
