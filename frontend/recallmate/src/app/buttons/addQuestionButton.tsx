
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { InsertQuestionModalProps } from '../../../constants/type';

const AddQuestionsButton: React.FC<InsertQuestionModalProps> = ({handleOpen}) => {
  return (
    <Button
      onClick={()=> handleOpen()}
      variant="outlined"
      color="primary"
      startIcon={<AddIcon />}
      style={{marginBottom: "2%"}}
    >
      Add Question
    </Button>
  );
}

export default AddQuestionsButton;