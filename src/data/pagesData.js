// ============================================================
// CONFIGURATION FILE — Edit this file to customize your app!
// ============================================================

export const landingConfig = {
  headline: "Do you only just love me?",
  subheading: "Every love story is beautiful, but ours is my favorite",
  yesButtonText: "Yes 💕",
  noButtonText: "No",
  // Background images for the landing slideshow (rotate automatically)
  backgroundImages: [
    "/assets/landing1.jpg",
    "/assets/landing2.jpg",
    "/assets/landing3.jpg",
    "/assets/landing4.jpg",
  ],
  slideshowInterval: 5000, // ms between slides
};

export const pagesData = [
  {
    id: 1,
    title: "Our First Moment",
    message:
      "From the very first moment I saw you, I knew something beautiful was about to begin. Your smile was like the sunrise — warm, gentle, and impossible to look away from.",
    mediaType: "image",
    mediaSrc: "/assets/page1.png",
    placeholder: "What do you remember about our first moment together?",
    accentColor: "#f8b4c6",
    accentGradient: "from-pink-500/20 to-rose-500/20"
  },
  {
    id: 2,
    title: "Growing Together, Sharing Each Moment",
    message:
      "I love the way you laugh, the way your eyes light up when you talk about things you care about. I love your kindness, your warmth, and every little detail that makes you who you are.",
    mediaType: "image",
    mediaSrc: "/assets/page2.jpg",
    placeholder: "What do you love most about us?",
    accentColor: "#e8788a",
    accentGradient: "from-rose-500/20 to-red-500/20"
  },
  {
    id: 3,
    title: "Our Beginning Story",
    message:
      "Remember that time we couldn't stop laughing? That moment lives in my heart forever. Every memory with you is a treasure I never want to forget.",
    mediaType: "image",
    mediaSrc: "/assets/page3.jpg",
    placeholder: "What is your favorite memory of us?",
    accentColor: "#d4a574",
    accentGradient: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: 4,
    title: "My Promise To You",
    message:
      "I promise to stand beside you through every storm and every sunshine. To hold your hand when the world feels heavy, and to celebrate with you when it feels light.",
    mediaType: "image",
    mediaSrc: "/assets/page4.JPG",
    placeholder: "What promise would you make to me?",
    accentColor: "#e8d5f5",
    accentGradient: "from-purple-500/20 to-violet-500/20"
  },
  {
    id: 5,
    title: "Our Dream Together",
    message:
      "I dream of lazy Sunday mornings with you, of adventures we haven't taken yet, of a future filled with laughter, love, and everything in between.",
    mediaType: "image",
    mediaSrc: "/assets/page5.JPG",
    placeholder: "What is your biggest dream for us?",
    accentColor: "#a8d8ea",
    accentGradient: "from-sky-500/20 to-cyan-500/20"
  },
  {
    id: 6,
    title: "A Letter From My Heart",
    message:
      "If I could write you a letter that would last forever, it would simply say: You are my favorite everything. My best friend, my safe place, my greatest love.",
    mediaType: "image",
    mediaSrc: "/assets/page6.JPG",
    placeholder: "Write a letter from your heart to me...",
    accentColor: "#f5c6d0",
    accentGradient: "from-pink-500/20 to-fuchsia-500/20"
  },
];

export const finalPageConfig = {
  title: "Our Love Story",
  subtitle: "A journey through our hearts",
  mediaType: "video",
  mediaSrc: "https://dl.dropboxusercontent.com/scl/fi/mpvnqz1snm90shd3qnfny/Final.mp4?rlkey=hivjtdlip4lwcww1ttm884vn8",
  closingMessage:
    "Thank you for every moment, every word, every heartbeat we share. This is just the beginning of our forever. I love you more than words could ever say. 💕",
  restartButtonText: "Relive Our Story",
  accentColor: "#e8788a",
};
