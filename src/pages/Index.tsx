import { useState } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { ChapterCard } from "@/components/ChapterCard";
import { chaptersData, Lecture } from "@/data/lecturesData";
import { Button } from "@/components/ui/button";
import { BookOpen, X } from "lucide-react";

const Index = () => {
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);

  const handleSelectLecture = (lecture: Lecture) => {
    setSelectedLecture(lecture);
    
    // Find the chapter and lecture indices
    chaptersData.forEach((chapter, chapterIdx) => {
      const lectureIdx = chapter.lectures.findIndex((l) => l.id === lecture.id);
      if (lectureIdx !== -1) {
        setCurrentChapterIndex(chapterIdx);
        setCurrentLectureIndex(lectureIdx);
      }
    });
  };

  const handleNext = () => {
    const currentChapter = chaptersData[currentChapterIndex];
    if (currentLectureIndex < currentChapter.lectures.length - 1) {
      // Next lecture in same chapter
      const nextLecture = currentChapter.lectures[currentLectureIndex + 1];
      setSelectedLecture(nextLecture);
      setCurrentLectureIndex(currentLectureIndex + 1);
    } else if (currentChapterIndex < chaptersData.length - 1) {
      // First lecture of next chapter
      const nextChapter = chaptersData[currentChapterIndex + 1];
      setSelectedLecture(nextChapter.lectures[0]);
      setCurrentChapterIndex(currentChapterIndex + 1);
      setCurrentLectureIndex(0);
    }
  };

  const handlePrevious = () => {
    if (currentLectureIndex > 0) {
      // Previous lecture in same chapter
      const currentChapter = chaptersData[currentChapterIndex];
      const prevLecture = currentChapter.lectures[currentLectureIndex - 1];
      setSelectedLecture(prevLecture);
      setCurrentLectureIndex(currentLectureIndex - 1);
    } else if (currentChapterIndex > 0) {
      // Last lecture of previous chapter
      const prevChapter = chaptersData[currentChapterIndex - 1];
      setSelectedLecture(prevChapter.lectures[prevChapter.lectures.length - 1]);
      setCurrentChapterIndex(currentChapterIndex - 1);
      setCurrentLectureIndex(prevChapter.lectures.length - 1);
    }
  };

  const hasNext = () => {
    const currentChapter = chaptersData[currentChapterIndex];
    return (
      currentLectureIndex < currentChapter.lectures.length - 1 ||
      currentChapterIndex < chaptersData.length - 1
    );
  };

  const hasPrevious = () => {
    return currentLectureIndex > 0 || currentChapterIndex > 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Classroom Lectures</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-32">
        {/* Chapters Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {chaptersData.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              chapterTitle={chapter.title}
              lectures={chapter.lectures}
              onSelectLecture={handleSelectLecture}
            />
          ))}
        </div>

        {/* Empty State */}
        {chaptersData.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No lectures yet</h2>
            <p className="text-muted-foreground">
              Add your MP3 files and update the lecturesData.ts file
            </p>
          </div>
        )}
      </main>

      {/* Fixed Audio Player */}
      {selectedLecture && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/50 p-4 shadow-lg z-20">
          <div className="container mx-auto max-w-2xl relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-2 right-0 h-8 w-8"
              onClick={() => setSelectedLecture(null)}
            >
              <X className="h-4 w-4" />
            </Button>
            <AudioPlayer
              title={selectedLecture.title}
              audioSrc={selectedLecture.audioSrc}
              onNext={handleNext}
              onPrevious={handlePrevious}
              hasNext={hasNext()}
              hasPrevious={hasPrevious()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
