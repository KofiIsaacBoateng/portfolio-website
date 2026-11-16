import { STUDY_THEME } from "./studyTheme";

export default function SoftwareArchitectureStudy() {
  const { colors, opacity, strokes } = STUDY_THEME;

  const layers = [
    {
      name: "CLIENT INTERFACES",
      y: 100,
      boxes: [
        { x: 180, label: "WEB" },
        { x: 350, label: "MOBILE" },
        { x: 520, label: "EXTERNAL" },
      ],
    },
    {
      name: "GATEWAY / ROUTING",
      y: 192,
      boxes: [{ x: 350, label: "API GATEWAY" }],
    },
    {
      name: "APPLICATION SERVICES",
      y: 284,
      boxes: [
        { x: 180, label: "AUTH" },
        { x: 350, label: "CORE" },
        { x: 520, label: "PAYMENTS" },
      ],
    },
    {
      name: "ASYNC PROCESSING",
      y: 376,
      boxes: [
        { x: 265, label: "EVENT QUEUE" },
        { x: 445, label: "WORKERS" },
      ],
    },
    {
      name: "PERSISTENCE",
      y: 468,
      boxes: [
        { x: 180, label: "DATABASE" },
        { x: 350, label: "CACHE" },
        { x: 520, label: "STORAGE" },
      ],
    },
  ];

  const boxWidth = 136;
  const boxHeight = 38;

  const connections = [
    "M180 138L350 192",
    "M350 138V192",
    "M520 138L350 192",

    "M350 230L180 284",
    "M350 230V284",
    "M350 230L520 284",

    "M180 322L265 376",
    "M350 322L265 376",
    "M520 322L445 376",

    "M333 395H377",

    "M265 414L180 468",
    "M355 414L350 468",
    "M445 414L520 468",
  ];

  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://w3.org"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Registration marks */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        opacity={opacity.secondary}
      >
        <path d="M80 62H108M92 50V78" />
        <path d="M692 62H720M708 50V78" />
        <path d="M80 542H108M92 528V556" />
        <path d="M692 542H720M708 528V556" />
      </g>

      {/* Main drawing boundary */}
      <rect
        x="92"
        y="62"
        width="616"
        height="480"
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeOpacity={opacity.guide}
        strokeDasharray="5 7"
      />

      {/* Vertical construction axes */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeOpacity={opacity.guide}
        strokeDasharray="4 7"
      >
        <path d="M180 72V532" />
        <path d="M350 72V532" />
        <path d="M520 72V532" />
      </g>

      {/* Horizontal reference lines */}
      <g
        stroke={colors.muted}
        strokeWidth={strokes.fine}
        strokeOpacity={0.28}
        strokeDasharray="3 8"
      >
        {layers.map((layer) => (
          <path key={layer.name} d={`M105 ${layer.y + 19}H695`} />
        ))}
      </g>

      {/* Architecture layers */}
      {layers.map((layer, index) => (
        <g key={layer.name}>
          <rect
            x="112"
            y={layer.y - 28}
            width="576"
            height="80"
            rx="4"
            stroke={colors.primary}
            strokeWidth={strokes.secondary}
            strokeOpacity={0.45}
            strokeDasharray={index % 2 === 0 ? "none" : "5 5"}
          />

          {/* Layer index */}
          <text
            x="102"
            y={layer.y - 11}
            fill={colors.highlight}
            fontSize="11"
            fontWeight="700"
            fontFamily="monospace"
            textAnchor="end"
            opacity={opacity.annotation}
          >
            0{index + 1}
          </text>

          <text
            x="126"
            y={layer.y - 11}
            fill={colors.primary}
            fontSize="11"
            fontWeight="600"
            letterSpacing="2.2"
            fontFamily="monospace"
            opacity={opacity.annotation}
          >
            {layer.name}
          </text>

          {/* Architecture components */}
          {layer.boxes.map((box) => (
            <g key={box.label}>
              {/* Solid dark backing plate so grid/axes never bleed through text */}
              <rect
                x={box.x - boxWidth / 2}
                y={layer.y}
                width={boxWidth}
                height={boxHeight}
                rx="3"
                fill="#070709"
                fillOpacity="0.92"
                stroke={colors.highlight}
                strokeWidth={strokes.primary}
                strokeOpacity={opacity.primary}
              />

              <rect
                x={box.x - boxWidth / 2 + 5}
                y={layer.y + 5}
                width={boxWidth - 10}
                height={boxHeight - 10}
                rx="1.5"
                stroke={colors.secondary}
                strokeWidth={strokes.fine}
                strokeOpacity={opacity.guide}
              />

              <circle
                cx={box.x - boxWidth / 2 + 12}
                cy={layer.y + boxHeight / 2}
                r="2.5"
                fill={colors.highlight}
              />

              <text
                x={box.x + 6}
                y={layer.y + 23}
                fill={colors.highlight}
                fontSize="11.5"
                fontWeight="700"
                textAnchor="middle"
                letterSpacing="1.4"
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
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        strokeOpacity={0.85}
      >
        {connections.map((path, index) => (
          <path key={index} d={path} />
        ))}
      </g>

      {/* Direction indicators */}
      <g fill={colors.highlight}>
        <path d="M345 184L350 192L355 184Z" />
        <path d="M345 276L350 284L355 276Z" />
        <path d="M260 368L265 376L270 368Z" />
        <path d="M440 368L445 376L450 368Z" />
        <path d="M175 460L180 468L185 460Z" />
        <path d="M345 460L350 468L355 460Z" />
        <path d="M515 460L520 468L525 460Z" />
        <path d="M370 390L378 395L370 400Z" />
      </g>

      {/* Connection junctions */}
      <g fill={colors.highlight} opacity={opacity.primary}>
        <circle cx="350" cy="192" r="3" />
        <circle cx="350" cy="284" r="3" />
        <circle cx="265" cy="376" r="3" />
        <circle cx="445" cy="376" r="3" />
        <circle cx="350" cy="468" r="3" />
      </g>

      {/* Side annotations */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        strokeOpacity={opacity.annotation}
      >
        <path d="M688 192H706" />
        <path d="M688 284H706" />
        <path d="M688 376H706" />
      </g>

      <g
        fill={colors.highlight}
        fontSize="10.5"
        fontWeight="600"
        letterSpacing="1.8"
        fontFamily="monospace"
        opacity={opacity.annotation}
      >
        <text x="692" y="182">
          ROUTE
        </text>
        <text x="692" y="274">
          EXECUTE
        </text>
        <text x="692" y="366">
          PROCESS
        </text>
      </g>

      {/* Technical callouts */}
      <g
        fill={colors.highlight}
        fontFamily="cursive"
        fontSize="16"
        opacity={opacity.annotation}
      >
        <text x="530" y="176" transform="rotate(-5 530 176)">
          request routing
        </text>

        <text x="505" y="452" transform="rotate(-4 505 452)">
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
            d={`M${112 + index * 28.8} 52V${index % 5 === 0 ? 62 : 57}`}
          />
        ))}
        {Array.from({ length: 17 }).map((_, index) => (
          <path
            key={index}
            d={`M${80 + index * 5} 542H${index % 4 === 0 ? 92 : 86}`}
          />
        ))}
      </g>

      {/* Header and footer */}
      <g
        fill={colors.highlight}
        fontSize="12"
        fontWeight="600"
        letterSpacing="2"
        fontFamily="monospace"
        opacity={opacity.annotation}
      >
        <text x="112" y="38">
          SYSTEM ARCHITECTURE // 004
        </text>

        <text x="112" y="576">
          DISTRIBUTION / ORCHESTRATION / PERSISTENCE
        </text>

        <text x="688" y="576" textAnchor="end">
          FIG. 04
        </text>
      </g>

      {/* Centre registration marks */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        strokeOpacity={opacity.secondary}
      >
        <path d="M350 50V62M344 56H356" />
        <path d="M350 542V554M344 548H356" />
      </g>
    </svg>
  );
}
