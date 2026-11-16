import { STUDY_THEME } from "./studyTheme";

const { colors, opacity, strokes } = STUDY_THEME;

const nodes = [
  { x: 400, y: 115, r: 34, label: "CORE", type: "primary" },
  { x: 235, y: 245, r: 27, label: "API", type: "secondary" },
  { x: 565, y: 245, r: 27, label: "DATA", type: "secondary" },
  { x: 275, y: 420, r: 32, label: "QUEUE", type: "secondary" },
  { x: 525, y: 420, r: 32, label: "ENGINE", type: "secondary" },
  { x: 400, y: 505, r: 20, label: "EDGE", type: "tertiary" },
];

const connections = [
  [400, 115, 235, 245],
  [400, 115, 565, 245],
  [235, 245, 275, 420],
  [565, 245, 525, 420],
  [275, 420, 400, 505],
  [525, 420, 400, 505],
  [235, 245, 565, 245],
  [275, 420, 525, 420],
  [400, 115, 400, 505],
] as const;

export default function SystemArchitectureStudy() {
  return (
    <svg
      viewBox="0 0 800 600"
      width="100%"
      height="100%"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
    >
      <defs>
        <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Corner registration brackets */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        opacity={opacity.secondary}
      >
        <path d="M75 60H108 M75 60V93" />
        <path d="M692 60H725 M725 60V93" />
        <path d="M75 550H108 M75 517V550" />
        <path d="M692 550H725 M725 517V550" />
      </g>

      {/* Structural boundary */}
      <rect
        x="100"
        y="60"
        width="600"
        height="490"
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeDasharray="5 7"
        opacity={opacity.guide}
      />

      {/* System orbits */}
      <ellipse
        cx="400"
        cy="305"
        rx="268"
        ry="225"
        stroke={colors.secondary}
        strokeWidth={strokes.secondary}
        opacity={opacity.secondary}
      />

      <ellipse
        cx="400"
        cy="305"
        rx="218"
        ry="178"
        stroke={colors.primary}
        strokeWidth={strokes.guide}
        strokeDasharray="4 6"
        opacity={opacity.guide}
      />

      {/* Reference axes */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeDasharray="4 7"
        opacity={opacity.guide}
      >
        <path d="M400 40V560" />
        <path d="M85 305H715" />
      </g>

      {/* Connection paths */}
      <g strokeLinecap="round">
        {connections.map(([x1, y1, x2, y2], index) => (
          <g key={index}>
            <path
              d={`M${x1} ${y1} L${x2} ${y2}`}
              stroke={colors.primary}
              strokeWidth={strokes.secondary}
              opacity={opacity.secondary}
            />
            <path
              d={`M${x1 + 5} ${y1 + 5} L${x2 + 5} ${y2 + 5}`}
              stroke={colors.secondary}
              strokeWidth={strokes.fine}
              opacity={opacity.guide}
            />
          </g>
        ))}
      </g>

      {/* Connection junctions */}
      <g fill={colors.highlight} opacity={opacity.annotation}>
        <circle cx="312.5" cy="182.5" r="3" />
        <circle cx="487.5" cy="182.5" r="3" />
        <circle cx="245" cy="332.5" r="3" />
        <circle cx="555" cy="332.5" r="3" />
        <circle cx="332.5" cy="462.5" r="3" />
        <circle cx="467.5" cy="462.5" r="3" />
      </g>

      {/* Nodes */}
      {nodes.map((node) => (
        <g key={node.label}>
          {/* Subtle dark backing plate so lines behind nodes never muddy the label */}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="#070709"
            fillOpacity="0.85"
          />

          {node.type === "primary" && (
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r + 22}
              fill="url(#core-glow)"
            />
          )}

          {/* Outer dashed ring */}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r + 10}
            stroke={colors.secondary}
            strokeWidth={strokes.guide}
            strokeDasharray="3 5"
            opacity={opacity.secondary}
          />

          {/* Primary node ring */}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            stroke={node.type === "primary" ? colors.highlight : colors.primary}
            strokeWidth={
              node.type === "primary" ? strokes.primary + 0.6 : strokes.primary
            }
            opacity={opacity.primary}
          />

          {/* Inner ring */}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r * 0.68}
            stroke={colors.secondary}
            strokeWidth={strokes.guide}
            opacity={opacity.secondary}
          />

          {/* Node centre */}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.type === "primary" ? 5 : 3.5}
            fill={colors.highlight}
          />

          {/* Node crosshair */}
          <g
            stroke={colors.highlight}
            strokeWidth={strokes.fine}
            opacity={opacity.annotation}
          >
            <path d={`M${node.x - 7} ${node.y}H${node.x + 7}`} />
            <path d={`M${node.x} ${node.y - 7}V${node.y + 7}`} />
          </g>

          {/* Enlarged, crisp label */}
          <text
            x={node.x}
            y={node.y + node.r + 26}
            fill={colors.highlight}
            fontSize="13"
            fontWeight="600"
            letterSpacing="2.5"
            textAnchor="middle"
            fontFamily="monospace"
          >
            {node.label}
          </text>
        </g>
      ))}

      {/* Directional indicators */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        opacity={opacity.annotation}
      >
        <path d="M400 72V42 M393 50L400 42L407 50" />
        <path d="M655 305H688 M680 298L688 305L680 312" />
        <path d="M145 305H112 M120 298L112 305L120 312" />
      </g>

      {/* Measurement ticks */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.fine}
        opacity={opacity.annotation}
      >
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} d={`M${250 + i * 25} 60V${i % 2 === 0 ? 70 : 65}`} />
        ))}
      </g>

      {/* Enlarged technical annotations */}
      <g
        fill={colors.primary}
        fontSize="12"
        fontWeight="600"
        letterSpacing="2.2"
        fontFamily="monospace"
        opacity={opacity.annotation}
      >
        <text x="100" y="38">
          SYSTEM TOPOLOGY // 002
        </text>
        <text x="565" y="118">
          PRIMARY NODE
        </text>
        <text x="565" y="138" fill={colors.highlight}>
          N = 06 [ACTIVE]
        </text>
        <text x="100" y="578">
          INTERCONNECTION // FLOW // DEPENDENCY
        </text>
      </g>

      {/* Handwritten callout */}
      <g opacity={opacity.annotation}>
        <text
          x="520"
          y="515"
          fill={colors.highlight}
          fontSize="17"
          fontStyle="italic"
          fontFamily="cursive"
          transform="rotate(-4 520 515)"
        >
          distributed relationships
        </text>

        <path
          d="M518 525Q498 540 472 530"
          stroke={colors.highlight}
          strokeWidth={strokes.secondary}
        />
      </g>
    </svg>
  );
}
