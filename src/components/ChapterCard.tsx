import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

interface Lecture {
  id: string;
  title: string;
  audioSrc: string;
  duration?: string;
}

interface ChapterCardProps {
  chapterTitle: string;
  lectures: Lecture[];
  onSelectLecture: (lecture: Lecture) => void;
}

export const ChapterCard = ({
  chapterTitle,
  lectures,
  onSelectLecture,
}: ChapterCardProps) => {
  return (
    <Card className="w-full overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Music className="h-5 w-5 text-primary" />
          {chapterTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {lectures.map((lecture, index) => (
          <Button
            key={lecture.id}
            variant="ghost"
            className="w-full justify-start h-auto py-3 px-4 hover:bg-accent/50"
            onClick={() => onSelectLecture(lecture)}
          >
            <div className="flex items-start gap-3 w-full text-left">
              <span className="text-sm font-medium text-muted-foreground min-w-[24px]">
                {index + 1}.
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground whitespace-normal break-words text-sm leading-tight">{lecture.title}</p>
                {lecture.duration && (
                  <p className="text-sm text-muted-foreground">{lecture.duration}</p>
                )}
              </div>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
