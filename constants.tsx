
import { Step } from './types';

export const STEPS: Step[] = [
  {
    id: 0,
    title: "Happy Valentine's Day, My Love! ❤️",
    description: "Are you ready to know how will we celebrate?",
    image: "/Zee/vv1.jpeg",
    accent: "from-pink-400 to-rose-500"
  },
  {
    id: 1,
    title: "A secret word to know where we're going, one letter at a time ✨",
    description: "Guess the place by choosing it's characters. Each hint helps you find the next letter.",
    image: "/Zee/v2.jpeg",
    accent: "from-purple-400 to-indigo-700",
    game: {
      word: "KANZEL",
      hints: [
        "Letter 1: My name starts with this letter.",
        "Letter 2: The first Letter of 'I Love You' in Arabic.",
        "Letter 3: The letter of the month I started loving you in.",
        "Letter 4: Your name starts with this letter.",
        "Letter 5: A common letter between my name and yours and it's not a.",
        "Letter 6: The first letter of 'love'."
      ],
      successMessage: "You did it! The Place is KANZEL be ready by 5:45 sweetheart ❤️ ."
    }
  },
  {
    id: 2,
    title: "A little video just for you 🎥",
    description: "Enjoy this before the big question.",
    image: "/Zee/v2.jpeg",
    accent: "from-rose-400 to-pink-600",
    video: {
      src: "/Zee/video-output-FA66A704-9245-4054-A061-70FD8B57E2D8-1.mp4",
      poster: "/Zee/v2.jpeg",
      autoPlay: true,
      loop: false,
      muted: false
    }
  }
];
