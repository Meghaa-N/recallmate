export interface Topic {
      id: string;
      name: string;
}
export interface Question {
      id: string;
      question: string;
      answer: string;
      topic_id: string;
}
export interface TopicListsProps {
      selectedTopic: Topic | null;
      setSelectedTopic: (topic: Topic) => void;
}

export interface InsertTopicModalProps {
      isInsertTopicModalOpen: boolean;
      handleClose: () => void;
      handleOpen: () => void;
}

export interface InsertQuestionModalProps {
      isInsertQuestionModalOpen: boolean;
      handleClose: () => void;
      handleOpen: () => void;
}

export interface QuestionCardProps {
      question: string;
      handleFlip: () => void;
}

export interface AnswerCardProps {
      question: string;
      answer: string;
      handleFlip: () => void;
      setQuestion: (question: Question) => void;
}

export interface StartRecallButtonProps {
      setQuestion: (question: any) => void;
      setFlipped: (flipped: boolean) => void;
  }