import GeometricStudy from "./GeometricStudy";
import SystemArchitectureStudy from "./SystemArchitectureStudy";
import MechanicalStudy from "./MechanicalStudy";
import SoftwareArchitectureStudy from "./SoftwareArchitectureStudy";
import FutureSystemsStudy from "./FutureSystemsStudy";

export const aboutStudies = [
  {
    id: "mindset",
    number: "001",
    title: "The Mindset",
    subtitle: "Understanding complexity",
    description:
      "I see complexity as something to understand, not avoid. I approach problems with curiosity, breaking them down, examining how their parts connect, and finding the underlying structure. For me, good engineering begins with asking the right questions before writing the first line of code.",
    keywords: ["Curiosity", "Precision", "Intentionality"],
    Visual: GeometricStudy,
  },
  {
    id: "systems",
    number: "002",
    title: "The Systems Thinker",
    subtitle: "Seeing the bigger picture",
    description:
      "I think beyond individual components. Every system is a network of relationships, dependencies and decisions. I enjoy understanding how these pieces interact, designing the connections between them, and building solutions where the whole works better than the sum of its parts.",
    keywords: ["Connection", "Architecture", "Cohesion"],
    Visual: SystemArchitectureStudy,
  },
  {
    id: "builder",
    number: "003",
    title: "The Builder",
    subtitle: "Turning ideas into reality",
    description:
      "I believe ideas should become tangible. I enjoy taking concepts beyond the drawing board, breaking them into components, and bringing those pieces together into something functional. Whether I'm building software or exploring new technologies, I value the process of turning possibility into reality.",
    keywords: ["Creation", "Execution", "Impact"],
    Visual: MechanicalStudy,
  },
  {
    id: "engineer",
    number: "004",
    title: "The Engineer",
    subtitle: "Building with intention",
    description:
      "I believe good engineering is intentional. I approach software development by thinking about more than just getting things to work. I consider how components communicate, how data moves, how systems handle change, and how individual decisions affect the bigger picture. My goal is to build software that is not only functional, but also structured, maintainable, and dependable.",
    keywords: ["Structure", "Reliability", "Craft"],
    Visual: SoftwareArchitectureStudy,
  },
  {
    id: "visionary",
    number: "005",
    title: "The Visionary",
    subtitle: "Exploring what's possible",
    description:
      "I'm interested in what technology makes possible next. I enjoy exploring emerging technologies, experimenting with unfamiliar ideas, and questioning how things could work differently. I see every new tool, concept, and challenge as an opportunity to expand what's possible. For me, engineering isn't just about solving today's problems; it's also about imagining and building better possibilities for tomorrow.",
    keywords: ["Exploration", "Innovation", "Possibility"],
    Visual: FutureSystemsStudy,
  },
] as const;
