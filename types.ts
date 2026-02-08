
export interface Step {
  id: number;
  title: string;
  description: string;
  image: string;
  accent: string;
  countdownTarget?: string;
}

export interface ButtonPosition {
  x: number;
  y: number;
}
