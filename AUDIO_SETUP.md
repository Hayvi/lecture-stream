# 🎵 How to Add Your MP3 Files

Follow these simple steps to organize and add your classroom lecture MP3 files to the website.

## Step 1: Organize Your Audio Files

Create the following folder structure in your GitHub repository:

```
public/
  audio/
    chapter1/
      lecture1.mp3
      lecture2.mp3
    chapter2/
      lecture1.mp3
      lecture2.mp3
    chapter3/
      lecture1.mp3
```

## Step 2: Upload MP3 Files

1. Go to your GitHub repository
2. Navigate to the `public` folder
3. Create an `audio` folder if it doesn't exist
4. Inside `audio`, create folders for each chapter (e.g., `chapter1`, `chapter2`)
5. Upload your MP3 files into the appropriate chapter folders

## Step 3: Update the Lecture Data

Edit the file `src/data/lecturesData.ts` to match your actual lectures:

```typescript
export const chaptersData: Chapter[] = [
  {
    id: "chapter-1",
    title: "Chapter 1: Your Chapter Name",
    lectures: [
      {
        id: "lec-1-1",
        title: "Lecture 1.1 - Your Lecture Title",
        audioSrc: "/audio/chapter1/lecture1.mp3",
        duration: "15:30", // optional
      },
      // Add more lectures...
    ],
  },
  // Add more chapters...
];
```

## Important Notes

- **File paths**: Audio files must be in the `public/audio/` directory
- **File format**: Use `.mp3` format for best compatibility
- **File names**: Keep file names simple (no spaces, use dashes or underscores)
- **Mobile-friendly**: The player automatically works on all devices
- **Cloudflare Pages**: Your MP3 files will be automatically hosted and streamable

## Example Structure

If you have 3 chapters with 2 lectures each:

```
public/audio/
├── chapter1/
│   ├── intro.mp3
│   └── basics.mp3
├── chapter2/
│   ├── advanced.mp3
│   └── practice.mp3
└── chapter3/
    ├── summary.mp3
    └── review.mp3
```

Then update `lecturesData.ts` accordingly!

## Need Help?

The website will automatically stream files from GitHub → Cloudflare Pages. No special configuration needed!
