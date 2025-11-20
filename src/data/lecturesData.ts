// This file contains your lecture organization
// Update this structure with your actual MP3 files and chapter organization

export interface Lecture {
  id: string;
  title: string;
  audioSrc: string; // Path to MP3 file in public/audio/
  duration?: string;
}

export interface Chapter {
  id: string;
  title: string;
  lectures: Lecture[];
}

// Example structure - replace with your actual chapters and lectures
export const chaptersData: Chapter[] = [
  {
    id: "chapter-1",
    title: "Chapter 1: Introduction",
    lectures: [
      {
        id: "lec-1-1",
        title: "Lecture 1.1 - Course Overview",
        audioSrc: "/audio/chapter1/lecture1.mp3",
        duration: "15:30",
      },
      {
        id: "lec-1-2",
        title: "Lecture 1.2 - Basic Concepts",
        audioSrc: "/audio/chapter1/lecture2.mp3",
        duration: "22:45",
      },
    ],
  },
  {
    id: "chapter-2",
    title: "Chapter 2: Fundamentals",
    lectures: [
      {
        id: "lec-2-1",
        title: "Lecture 2.1 - Core Principles",
        audioSrc: "/audio/chapter2/lecture1.mp3",
        duration: "18:20",
      },
      {
        id: "lec-2-2",
        title: "Lecture 2.2 - Advanced Topics",
        audioSrc: "/audio/chapter2/lecture2.mp3",
        duration: "25:10",
      },
    ],
  },
  {
    id: "chapter-3",
    title: "Chapter 3: Applications",
    lectures: [
      {
        id: "lec-3-1",
        title: "Lecture 3.1 - Practical Examples",
        audioSrc: "/audio/chapter3/lecture1.mp3",
        duration: "20:00",
      },
    ],
  },
];
