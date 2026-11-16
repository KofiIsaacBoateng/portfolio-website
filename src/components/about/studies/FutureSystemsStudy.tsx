import { STUDY_THEME } from "./studyTheme";

export default function FutureSystemsStudy() {
  const { colors, opacity, strokes } = STUDY_THEME;

  const center = { x: 400, y: 290 };

  const orbitPoints = [
    { x: 400, y: 105 },
    { x: 565, y: 210 },
    { x: 510, y: 410 },
    { x: 290, y: 410 },
    { x: 235, y: 210 },
  ];

  const vertices = [
    { x: 400, y: 190 },
    { x: 490, y: 255 },
    { x: 455, y: 365 },
    { x: 345, y: 365 },
    { x: 310, y: 255 },
    { x: 400, y: 290 },
  ];

  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 0],
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
    [4, 5],
  ];
  const registrationMarks = [
    "M85 48H112 M85 48V75",
    "M715 48H688 M715 48V75",
    "M85 542H112 M85 542V515",
    "M715 542H688 M715 542V515",
  ];

  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://w3.org"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="future-core-glow">
          <stop offset="0%" stopColor={colors.highlight} stopOpacity="0.28" />
          <stop offset="100%" stopColor={colors.highlight} stopOpacity="0" />
        </radialGradient>

        <linearGradient
          id="future-structure-gradient"
          x1="300"
          y1="190"
          x2="500"
          y2="390"
        >
          <stop offset="0%" stopColor={colors.highlight} />
          <stop offset="100%" stopColor={colors.primary} />
        </linearGradient>
      </defs>

      {/* Drawing boundary */}
      <rect
        x="85"
        y="48"
        width="630"
        height="494"
        stroke={colors.secondary}
        strokeOpacity={opacity.guide}
        strokeWidth={strokes.guide}
        strokeDasharray="5 7"
      />

      {/* Registration marks */}
      <g
        stroke={colors.highlight}
        strokeOpacity={opacity.annotation}
        strokeWidth={strokes.secondary}
      >
        {registrationMarks.map((path, index) => (
          <path key={index} d={path} />
        ))}
      </g>

      {/* Primary construction axes */}
      <g
        stroke={colors.secondary}
        strokeOpacity={opacity.guide}
        strokeWidth={strokes.guide}
        strokeDasharray="5 7"
      >
        <path d="M400 60V530" />
        <path d="M110 290H690" />
        <path d="M175 105L625 475" />
        <path d="M625 105L175 475" />
      </g>

      {/* Secondary reference geometry */}
      <g stroke={colors.muted} strokeOpacity={0.3} strokeWidth={strokes.fine}>
        <circle cx={center.x} cy={center.y} r="185" strokeDasharray="3 8" />
        <circle cx={center.x} cy={center.y} r="128" strokeDasharray="2 7" />
        <path d="M400 75V505 M185 290H615" />
      </g>

      {/* Orbital paths */}
      <g fill="none">
        <ellipse
          cx={center.x}
          cy={center.y}
          rx="250"
          ry="108"
          transform="rotate(-28 400 290)"
          stroke={colors.highlight}
          strokeWidth={strokes.primary}
          strokeOpacity={opacity.primary}
        />

        <ellipse
          cx={center.x}
          cy={center.y}
          rx="230"
          ry="128"
          transform="rotate(38 400 290)"
          stroke={colors.primary}
          strokeWidth={strokes.secondary}
          strokeOpacity={opacity.secondary}
        />

        <ellipse
          cx={center.x}
          cy={center.y}
          rx="114"
          ry="225"
          transform="rotate(12 400 290)"
          stroke={colors.highlight}
          strokeWidth={strokes.secondary}
          strokeOpacity={0.48}
          strokeDasharray="5 6"
        />
      </g>

      {/* Orbital axis indicators */}
      <g
        stroke={colors.primary}
        strokeOpacity={opacity.secondary}
        strokeWidth={strokes.secondary}
      >
        <path d="M150 290H174 M626 290H650" />
        <path d="M400 62V84 M400 496V518" />
        <path d="M258 148L274 164 M526 416L542 432" />
      </g>

      {/* Central structure glow */}
      <circle
        cx={center.x}
        cy={center.y}
        r="125"
        fill="url(#future-core-glow)"
      />

      {/* Central polyhedral structure */}
      <g
        stroke="url(#future-structure-gradient)"
        strokeWidth={strokes.primary + 0.4}
        strokeOpacity={opacity.primary}
      >
        {connections.map(([a, b], index) => (
          <path
            key={index}
            d={`M${vertices[a].x} ${vertices[a].y} L${vertices[b].x} ${vertices[b].y}`}
          />
        ))}
      </g>

      {/* Inner geometric construction */}
      <g
        stroke={colors.primary}
        strokeWidth={strokes.secondary}
        strokeOpacity={opacity.secondary}
      >
        <path
          d="M400 190L455 365L310 255L490 255L345 365Z"
          strokeDasharray="4 5"
        />
        <path d="M310 255L455 365 M490 255L345 365" opacity="0.65" />
      </g>

      {/* Central reference axes */}
      <g
        stroke={colors.highlight}
        strokeOpacity={opacity.secondary}
        strokeWidth={strokes.secondary}
      >
        <path d="M378 290H422 M400 268V312" />
        <circle cx="400" cy="290" r="24" strokeDasharray="3 5" />
      </g>

      {/* Vertex points */}
      {vertices.map((point, index) => (
        <g key={index}>
          <circle
            cx={point.x}
            cy={point.y}
            r="8.5"
            fill="#070709"
            fillOpacity="0.9"
            stroke={colors.highlight}
            strokeWidth={strokes.secondary}
            strokeOpacity={opacity.annotation}
          />
          <circle cx={point.x} cy={point.y} r="3" fill={colors.highlight} />
          <path
            d={`M${point.x - 15} ${point.y}H${point.x + 15} M${point.x} ${point.y - 15}V${point.y + 15}`}
            stroke={colors.secondary}
            strokeWidth={strokes.fine}
            strokeOpacity={opacity.secondary}
          />
        </g>
      ))}

      {/* Orbital nodes */}
      {orbitPoints.map((point, index) => (
        <g key={index}>
          <circle
            cx={point.x}
            cy={point.y}
            r="13"
            fill="#070709"
            fillOpacity="0.9"
            stroke={colors.highlight}
            strokeWidth={strokes.primary}
            strokeOpacity={opacity.annotation}
          />
          <circle cx={point.x} cy={point.y} r="3.5" fill={colors.highlight} />
          <path
            d={`M${point.x - 20} ${point.y}H${point.x + 20} M${point.x} ${point.y - 20}V${point.y + 20}`}
            stroke={colors.secondary}
            strokeWidth={strokes.fine}
            strokeOpacity={opacity.secondary}
          />
        </g>
      ))}

      {/* Extended construction rays */}
      <g
        stroke={colors.primary}
        strokeWidth={strokes.secondary}
        strokeOpacity={opacity.secondary}
        strokeDasharray="4 7"
      >
        <path d="M400 105L400 68" />
        <path d="M565 210L635 168" />
        <path d="M510 410L595 458" />
        <path d="M290 410L205 458" />
        <path d="M235 210L165 168" />
      </g>

      {/* Directional indicators */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.primary}
        strokeOpacity={opacity.primary}
      >
        <path d="M629 166L635 168L632 175" />
        <path d="M590 452L595 458L587 459" />
        <path d="M171 164L165 168L173 173" />
      </g>

      {/* Measurement ticks */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.fine}
        strokeOpacity={opacity.secondary}
      >
        {Array.from({ length: 11 }, (_, i) => (
          <path key={i} d={`M${150 + i * 50} 52V${i % 2 === 0 ? 64 : 58}`} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M90 ${100 + i * 50}H${i % 2 === 0 ? 102 : 96}`} />
        ))}
      </g>

      {/* Enlarged technical annotations */}
      <g
        fill={colors.highlight}
        fontSize="12"
        fontWeight="600"
        letterSpacing="2"
        fontFamily="monospace"
        opacity={opacity.annotation}
      >
        <text x="100" y="32">
          FUTURE SYSTEMS // 005
        </text>
        <text x="530" y="92">
          ORBITAL PATH
        </text>
        <text x="530" y="112" fontWeight="700">
          VECTOR // 03
        </text>
        <text x="102" y="506">
          SPATIAL RELATIONSHIPS
        </text>
        <text x="102" y="525">
          EMERGENT STRUCTURES
        </text>
        <text x="418" y="282" fontSize="10.5" fontWeight="700">
          CORE
        </text>
      </g>

      {/* Handwritten annotations */}
      <g
        fill={colors.highlight}
        fontSize="17"
        fontStyle="italic"
        fontFamily="cursive"
        opacity={opacity.annotation}
      >
        <text x="542" y="370" transform="rotate(-6 542 370)">
          evolving systems
        </text>
        <text x="112" y="385" transform="rotate(-5 112 385)">
          dimensional study
        </text>
      </g>

      <path
        d="M542 382Q522 397 496 392"
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        strokeOpacity={opacity.annotation}
      />
    </svg>
  );
}
