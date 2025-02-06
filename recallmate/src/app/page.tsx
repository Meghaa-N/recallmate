"use client";
import { useState, createContext } from "react";
import Sidebar from "./sideMenu/sidebar";
import MainPanel from "./questionPanel/mainPanel";
import {
  AppProvider
} from "./appContext";

export default function Home() {
  const [isInsertTopicModalOpen, setIsInsertTopicModalOpen] = useState(false);
  const handleOpen = () => setIsInsertTopicModalOpen(true);
  const handleClose = () => setIsInsertTopicModalOpen(false);
  return (
    <AppProvider>
      <div style={{overflow: "auto"}}>
      <Sidebar handleOpen={handleOpen} isInsertTopicModalOpen={isInsertTopicModalOpen} handleClose={handleClose}/>
      <MainPanel isInsertTopicModalOpen={isInsertTopicModalOpen} handleClose={handleClose} handleOpen={handleOpen}/>
      </div>
    </AppProvider>
  );
}
