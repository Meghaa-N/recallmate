/*
* This React Node encompasses the question card, answer card and the start recall button.
* This card also handles the flipping of the cards.
*/

import { useState } from "react";
import "./mainPanel.css";
import { useAppContext } from "../appContext";
import QuestionCard from "../flipCard/questionCard";
import AnswerCard from "../flipCard/answerCard";
import { Question } from "../../../constants/type";
import StartRecallButton from "../buttons/startRecallButton";

const FlipCard = () => {
    const [isFlipped, setFlipped] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState({ question: "", answer: "" });

    const handleFlip = () => {
        setFlipped((prev) => !prev); // Toggling between question card and abswer card
    };

    function setQuestion(question: Question) {
        setCurrentQuestion(question)
    }
    return (
        <div className="container">
            <StartRecallButton setFlipped={setFlipped} setQuestion={setQuestion}></StartRecallButton>
            <div className={`flip-card ${isFlipped ? "flipped" : ""}`} style={{ display: useAppContext()?.isRecallStarted ? "initial" : "none" }}>
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <div className="card-content">
                            <QuestionCard question={currentQuestion.question} handleFlip={handleFlip} />
                        </div>
                    </div>
                    <div className="flip-card-back">
                        <div className="card-content">
                            <AnswerCard
                                question={currentQuestion.question}
                                answer={currentQuestion.answer}
                                handleFlip={handleFlip}
                                setQuestion={setQuestion}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlipCard;
