/* 
The file contains functions to make API Calls to the server.
*/

import URLS from "../../../constants/urls";

export async function fetchDataFromServer(url: string, properties: any) {
  try {
    const res = await fetch(URLS.default + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(properties),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function fetchTopics() {
    return await fetchDataFromServer(URLS.get_all_topics, {});
}

export async function create_heap(topic_id: string) {
   return await fetchDataFromServer(URLS.create_heap, { topic_id: topic_id })
}

export async function create_topic(topic_name: string) {
  return await fetchDataFromServer(URLS.create_topic, { name: topic_name })
}

export async function fetchNextQuestion(isCurrentQuestionAnsweredCorrectly: boolean) {
  return await fetchDataFromServer(URLS.get_next_question, { isCurrentQuestionAnsweredCorrectly: isCurrentQuestionAnsweredCorrectly });
}

export async function insert_question(topic: string, question: string, answer: string) {
  return await fetchDataFromServer(URLS.insert_question, {topic: topic, question: question, answer: answer});
}