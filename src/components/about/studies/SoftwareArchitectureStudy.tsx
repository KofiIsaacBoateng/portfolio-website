import { STUDY_THEME } from "./studyTheme";

export default function SoftwareArchitectureStudy() {
  const { colors, opacity, strokes } = STUDY_THEME;

  const layers = [
    {
      name: "CLIENT INTERFACES",
      y: 100,
      boxes: [
        { x: 180, label: "WEB" },
        { x: 340, label: "MOBILE" },
        { x: 500, label: "EXTERNAL" },
      ],
    },
    {
      name: "GATEWAY / ROUTING",
      y: 190,
      boxes: [{ x: 340, label: "API GATEWAY" }],
    },
    {
      name: "APPLICATION SERVICES",
      y: 280,
      boxes: [
        { x: 180, label: "AUTH" },
        { x: 340, label: "CORE" },
        { x: 500, label: "PAYMENTS" },
      ],
    },
    {
      name: "ASYNC PROCESSING",
      y: 370,
      boxes: [
        { x: 260, label: "EVENT QUEUE" },
        { x: 440, label: "WORKERS" },
      ],
    },
    {
      name: "PERSISTENCE",
      y: 460,
      boxes: [
        { x: 180, label: "DATABASE" },
        { x: 340, label: "CACHE" },
        { x: 500, label: "STORAGE" },
      ],
    },
  ];

  const boxWidth = 120;
  const boxHeight = 34;

  const connections = [
    "M180 134L340 190",
    "M340 134V190",
    "M500 134L340 190",

    "M340 224L180 280",
    "M340 224V280",
    "M340 224L500 280",

    "M180 314L260 370",
    "M340 314L260 370",
    "M500 314L440 370",

    "M320 387H380",

    "M260 404L180 460",
    "M350 404L340 460",
    "M440 404L500 460",
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
        <linearGradient id="architecture-highlight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.highlight} stopOpacity="0.9" />
          <stop offset="100%" stopColor={colors.secondary} stopOpacity="0.45" />
        </linearGradient>
      </defs>

      {/* Registration marks */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.fine}
        opacity={opacity.secondary}
      >
        <path d="M85 65H110M95 55V80" />
        <path d="M690 65H715M705 55V80" />
        <path d="M85 535H110M95 523V548" />
        <path d="M690 535H715M705 523V548" />
      </g>

      {/* Main drawing boundary */}
      <rect
        x="95"
        y="65"
        width="610"
        height="470"
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeOpacity={opacity.guide}
        strokeDasharray="4 7"
      />

      {/* Vertical construction axes */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeOpacity={opacity.guide}
        strokeDasharray="3 7"
      >
        <path d="M180 75V525" />
        <path d="M340 75V525" />
        <path d="M500 75V525" />
      </g>

      {/* Horizontal reference lines */}
      <g
        stroke={colors.muted}
        strokeWidth={strokes.fine}
        strokeOpacity={opacity.subtle}
        strokeDasharray="2 8"
      >
        {layers.map((layer) => (
          <path key={layer.name} d={`M110 ${layer.y + 17}H690`} />
        ))}
      </g>

      {/* Architecture layers */}
      {layers.map((layer, index) => (
        <g key={layer.name}>
          <rect
            x="125"
            y={layer.y - 27}
            width="550"
            height="76"
            rx="2"
            stroke={colors.primary}
            strokeWidth={strokes.secondary}
            strokeOpacity={opacity.guide}
            strokeDasharray={index % 2 === 0 ? "none" : "4 5"}
          />

          {/* Layer index */}
          <text
            x="115"
            y={layer.y - 12}
            fill={colors.highlight}
            fontSize="8"
            fontFamily="monospace"
            textAnchor="end"
            opacity={opacity.annotation}
          >
            0{index + 1}
          </text>

          <text
            x="138"
            y={layer.y - 12}
            fill={colors.primary}
            fontSize="9"
            letterSpacing="2"
            fontFamily="monospace"
            opacity={opacity.annotation}
          >
            {layer.name}
          </text>

          {/* Architecture components */}
          {layer.boxes.map((box) => (
            <g key={box.label}>
              <rect
                x={box.x - boxWidth / 2}
                y={layer.y}
                width={boxWidth}
                height={boxHeight}
                stroke={colors.highlight}
                strokeWidth={strokes.secondary}
                strokeOpacity={opacity.primary}
              />

              <rect
                x={box.x - boxWidth / 2 + 5}
                y={layer.y + 5}
                width={boxWidth - 10}
                height={boxHeight - 10}
                stroke={colors.secondary}
                strokeWidth={strokes.fine}
                strokeOpacity={opacity.guide}
              />

              <circle
                cx={box.x - boxWidth / 2 + 11}
                cy={layer.y + boxHeight / 2}
                r="2"
                fill={colors.highlight}
              />

              <text
                x={box.x + 5}
                y={layer.y + 21}
                fill={colors.primary}
                fontSize="9"
                textAnchor="middle"
                letterSpacing="1"
                fontFamily="monospace"
              >
                {box.label}
              </text>
            </g>
          ))}
        </g>
      ))}

      {/* Communication paths */}
      <g
        stroke={colors.primary}
        strokeWidth={strokes.secondary}
        strokeOpacity={opacity.annotation}
      >
        {connections.map((path, index) => (
          <path key={index} d={path} />
        ))}
      </g>

      {/* Direction indicators */}
      <g fill={colors.highlight}>
        <path d="M336 184L340 190L344 184Z" />
        <path d="M336 274L340 280L344 274Z" />
        <path d="M256 364L260 370L264 364Z" />
        <path d="M436 364L440 370L444 364Z" />
        <path d="M176 454L180 460L184 454Z" />
        <path d="M336 454L340 460L344 454Z" />
        <path d="M496 454L500 460L504 454Z" />
        <path d="M374 383L380 387L374 391Z" />
      </g>

      {/* Connection junctions */}
      <g fill={colors.highlight} opacity={opacity.primary}>
        <circle cx="340" cy="190" r="2.5" />
        <circle cx="340" cy="280" r="2.5" />
        <circle cx="260" cy="370" r="2.5" />
        <circle cx="440" cy="370" r="2.5" />
        <circle cx="340" cy="460" r="2.5" />
      </g>

      {/* Side annotations */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.fine}
        strokeOpacity={opacity.annotation}
      >
        <path d="M675 190H693" />
        <path d="M675 280H693" />
        <path d="M675 370H693" />
      </g>

      <g
        fill={colors.primary}
        fontSize="8"
        letterSpacing="1.5"
        fontFamily="monospace"
        opacity={opacity.annotation}
      >
        <text x="680" y="180">
          ROUTE
        </text>
        <text x="680" y="270">
          EXECUTE
        </text>
        <text x="680" y="360">
          PROCESS
        </text>
      </g>

      {/* Technical annotations */}
      <g
        fill={colors.highlight}
        fontFamily="cursive"
        fontSize="14"
        opacity={opacity.annotation}
      >
        <text x="520" y="175" transform="rotate(-5 520 175)">
          request routing
        </text>

        <text x="490" y="445" transform="rotate(-4 490 445)">
          asynchronous flow
        </text>
      </g>

      {/* Dimension ticks */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.fine}
        strokeOpacity={opacity.secondary}
      >
        {Array.from({ length: 21 }).map((_, index) => (
          <path
            key={index}
            d={`M${125 + index * 27.5} 55V${index % 5 === 0 ? 65 : 60}`}
          />
        ))}
        {Array.from({ length: 17 }).map((_, index) => (
          <path
            key={index}
            d={`M${85 + index * 5} 535H${index % 4 === 0 ? 95 : 90}`}
          />
        ))}
      </g>

      {/* Header and footer */}
      <g
        fill={colors.primary}
        fontSize="9"
        letterSpacing="1.8"
        fontFamily="monospace"
        opacity={opacity.annotation}
      >
        <text x="125" y="38">
          SYSTEM ARCHITECTURE / 004
        </text>

        <text x="125" y="570">
          DISTRIBUTION / ORCHESTRATION / PERSISTENCE
        </text>

        <text x="675" y="570" textAnchor="end">
          FIG. 04
        </text>
      </g>

      {/* Centre registration marks */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.fine}
        strokeOpacity={opacity.secondary}
      >
        <path d="M340 55V65M335 60H345" />
        <path d="M340 535V545M335 540H345" />
      </g>
    </svg>
  );
}
