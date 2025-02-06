import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { InsertQuestionModalProps } from "../../../constants/type";
import { create_heap, insert_question } from "../methods/fetches";
import { useAppContext } from "../appContext";

const InsertQuestionModal: React.FC<InsertQuestionModalProps> = ({ isInsertQuestionModalOpen, handleClose, handleOpen}) => {
    
    const appContext = useAppContext();
    const selectedTopic = appContext?.selectedTopic;
    async function InsertQuestion(question: string, answer: string) {
      if (selectedTopic) {
        const data = await insert_question(selectedTopic.id, question, answer);
        if(data.success) {
            const heapRefresh = await create_heap(selectedTopic.id);
            if(heapRefresh)
            {
                alert("Question Successfully Inserted")
            
            }
            handleClose();
            
        }
        else{
            alert("Something went wrong. Try again later!")
        }
        
      } else {
        console.error("Selected topic is undefined");
      }
    };
    
     
    
    return (
    <Modal open={isInsertQuestionModalOpen} onClose={handleClose} aria-labelledby="small-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "#f5f5f5", // Mild grey background
          borderRadius: "8px",
          boxShadow: 24,
          p: 3,
          textAlign: "center",
        }}
      >
        <Typography id="small-modal" variant="h6" mb={2}>
          <form>
            <label>
              Question
              <input type="text" name="question" style={{ paddingLeft:"3%"}}/>
            </label>
            <label>
              Answer
              <input type="text" name="answer" style={{ paddingLeft:"3%"}}/>
            </label>
          </form>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={(e) => InsertQuestion((document.getElementsByName("question")[0] as HTMLInputElement).value, (document.getElementsByName("answer")[0] as HTMLInputElement).value)}>
            Insert
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InsertQuestionModal;
