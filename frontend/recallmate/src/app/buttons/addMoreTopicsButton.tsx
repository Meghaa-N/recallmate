
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { InsertTopicModalProps } from '../../../constants/type';

const AddMoreTopicsButton: React.FC<InsertTopicModalProps> = ({handleOpen}) => {
  return (
    <Button
      onClick={()=> handleOpen()}
      variant="outlined"
      color="primary"
      startIcon={<AddIcon />}
      style={{ marginLeft: "10%", marginBottom: "10%" }}
    >
      Add More Topics
    </Button>
  );
}

export default AddMoreTopicsButton;