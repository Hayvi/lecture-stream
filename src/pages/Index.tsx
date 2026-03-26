import { useState, useMemo, useEffect } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { ChapterCard } from "@/components/ChapterCard";
import { SearchBar } from "@/components/SearchBar";
import { chaptersData, Lecture } from "@/data/lecturesData";
import { Button } from "@/components/ui/button";
import { BookOpen, X, Search } from "lucide-react";

const Index = () => {
  const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectLecture = (lecture: Lecture) => {
    setSelectedLecture(lecture);
    localStorage.setItem("lastPlayedLectureId", lecture.id);

    // Find the chapter and lecture indices
    chaptersData.forEach((chapter, chapterIdx) => {
      const lectureIdx = chapter.lectures.findIndex((l) => l.id === lecture.id);
      if (lectureIdx !== -1) {
        setCurrentChapterIndex(chapterIdx);
        setCurrentLectureIndex(lectureIdx);
      }
    });
  };

  // Restore state on mount
  useEffect(() => {
    const lastPlayedId = localStorage.getItem("lastPlayedLectureId");
    if (lastPlayedId) {
      const foundLecture = chaptersData
        .flatMap((c) => c.lectures)
        .find((l) => l.id === lastPlayedId);

      if (foundLecture) {
        handleSelectLecture(foundLecture);
      }
    }
  }, []);

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

  // Filter chapters and lectures based on search query
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) {
      return chaptersData;
    }

    const query = searchQuery.toLowerCase();

    return chaptersData
      .map((chapter) => {
        // Check if chapter title matches
        const chapterMatches = chapter.title.toLowerCase().includes(query);

        // Filter lectures that match the query
        const matchingLectures = chapter.lectures.filter((lecture) =>
          lecture.title.toLowerCase().includes(query)
        );

        // Include chapter if its title matches OR if it has matching lectures
        if (chapterMatches || matchingLectures.length > 0) {
          return {
            ...chapter,
            lectures: chapterMatches ? chapter.lectures : matchingLectures,
          };
        }

        return null;
      })
      .filter((chapter) => chapter !== null);
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <img
              src="/icon.jpg"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover border border-border/50 shadow-sm"
            />
            <h1 className="text-2xl font-bold text-foreground">European school hören</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-32">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={handleClearSearch}
          />
          {searchQuery && (
            <p className="text-center text-sm text-muted-foreground mt-3">
              Found {filteredChapters.reduce((acc, ch) => acc + ch.lectures.length, 0)} lectures in {filteredChapters.length} chapters
            </p>
          )}
        </div>

        {/* Chapters Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredChapters.map((chapter) => (
            <ChapterCard
              key={chapter.id}
              chapterTitle={chapter.title}
              lectures={chapter.lectures}
              onSelectLecture={handleSelectLecture}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredChapters.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No results found</h2>
            <p className="text-muted-foreground mb-4">
              Try searching with different keywords
            </p>
            <Button variant="outline" onClick={handleClearSearch}>
              Clear search
            </Button>
          </div>
        )}

        {chaptersData.length === 0 && !searchQuery && (
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
