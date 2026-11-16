export const STUDY_THEME = {
  colors: {
    highlight: "#FFFFFF", // Pure crisp white for primary focus & callouts
    primary: "#E5E7EB", // Bright silver-white for main geometry & labels
    secondary: "#9CA3AF", // Mid-tone cool grey for outer rings & frames
    muted: "#4B5563", // Subtle charcoal for background grid/guides
  },
  opacity: {
    primary: 1,
    secondary: 0.72,
    guide: 0.38,
    annotation: 0.92,
  },
  strokes: {
    primary: 2.6, // Bold primary lines (up from thin ~1.2-1.5)
    secondary: 1.8, // Crisp secondary connections
    guide: 1.2, // Visible structural guides
    fine: 1.0, // Ticks & crosshairs
  },
} as const;
