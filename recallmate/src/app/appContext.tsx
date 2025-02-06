
// App context to store the selected topic. This context is used to pass the selected topic to the all the components
// that need it.

import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import { Topic } from "../../constants/type";

interface AppContextType {
  selectedTopic: Topic;
  setSelectedTopic: Dispatch<SetStateAction<any>>;
  topics: Topic[];
  setTopics: Dispatch<SetStateAction<Topic[]>>;
  isRecallStarted: boolean;
  setIsRecallStarted: Dispatch<SetStateAction<boolean>>;
}


const AppContext = createContext<AppContextType | null>(null);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [selectedTopic, setSelectedTopic] = useState({ id: "", name: "" });
  const [topics, setTopics] = useState<Topic[]>([]); // State to store topics
  const [isRecallStarted, setIsRecallStarted] = useState(false);

  return (
    <AppContext.Provider value={{ selectedTopic, setSelectedTopic, topics, setTopics, isRecallStarted, setIsRecallStarted }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);