import "./mainPanel.css";
import { useAppContext } from "../appContext";
import AddQuestionsButton from "../buttons/addQuestionButton";
import { InsertQuestionModalProps } from "../../../constants/type";


const HeaderPanel : React.FC<InsertQuestionModalProps> = ({isInsertQuestionModalOpen, handleClose, handleOpen}) => {
    const selectedTopic = useAppContext()?.selectedTopic;
  return (
    <div className="header-panel">
      <div className="header-panel_title">{selectedTopic?.name}</div>
      <AddQuestionsButton isInsertQuestionModalOpen={isInsertQuestionModalOpen} handleClose={handleClose} handleOpen={handleOpen}/>
      <div className="header-panel_subtitle">Click the "Start Recall Button" to see the Questions!</div>
      <hr></hr>
    </div>
  );
};

export default HeaderPanel;