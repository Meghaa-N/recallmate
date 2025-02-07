# Recallmate

This repository contains **Recallmate**, a personal project designed to implement the **Spaced Recognition Study Technique** to aid in long-term memory retention.

## Spaced Recognition

Spaced repetition is a learning technique that involves reviewing material at strategic intervals to enhance memory retention. Initially, these intervals are short (e.g., one hour, four hours, one day). As the material is reviewed, the intervals gradually lengthen (e.g., four days, one week, two weeks). This systematic approach ensures that the material is revisited before it is forgotten, reinforcing long-term retention.

## What Does Recallmate Do?

**Recallmate** allows users to create different topics and populate them with flashcards containing questions and answers. Each flashcard records a timestamp when it is added and updates this timestamp every time the user revisits it.

The system employs a **min-heap data structure** to determine which question should be presented next. The question that has been idle the longest receives the highest priority. Additionally, after viewing a flashcard, users can mark their response as **correct** or **incorrect**. If a question is answered incorrectly, its priority increases, altering the heap to ensure earlier repetition.

## Tech Stack

As this project originated as a personal initiative, it does not currently include user authentication or multi-user functionality.

### Backend

- **Python** service methods hosted via **Flask**
- **Heap** data structure for question prioritization
- **SQL** database for persistent storage

### Frontend

- **React.js** application for an interactive UI

## Future Enhancements

- Display the **last visited timestamp** next to topic names
- Implement a **reminder feature** to notify users when topics are overdue for review
- Deploy using **Docker/Kubernetes** for scalability and ease of hosting

This project is a work in progress, and contributions or feedback are always welcome!
