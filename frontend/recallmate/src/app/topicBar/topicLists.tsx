"use client";

import { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import {Topic,TopicListsProps} from "../../../constants/type";
import URLS from "../../../constants/urls";
import { useAppContext } from "../appContext";
import React from "react";

const TopicLists = () => {
  const [topics, setTopics] = useState<Topic[]>([]); // State to store topics
  const [loading, setLoading] = useState(true); // State to manage loading
  const appContext = useAppContext();
  const selectedTopic = appContext?.selectedTopic;
  const setSelectedTopic = appContext?.setSelectedTopic;
  useEffect(() => {
    async function fetchTopics() {
      try {
        const res = await fetch(URLS.default + "/get_all_topics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        setTopics(data);
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, []);

  if (loading) {
    return <div className="text-center mt-5" style={{ color: "#d0d6d6" }}>Loading...</div>;
  }

  return (
    <>
    <hr></hr>
    <div className="header-panel_subtitle2">Your Current Topics</div>
    <Nav variant="pills" className="flex-column p-3 " >
      {topics.map((topic) => (
        <Nav.Item key={topic.id} className="mb-2">
          <Nav.Link
            eventKey={topic.id.toString()}
            style={{
              backgroundColor: (selectedTopic === topic) ? "#86b9b0" : "#042630",
              color: selectedTopic === topic ? "#041421" : "#d0d6d6"
            }}
            onClick={() => setSelectedTopic && setSelectedTopic(topic)}
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