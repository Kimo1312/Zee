
export interface Step {
  id: number;
  title: string;
  description: string;
  image: string;
  accent: string;
  countdownTarget?: string;
  game?: {
    word: string;
    hints: string[];
    successMessage?: string;
  };
  video?: {
    src: string;
    poster?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
  };
}

export interface ButtonPosition {
  x: number;
  y: number;
}
