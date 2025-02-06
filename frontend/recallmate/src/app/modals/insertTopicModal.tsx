import React from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { InsertTopicModalProps } from "../../../constants/type";
import { fetchTopics, create_topic } from "../methods/fetches";
import { useAppContext } from "../appContext";

const InsertTopicModal: React.FC<InsertTopicModalProps> = ({ isInsertTopicModalOpen, handleClose, handleOpen}) => {
    
    const appContext = useAppContext();
    const topics = appContext?.topics;
    const setSelectedTopic = appContext?.setSelectedTopic;
    const setIsRecallStarted = appContext?.setIsRecallStarted;
    async function InsertTopic(topic_name: string) {
      try {

        const data = await create_topic(topic_name)
        if (data) {
          handleClose();
          setSelectedTopic?.(data);
          const newTopics = await fetchTopics();
          console.log(newTopics)
          topics && appContext?.setTopics(newTopics);
          setIsRecallStarted && setIsRecallStarted(false);
          
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
      
    };
    
     
    
    return (
    <Modal open={isInsertTopicModalOpen} onClose={handleClose} aria-labelledby="small-modal">
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
              Topic Name:
              <input type="text" name="topic_name" style={{ paddingLeft:"3%"}}/>
            </label>
          </form>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={(e) => InsertTopic((document.getElementsByName("topic_name")[0] as HTMLInputElement).value)}>
            Insert
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InsertTopicModal;
