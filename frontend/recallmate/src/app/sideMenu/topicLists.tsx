"use client";

import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import {Topic} from "../../../constants/type";
import { useAppContext } from "../appContext";
import { create_heap, fetchTopics } from "../methods/fetches";
const TopicLists = () => {
  const [topics, setTopics] = useAppContext()?[useAppContext()?.topics, useAppContext()?.setTopics]:useState<Topic[]>([]); // State to store topics
  const [loading, setLoading] = useState(true); // State to manage loading
  const appContext = useAppContext();
  const selectedTopic = appContext?.selectedTopic;
  const setSelectedTopic = appContext?.setSelectedTopic;
  const setIsRecallStarted = appContext?.setIsRecallStarted;
  useEffect(() => {
    async function loadTopics() {
    const data = await fetchTopics();
    setTopics?.(data);
    setLoading(false);
    handleTopicSelection(data[0]);
    }
    loadTopics();
  }, []);

  async function handleTopicSelection(topicChosen: Topic) {
    setSelectedTopic && setSelectedTopic(topicChosen);
   
      const heap_creation = await create_heap(topicChosen.id);
      setIsRecallStarted && setIsRecallStarted(false);
      if (!heap_creation.success) {
        alert("Something went wrong. Try again later!");
      }
      
  }

  if (loading) {
    return <div className="text-center mt-5" style={{ color: "#d0d6d6"}}>Loading...</div>;
  }

  return (
    <>
    <div className="header-panel_subtitle2">Your Current Topics</div>
    <Nav variant="pills" className="flex-column p-4"  >
      {topics?.map((topic) => (
        <Nav.Item key={topic.id} className="mb-2">
          <Nav.Link
            eventKey={topic.id.toString()}
            style={{
              backgroundColor: (selectedTopic?.id === topic.id) ? "#86b9b0" : "#042630",
              color: selectedTopic?.id === topic.id ? "#041421" : "#d0d6d6"
            }}
            onClick={() => handleTopicSelection(topic)}
          >
            {topic.name}
          </Nav.Link>
        </Nav.Item>
      ))}
    </Nav>
    </>
    
  );
}

export default TopicLists;