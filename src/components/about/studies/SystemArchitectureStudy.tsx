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
        <linearGradient
          id="system-node-gradient"
          x1="366"
          y1="81"
          x2="434"
          y2="149"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors.highlight} />
          <stop offset="1" stopColor={colors.secondary} />
        </linearGradient>
      </defs>

      {/* Registration marks */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        opacity={opacity.secondary}
      >
        <path d="M80 65H105 M80 65V90" />
        <path d="M695 65H720 M720 65V90" />
        <path d="M80 545H105 M80 520V545" />
        <path d="M695 545H720 M720 520V545" />
      </g>

      {/* Structural boundary */}
      <rect
        x="105"
        y="65"
        width="590"
        height="480"
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeDasharray="4 7"
        opacity={opacity.secondary}
      />

      {/* System boundaries */}
      <ellipse
        cx="400"
        cy="305"
        rx="260"
        ry="220"
        stroke={colors.secondary}
        strokeWidth={strokes.secondary}
        opacity={opacity.secondary}
      />

      <ellipse
        cx="400"
        cy="305"
        rx="215"
        ry="175"
        stroke={colors.primary}
        strokeWidth={strokes.guide}
        strokeDasharray="3 6"
        opacity={opacity.guide}
      />

      {/* Reference axes */}
      <g
        stroke={colors.primary}
        strokeWidth={strokes.guide}
        strokeDasharray="4 7"
        opacity={opacity.guide}
      >
        <path d="M400 45V555" />
        <path d="M90 305H710" />
      </g>

      {/* Connection paths */}
      <g
        stroke={colors.primary}
        strokeWidth={strokes.secondary}
        strokeLinecap="round"
      >
        {connections.map(([x1, y1, x2, y2], index) => (
          <g key={index}>
            <path d={`M${x1} ${y1} L${x2} ${y2}`} opacity={opacity.secondary} />

            <path
              d={`M${x1 + 4} ${y1 + 4} L${x2 + 4} ${y2 + 4}`}
              strokeWidth={strokes.fine}
              opacity={opacity.guide}
            />
          </g>
        ))}
      </g>

      {/* Connection junctions */}
      <g fill={colors.highlight} opacity={opacity.annotation}>
        <circle cx="317.5" cy="180" r="2" />
        <circle cx="482.5" cy="180" r="2" />
        <circle cx="255" cy="332.5" r="2" />
        <circle cx="545" cy="332.5" r="2" />
        <circle cx="337.5" cy="462.5" r="2" />
        <circle cx="462.5" cy="462.5" r="2" />
      </g>

      {/* Nodes */}
      {nodes.map((node) => (
        <g key={node.label}>
          {/* Outer boundary */}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r + 9}
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
              node.type === "primary" ? strokes.primary : strokes.secondary
            }
            opacity={opacity.primary}
          />

          {/* Inner ring */}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r * 0.7}
            stroke={colors.secondary}
            strokeWidth={strokes.guide}
            opacity={opacity.secondary}
          />

          {/* Node centre */}
          <circle
            cx={node.x}
            cy={node.y}
            r={node.type === "primary" ? 4 : 3}
            fill={colors.highlight}
          />

          {/* Node crosshair */}
          <g
            stroke={colors.highlight}
            strokeWidth={strokes.fine}
            opacity={opacity.annotation}
          >
            <path d={`M${node.x - 5} ${node.y}H${node.x + 5}`} />
            <path d={`M${node.x} ${node.y - 5}V${node.y + 5}`} />
          </g>

          {/* Labels */}
          <text
            x={node.x}
            y={node.y + node.r + 23}
            fill={colors.primary}
            fontSize="10"
            letterSpacing="2"
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
        strokeWidth={strokes.guide}
        opacity={opacity.annotation}
      >
        <path d="M400 75V48 M394 55L400 48L406 55" />
        <path d="M650 305H680 M673 299L680 305L673 311" />
        <path d="M150 305H120 M127 299L120 305L127 311" />
      </g>

      {/* Measurement ticks */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.fine}
        opacity={opacity.annotation}
      >
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} d={`M${250 + i * 25} 65V${i % 2 === 0 ? 72 : 69}`} />
        ))}
      </g>

      {/* Annotations */}
      <g
        fill={colors.primary}
        fontSize="10"
        letterSpacing="2"
        fontFamily="monospace"
        opacity={opacity.annotation}
      >
        <text x="105" y="42">
          SYSTEM TOPOLOGY / 002
        </text>
        <text x="570" y="125">
          PRIMARY NODE
        </text>
        <text x="570" y="142">
          N = 06
        </text>
        <text x="105" y="570">
          INTERCONNECTION / FLOW / DEPENDENCY
        </text>
      </g>

      {/* Handwritten annotation */}
      <g opacity={opacity.annotation}>
        <text
          x="535"
          y="510"
          fill={colors.highlight}
          fontSize="15"
          fontStyle="italic"
          fontFamily="cursive"
          transform="rotate(-4 535 510)"
        >
          distributed relationships
        </text>

        <path
          d="M535 520Q515 535 490 525"
          stroke={colors.highlight}
          strokeWidth={strokes.guide}
        />
      </g>
    </svg>
  );
}
