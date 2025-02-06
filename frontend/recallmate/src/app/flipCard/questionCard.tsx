"use client";
/*
* This React Node displayes questions to the user. The user can touch the card, to reveal the answer.
*/
import {QuestionCardProps} from "../../../constants/type";
import "./cards.css";

const QuestionCard = ({ question, handleFlip }: QuestionCardProps) => {
  
  return (
    <div className="card">
    <div className="question-header">Question</div>
    <div className="main-box" onClick={handleFlip}>{question}</div>
    </div>
    
  );
}

export default QuestionCard;