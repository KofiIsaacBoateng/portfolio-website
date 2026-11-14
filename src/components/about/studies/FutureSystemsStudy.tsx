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
    "M90 50H110 M90 50V70",
    "M710 50H690 M710 50V70",
    "M90 540H110 M90 540V520",
    "M710 540H690 M710 540V520",
  ];

  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="future-core-glow">
          <stop offset="0%" stopColor={colors.highlight} stopOpacity=".22" />
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
          <stop offset="100%" stopColor={colors.secondary} />
        </linearGradient>
      </defs>

      {/* Drawing boundary */}
      <rect
        x="90"
        y="50"
        width="620"
        height="490"
        stroke={colors.secondary}
        strokeOpacity={opacity.guide}
        strokeWidth={strokes.fine}
        strokeDasharray="4 7"
      />

      {/* Registration marks */}
      <g
        stroke={colors.highlight}
        strokeOpacity={opacity.annotation}
        strokeWidth={strokes.fine}
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
        strokeDasharray="4 7"
      >
        <path d="M400 65V525" />
        <path d="M115 290H685" />
        <path d="M180 110L620 470" />
        <path d="M620 110L180 470" />
      </g>

      {/* Secondary reference geometry */}
      <g
        stroke={colors.muted}
        strokeOpacity={opacity.subtle}
        strokeWidth={strokes.fine}
      >
        <circle cx={center.x} cy={center.y} r="180" strokeDasharray="3 8" />
        <circle cx={center.x} cy={center.y} r="125" strokeDasharray="2 7" />
        <path d="M400 80V500 M190 290H610" />
      </g>

      {/* Orbital paths */}
      <g fill="none">
        <ellipse
          cx={center.x}
          cy={center.y}
          rx="245"
          ry="105"
          transform="rotate(-28 400 290)"
          stroke={colors.primary}
          strokeWidth={strokes.primary}
          strokeOpacity={opacity.primary}
        />

        <ellipse
          cx={center.x}
          cy={center.y}
          rx="225"
          ry="125"
          transform="rotate(38 400 290)"
          stroke={colors.secondary}
          strokeWidth={strokes.secondary}
          strokeOpacity={opacity.secondary}
        />

        <ellipse
          cx={center.x}
          cy={center.y}
          rx="110"
          ry="220"
          transform="rotate(12 400 290)"
          stroke={colors.highlight}
          strokeWidth={strokes.secondary}
          strokeOpacity={opacity.guide}
          strokeDasharray="5 6"
        />
      </g>

      {/* Orbital axis indicators */}
      <g
        stroke={colors.primary}
        strokeOpacity={opacity.guide}
        strokeWidth={strokes.fine}
      >
        <path d="M155 290H175 M625 290H645" />
        <path d="M400 65V85 M400 495V515" />
        <path d="M260 150L275 165 M525 415L540 430" />
      </g>

      {/* Central structure glow */}
      <circle
        cx={center.x}
        cy={center.y}
        r="115"
        fill="url(#future-core-glow)"
      />

      {/* Central polyhedral structure */}
      <g
        stroke="url(#future-structure-gradient)"
        strokeWidth={strokes.primary}
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
        stroke={colors.secondary}
        strokeWidth={strokes.secondary}
        strokeOpacity={opacity.secondary}
      >
        <path
          d="M400 190L455 365L310 255L490 255L345 365Z"
          strokeDasharray="3 5"
        />
        <path d="M310 255L455 365 M490 255L345 365" opacity=".55" />
      </g>

      {/* Central reference axes */}
      <g
        stroke={colors.highlight}
        strokeOpacity={opacity.guide}
        strokeWidth={strokes.fine}
      >
        <path d="M380 290H420 M400 270V310" />
        <circle cx="400" cy="290" r="22" strokeDasharray="2 5" />
      </g>

      {/* Vertex points */}
      {vertices.map((point, index) => (
        <g key={index}>
          <circle
            cx={point.x}
            cy={point.y}
            r="7"
            stroke={colors.primary}
            strokeWidth={strokes.secondary}
            strokeOpacity={opacity.annotation}
          />
          <circle cx={point.x} cy={point.y} r="2.5" fill={colors.highlight} />
          <path
            d={`M${point.x - 13} ${point.y}H${point.x + 13} M${point.x} ${point.y - 13}V${point.y + 13}`}
            stroke={colors.secondary}
            strokeWidth={strokes.fine}
            strokeOpacity={opacity.guide}
          />
        </g>
      ))}

      {/* Orbital nodes */}
      {orbitPoints.map((point, index) => (
        <g key={index}>
          <circle
            cx={point.x}
            cy={point.y}
            r="11"
            stroke={colors.primary}
            strokeWidth={strokes.secondary}
            strokeOpacity={opacity.annotation}
          />
          <circle cx={point.x} cy={point.y} r="3" fill={colors.highlight} />
          <path
            d={`M${point.x - 18} ${point.y}H${point.x + 18} M${point.x} ${point.y - 18}V${point.y + 18}`}
            stroke={colors.secondary}
            strokeWidth={strokes.fine}
            strokeOpacity={opacity.secondary}
          />
        </g>
      ))}

      {/* Extended construction rays */}
      <g
        stroke={colors.primary}
        strokeWidth={strokes.guide}
        strokeOpacity={opacity.secondary}
        strokeDasharray="4 7"
      >
        <path d="M400 105L400 70" />
        <path d="M565 210L630 170" />
        <path d="M510 410L590 455" />
        <path d="M290 410L210 455" />
        <path d="M235 210L170 170" />
      </g>

      {/* Directional indicators */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        strokeOpacity={opacity.primary}
      >
        <path d="M625 168L630 170L627 176" />
        <path d="M585 450L590 455L583 456" />
        <path d="M175 166L170 170L177 174" />
      </g>

      {/* Measurement ticks */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.fine}
        strokeOpacity={opacity.secondary}
      >
        {Array.from({ length: 11 }, (_, i) => (
          <path key={i} d={`M${150 + i * 50} 55V${i % 2 === 0 ? 65 : 60}`} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M95 ${100 + i * 50}H${i % 2 === 0 ? 105 : 101}`} />
        ))}
      </g>

      {/* Technical annotations */}
      <g
        fill={colors.primary}
        fontSize="10"
        letterSpacing="1.8"
        fontFamily="monospace"
        opacity={opacity.annotation}
      >
        <text x="105" y="30">
          FUTURE SYSTEMS / 005
        </text>
        <text x="535" y="95">
          ORBITAL PATH
        </text>
        <text x="535" y="112">
          VECTOR / 03
        </text>
        <text x="105" y="510">
          SPATIAL RELATIONSHIPS
        </text>
        <text x="105" y="525">
          EMERGENT STRUCTURES
        </text>
        <text x="415" y="280" fontSize="8">
          CORE
        </text>
      </g>

      {/* Handwritten annotations */}
      <g
        fill={colors.highlight}
        fontSize="15"
        fontFamily="cursive"
        opacity={opacity.annotation}
      >
        <text x="545" y="370" transform="rotate(-6 545 370)">
          evolving systems
        </text>
        <text x="115" y="385" transform="rotate(-5 115 385)">
          dimensional study
        </text>
      </g>

      <path
        d="M545 380Q525 395 500 390"
        stroke={colors.primary}
        strokeWidth={strokes.fine}
        strokeOpacity={opacity.secondary}
      />
    </svg>
  );
}
