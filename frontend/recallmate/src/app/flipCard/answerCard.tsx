/*
* This React Node represents the card which displays the question along with the answer. The
* card also provides two buttons to select: Is the user remembered correctly or not. Based on
* their answer, the priority of the question will be set (if answered wrongly, it will have
* higher priority set), before the next question is loaded. 
 */
"use client";

import { AnswerCardProps } from "../../../constants/type";
import { Button } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import "./cards.css";
import { fetchNextQuestion } from "../methods/fetches";

const AnswerCard = ({ question, answer, handleFlip, setQuestion }: AnswerCardProps) => {
    async function nextQuestion(isCurrentQuestionAnsweredCorrectly: boolean) {
        const question = await fetchNextQuestion(isCurrentQuestionAnsweredCorrectly);
        setQuestion(question)
        handleFlip();
    }
  return (
    <div className="card">
      <div className="question-header">Answer</div>
      <div className="main-box" onClick={() => handleFlip()}>
        <div className="question-subheading">{question}</div>
        <div className="answer">{answer}</div>
      </div>
      <div className="button-group">
        <Button className="correct-btn" startIcon={<CheckCircle />} onClick={() => nextQuestion(true)}>
          Correct
        </Button>
        <Button className="wrong-btn" startIcon={<Cancel />} onClick={() => nextQuestion(false)}>
          Wrong
        </Button>
      </div>
    </div>
  );
};

export default AnswerCard;
