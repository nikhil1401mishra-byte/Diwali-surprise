import { SweetItem, DecorationItem, MemoryItem } from "@/types";

export const SENDER_NAME = "Nikhil";
export const DEFAULT_RECIPIENT = "Ananya";

export const EXPERIENCES = [
  { id: 0, title: "The Opening Gift", subtitle: "Open Surprise" },
  { id: 1, title: "Enter Your Name", subtitle: "Personalize" },
  { id: 2, title: "Personalized Welcome", subtitle: "Happy Diwali" },
  { id: 3, title: "Every Little Light", subtitle: "Light Diyas" },
  { id: 4, title: "Decorate Corner", subtitle: "Festive Porch" },
  { id: 5, title: "Rangoli Creator", subtitle: "Design Rangoli" },
  { id: 6, title: "Something Sweet", subtitle: "Festive Mithai" },
  { id: 7, title: "Make a Wish", subtitle: "Cosmic Star" },
  { id: 8, title: "Light Up the Sky", subtitle: "Sky Fireworks" },
  { id: 9, title: "Favourite People", subtitle: "Memories" },
  { id: 10, title: "Hidden Surprises", subtitle: "Mini Quest" },
  { id: 11, title: "The Countdown", subtitle: "3... 2... 1..." },
  { id: 12, title: "Secret Letter", subtitle: "Wax Sealed" },
  { id: 13, title: "Final Celebration", subtitle: "Greeting Card" },
  { id: 14, title: "Written in Light", subtitle: "Grand Finale" },
];

export const SWEETS_DATA: SweetItem[] = [
  {
    id: "ladoo",
    name: "Motichoor Ladoo",
    hindiName: "मोतीचूर लड्डू",
    description: "Golden pearls of pure saffron and desi ghee sweetness",
    wish: "May every single day bring you endless reasons to smile, golden warmth, and unbounded happiness!",
    color: "#F59E0B",
    accent: "#D97706",
  },
  {
    id: "kajukatli",
    name: "Kaju Katli",
    hindiName: "काजू कतली",
    description: "Royal cashew diamond fudge adorned with silver vark",
    wish: "May your dreams rise higher than the brightest fireworks, sparkling with elegance and success!",
    color: "#E2E8F0",
    accent: "#94A3B8",
  },
  {
    id: "jalebi",
    name: "Crispy Jalebi",
    hindiName: "केसर जलेबी",
    description: "Golden spirals soaked in fragrant saffron and cardamom syrup",
    wish: "May life's twists and turns always lead you to pure joy, sweet laughter, and delicious surprises!",
    color: "#EA580C",
    accent: "#C2410C",
  },
  {
    id: "barfi",
    name: "Pista Barfi",
    hindiName: "पिस्ता बर्फी",
    description: "Rich layered milk delicacy infused with roasted pistachios",
    wish: "May love, laughter, good health and prosperity always find their way to you and your home!",
    color: "#10B981",
    accent: "#059669",
  },
];

export const INITIAL_DECORATIONS: DecorationItem[] = [
  {
    id: "diyas",
    name: "Glowing Diyas",
    iconName: "diya",
    description: "Illuminating the stone steps with sacred oil lamps",
    active: true,
  },
  {
    id: "lights",
    name: "Fairy Lights",
    iconName: "lights",
    description: "Warm golden strings draped along the carved wooden arch",
    active: false,
  },
  {
    id: "lantern",
    name: "Hanging Lanterns",
    iconName: "lantern",
    description: "Traditional brass kandils swaying softly in the breeze",
    active: false,
  },
  {
    id: "rangoli",
    name: "Floral Rangoli",
    iconName: "rangoli",
    description: "Intricate mandala of fresh rose and marigold petals",
    active: false,
  },
  {
    id: "flowers",
    name: "Marigold Garlands",
    iconName: "flowers",
    description: "Auspicious yellow and orange toran framing the doorway",
    active: false,
  },
];

export const INITIAL_MEMORIES: MemoryItem[] = [
  {
    id: "mem1",
    title: "Lighting Diyas Together",
    caption: "A spark of light that brings endless hope and warmth.",
    date: "Diwali Evening",
    rotation: -4,
    imageUrl: "/images/screen3_diyas_surface.png",
    tags: ["Warmth", "Tradition"],
  },
  {
    id: "mem2",
    title: "Sparklers & Endless Laughter",
    caption: "Golden sparks, endless laughter, and cherished moments.",
    date: "Festive Night",
    rotation: 2,
    imageUrl: "/images/screen6_skyline_night.png",
    tags: ["Magic", "Laughter"],
  },
  {
    id: "mem3",
    title: "Colors of Rangoli",
    caption: "Patterns of happiness woven with love and togetherness.",
    date: "Diwali Morning",
    rotation: -3,
    imageUrl: "/images/screen2_palace_rangoli.png",
    tags: ["Rangoli", "Peace"],
  },
  {
    id: "mem4",
    title: "Sweet Moments & Togetherness",
    caption: "Sharing laughter, blessings, and warm sweet treats.",
    date: "Celebration",
    rotation: 4,
    imageUrl: "/images/screen5_sweets_thali.png",
    tags: ["Celebration", "Love"],
  },
];

export const RANGOLI_TEMPLATES = [
  {
    id: "mandala",
    name: "Sacred Mandala",
    description: "Intricate circular symmetry radiating balance and cosmic harmony.",
  },
  {
    id: "lotus",
    name: "Divine Lotus",
    description: "Symbol of Goddess Lakshmi bringing purity, luck and abundance.",
  },
  {
    id: "peacock",
    name: "Royal Peacock",
    description: "Majestic peacock plumage welcoming graceful joy and beauty.",
  },
  {
    id: "star",
    name: "Diwali Star",
    description: "Eight-fold auspicious star illuminating all cardinal directions.",
  },
];

export const RANGOLI_COLORS = [
  { name: "Saffron Gold", hex: "#F59E0B" },
  { name: "Turmeric Yellow", hex: "#EAB308" },
  { name: "Sindoor Red", hex: "#DC2626" },
  { name: "Lotus Pink", hex: "#EC4899" },
  { name: "Peacock Teal", hex: "#06B6D4" },
  { name: "Emerald Green", hex: "#10B981" },
  { name: "Royal Purple", hex: "#8B5CF6" },
  { name: "Pure Pearl", hex: "#FFFFFF" },
];
