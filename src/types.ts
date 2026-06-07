export interface Highlight {
  id: string;
  image: string;
  title: string;
  date: string;
  location: string;
  iconType: 'clapping' | 'cheers' | 'hiking' | 'music';
}

export interface Snapshot {
  id: string;
  image: string;
  category: 'fun' | 'workout' | 'hobby' | 'other';
  title: string;
  description: string;
  angle: string; // Tailwind rotation angle, e.g. '-rotate-3', 'rotate-2', etc.
}

export interface Metric {
  id: 'fun' | 'workout' | 'hobby';
  name: string;
  value: number;
  max: number;
  color: string;
  icon: string;
}
