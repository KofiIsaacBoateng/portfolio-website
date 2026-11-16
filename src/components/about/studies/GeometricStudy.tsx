import { STUDY_THEME } from "./studyTheme";

const { colors, opacity, strokes } = STUDY_THEME;

export default function GeometricStudy() {
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
        <pattern
          id="geometric-fine-grid"
          width="12"
          height="12"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M12 0H0V12"
            stroke={colors.muted}
            strokeWidth={strokes.fine}
            opacity={0.25}
          />
        </pattern>

        <linearGradient
          id="geometric-highlight"
          x1="175"
          y1="110"
          x2="525"
          y2="460"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={colors.highlight} />
          <stop offset="1" stopColor={colors.primary} />
        </linearGradient>
      </defs>

      {/* Corner registration marks */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        opacity={opacity.secondary}
      >
        <path d="M75 62H105 M75 62V92" />
        <path d="M695 62H725 M725 62V92" />
        <path d="M75 508H105 M75 478V508" />
        <path d="M695 508H725 M725 478V508" />
      </g>

      {/* Main construction boundary */}
      <rect
        x="100"
        y="62"
        width="580"
        height="446"
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        opacity={opacity.guide}
      />

      {/* Reference axes */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeDasharray="5 7"
        opacity={opacity.guide}
      >
        <path d="M350 32V538" />
        <path d="M68 285H712" />
      </g>

      {/* Primary geometric form */}
      <circle
        cx="350"
        cy="285"
        r="175"
        stroke={colors.highlight}
        strokeWidth={strokes.primary + 0.4}
        opacity={opacity.primary}
      />

      {/* Secondary construction circles */}
      <circle
        cx="350"
        cy="285"
        r="163"
        stroke={colors.primary}
        strokeWidth={strokes.secondary}
        opacity={opacity.secondary}
      />

      <circle
        cx="350"
        cy="285"
        r="142"
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeDasharray="4 6"
        opacity={opacity.secondary}
      />

      <circle
        cx="485"
        cy="245"
        r="105"
        stroke={colors.highlight}
        strokeWidth={strokes.primary}
        opacity={0.9}
      />

      <circle
        cx="485"
        cy="245"
        r="86"
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeDasharray="3 5"
        opacity={opacity.secondary}
      />

      {/* Construction rectangle */}
      <rect
        x="175"
        y="110"
        width="350"
        height="350"
        stroke={colors.primary}
        strokeWidth={strokes.secondary}
        strokeDasharray="6 6"
        opacity={opacity.secondary}
      />

      {/* Diagonal construction lines */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        opacity={opacity.secondary}
      >
        <path d="M175 110L525 460" />
        <path d="M525 110L175 460" />
        <path d="M175 285H525" strokeDasharray="3 5" />
        <path d="M350 110V460" strokeDasharray="3 5" />
      </g>

      {/* Measurement ticks */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.fine}
        opacity={opacity.annotation}
      >
        {Array.from({ length: 15 }, (_, i) => (
          <path
            key={`horizontal-${i}`}
            d={`M${175 + i * 25} 98V${i % 2 === 0 ? 106 : 102}`}
          />
        ))}

        {Array.from({ length: 15 }, (_, i) => (
          <path
            key={`vertical-${i}`}
            d={`M${163 + (i % 2 === 0 ? 8 : 4)} ${110 + i * 25}H${163}`}
          />
        ))}
      </g>

      {/* Dimension lines */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        opacity={opacity.annotation}
      >
        <path d="M175 80V54 M525 80V54 M175 64H525" />
        <path d="M545 110H566 M545 460H566 M556 110V460" />
        <path d="M175 72L184 68 M175 72L184 76" />
        <path d="M525 72L516 68 M525 72L516 76" />
      </g>

      {/* Radial reference */}
      <path
        d="M350 285L485 245"
        stroke={colors.highlight}
        strokeWidth={strokes.primary}
        strokeDasharray="4 4"
        opacity={opacity.primary}
      />

      {/* Control points */}
      <g fill={colors.highlight}>
        <circle cx="350" cy="110" r="4" />
        <circle cx="350" cy="460" r="4" />
        <circle cx="175" cy="285" r="4" />
        <circle cx="525" cy="285" r="4" />
        <circle cx="350" cy="285" r="3.5" />
        <circle cx="485" cy="245" r="3.5" />
      </g>

      {/* Fine centre markers */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        opacity={opacity.primary}
      >
        <path d="M335 285H365 M350 270V300" />
        <circle cx="350" cy="285" r="8" />
        <circle cx="485" cy="245" r="8" />
      </g>

      {/* Enlarged technical annotations */}
      <g
        fill={colors.highlight}
        fontSize="12"
        fontWeight="600"
        letterSpacing="2.2"
        fontFamily="monospace"
        opacity={opacity.annotation}
      >
        <text x="100" y="38">
          GEOMETRIC STUDY // 001
        </text>
        <text x="572" y="114">
          RADIUS
        </text>
        <text x="572" y="134" fontWeight="700">
          R = 175
        </text>
        <text x="175" y="492">
          CONSTRUCTION AXIS
        </text>
        <text x="175" y="534">
          FORM / PROPORTION / STRUCTURE
        </text>
      </g>

      {/* Handwritten annotation */}
      <g opacity={opacity.annotation}>
        <text
          x="535"
          y="390"
          fill={colors.highlight}
          fontSize="17"
          fontStyle="italic"
          fontFamily="cursive"
          transform="rotate(-5 535 390)"
        >
          geometric relationships
        </text>

        <path
          d="M535 402Q515 422 490 412"
          stroke={colors.highlight}
          strokeWidth={strokes.secondary}
        />
      </g>

      {/* Enlarged coordinate labels */}
      <g
        fill={colors.primary}
        fontSize="11"
        fontWeight="600"
        fontFamily="monospace"
        letterSpacing="1.2"
        opacity={0.85}
      >
        <text x="338" y="94">
          Y+
        </text>
        <text x="536" y="289">
          X+
        </text>
        <text x="146" y="289">
          X-
        </text>
        <text x="338" y="479">
          Y-
        </text>
      </g>
    </svg>
  );
}
