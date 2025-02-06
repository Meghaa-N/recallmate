import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopicList from './topicLists';
import {InsertTopicModalProps} from '../../../constants/type';
import HeaderPanel from './headerPanel';
import AddMoreTopicsButton from '../buttons/addMoreTopicsButton';

const Sidebar: React.FC<InsertTopicModalProps> = ({isInsertTopicModalOpen, handleOpen, handleClose}) => {
  return (
    <div className="position-fixed text-white" style={{ width: '270px', height: '100vh' , overflow: "auto", backgroundColor: "#041421", color: "#d0d6d6" }}>
      <HeaderPanel/>
      <AddMoreTopicsButton handleOpen={handleOpen} isInsertTopicModalOpen={isInsertTopicModalOpen} handleClose={handleClose}/>
      <TopicList />
    </div>
  );
};

export default Sidebar;