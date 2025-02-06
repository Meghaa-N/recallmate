import {InsertTopicModalProps} from '../../../constants/type';
import { useState } from 'react';
import { useAppContext } from "../appContext";
import HeaderPanel from "./headerPanel";
import InsertTopicModal from '../modals/insertTopicModal';
import FlipCard from './displayCard';
import InsertQuestionModal from '../modals/insertQuestionModal';

const MainPanel: React.FC<InsertTopicModalProps> = ({isInsertTopicModalOpen, handleClose, handleOpen}) => {
    const AppContext = useAppContext();
    const [isInsertQuestionModalOpen, setIsInsertQuestionModalOpen] = useState(false);
    const handleQuestionModalOpen = () => setIsInsertQuestionModalOpen(true);
    const handleQuestionModalClose = () => setIsInsertQuestionModalOpen(false);
    return (<div
        style={{
          flex: 1,
          marginLeft: "250px",
          backgroundColor: "#f8f9fa",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        
        <InsertTopicModal isInsertTopicModalOpen={isInsertTopicModalOpen} handleClose={handleClose} handleOpen={handleOpen}/>
        <InsertQuestionModal isInsertQuestionModalOpen={isInsertQuestionModalOpen} handleClose={handleQuestionModalClose} handleOpen={handleQuestionModalOpen} />
        <HeaderPanel isInsertQuestionModalOpen={isInsertQuestionModalOpen} handleClose={handleQuestionModalClose} handleOpen={handleQuestionModalOpen}/>
        <FlipCard/>
      </div>
    );
}

export default MainPanel;