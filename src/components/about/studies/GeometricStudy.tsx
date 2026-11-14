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
            opacity={opacity.subtle}
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
          <stop offset="1" stopColor={colors.secondary} />
        </linearGradient>
      </defs>

      {/* Corner registration marks */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        opacity={opacity.secondary}
      >
        <path d="M80 65H105 M80 65V90" />
        <path d="M695 65H720 M720 65V90" />
        <path d="M80 505H105 M80 480V505" />
        <path d="M695 505H720 M720 480V505" />
      </g>

      {/* Main construction boundary */}
      <rect
        x="105"
        y="65"
        width="570"
        height="440"
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        opacity={opacity.secondary}
      />

      {/* Reference axes */}
      <g
        stroke={colors.primary}
        strokeWidth={strokes.guide}
        strokeDasharray="4 7"
        opacity={opacity.guide}
      >
        <path d="M350 35V535" />
        <path d="M70 285H710" />
        <path d="M350 55L350 515" />
      </g>

      {/* Primary geometric form */}
      <circle
        cx="350"
        cy="285"
        r="175"
        stroke={colors.primary}
        strokeWidth={strokes.primary}
        opacity={opacity.primary}
      />

      {/* Secondary construction circles */}
      <circle
        cx="350"
        cy="285"
        r="165"
        stroke={colors.secondary}
        strokeWidth={strokes.secondary}
        opacity={opacity.secondary}
      />

      <circle
        cx="350"
        cy="285"
        r="145"
        stroke={colors.primary}
        strokeWidth={strokes.guide}
        strokeDasharray="3 6"
        opacity={opacity.secondary}
      />

      <circle
        cx="485"
        cy="245"
        r="105"
        stroke={colors.primary}
        strokeWidth={strokes.secondary}
        opacity={opacity.secondary}
      />

      <circle
        cx="485"
        cy="245"
        r="88"
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeDasharray="2 5"
        opacity={opacity.secondary}
      />

      {/* Construction rectangle */}
      <rect
        x="175"
        y="110"
        width="350"
        height="350"
        stroke={colors.primary}
        strokeWidth={strokes.guide}
        strokeDasharray="5 6"
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
            d={`M${175 + i * 25} 100V${i % 2 === 0 ? 106 : 103}`}
          />
        ))}

        {Array.from({ length: 15 }, (_, i) => (
          <path
            key={`vertical-${i}`}
            d={`M${165 + (i % 2 === 0 ? 6 : 3)} ${110 + i * 25}H${165}`}
          />
        ))}
      </g>

      {/* Dimension lines */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.guide}
        opacity={opacity.annotation}
      >
        <path d="M175 80V55 M525 80V55 M175 65H525" />
        <path d="M545 110H565 M545 460H565 M555 110V460" />
        <path d="M175 72L183 68 M175 72L183 76" />
        <path d="M525 72L517 68 M525 72L517 76" />
      </g>

      {/* Radial reference */}
      <path
        d="M350 285L485 245"
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        strokeDasharray="3 4"
        opacity={opacity.primary}
      />

      {/* Control points */}
      <g fill={colors.highlight}>
        <circle cx="350" cy="110" r="3.5" />
        <circle cx="350" cy="460" r="3.5" />
        <circle cx="175" cy="285" r="3.5" />
        <circle cx="525" cy="285" r="3.5" />
        <circle cx="350" cy="285" r="3" />
        <circle cx="485" cy="245" r="3" />
      </g>

      {/* Fine centre markers */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.fine}
        opacity={opacity.primary}
      >
        <path d="M337 285H363 M350 272V298" />
        <circle cx="350" cy="285" r="7" />
        <circle cx="485" cy="245" r="7" />
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
          GEOMETRIC STUDY / 001
        </text>
        <text x="570" y="115">
          RADIUS
        </text>
        <text x="570" y="132">
          R = 175
        </text>
        <text x="175" y="485">
          CONSTRUCTION AXIS
        </text>
        <text x="175" y="525">
          FORM / PROPORTION / STRUCTURE
        </text>
      </g>

      {/* Handwritten annotation */}
      <g opacity={opacity.annotation}>
        <text
          x="540"
          y="390"
          fill={colors.highlight}
          fontSize="15"
          fontStyle="italic"
          fontFamily="cursive"
          transform="rotate(-5 540 390)"
        >
          geometric relationships
        </text>

        <path
          d="M540 400Q520 420 495 410"
          stroke={colors.highlight}
          strokeWidth={strokes.guide}
        />
      </g>

      {/* Small coordinate labels */}
      <g
        fill={colors.muted}
        fontSize="8"
        fontFamily="monospace"
        letterSpacing="1"
      >
        <text x="340" y="96">
          Y+
        </text>
        <text x="535" y="289">
          X+
        </text>
        <text x="158" y="289">
          X-
        </text>
        <text x="340" y="477">
          Y-
        </text>
      </g>
    </svg>
  );
}
