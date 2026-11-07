export interface SweetItem {
  id: string;
  name: string;
  hindiName: string;
  description: string;
  wish: string;
  color: string;
  accent: string;
  image?: string;
}

export interface DecorationItem {
  id: string;
  name: string;
  iconName: "diya" | "lights" | "lantern" | "rangoli" | "flowers";
  description: string;
  active: boolean;
}

export interface MemoryItem {
  id: string;
  title: string;
  caption: string;
  date: string;
  rotation: number;
  imageUrl: string;
  tags: string[];
}

export interface DiyaState {
  id: number;
  isLit: boolean;
  xPercent: number;
  yPercent: number;
  size: "sm" | "md" | "lg";
}

