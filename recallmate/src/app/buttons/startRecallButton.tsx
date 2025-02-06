import {Button} from "@mui/material";
import { useAppContext } from "../appContext";
import { create_heap, fetchNextQuestion } from "../methods/fetches";
import { StartRecallButtonProps } from "../../../constants/type";


const StartRecallButton: React.FC<StartRecallButtonProps> = ({setQuestion, setFlipped}) => {
    const selectedTopic = useAppContext()?.selectedTopic;
    const isRecallStarted = useAppContext()?.isRecallStarted;
    const setIsRecallStarted = useAppContext()?.setIsRecallStarted;
    async function handleStart() {
        setIsRecallStarted?.(true);
        const question = await fetchNextQuestion(true);
        setQuestion(question);
        setFlipped(false);
    }

    return (
        <div style={{display: isRecallStarted ? "none" : "initial" }}>
        <Button onClick={()=> handleStart()}
      variant="outlined"
      color="primary"
      style={{marginBottom: "2%"}}>Start Recall</Button>
        </div>
    )
}

export default StartRecallButton;