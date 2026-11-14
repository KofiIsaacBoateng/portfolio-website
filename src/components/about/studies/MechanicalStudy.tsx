import { STUDY_THEME } from "./studyTheme";

const { colors, opacity, strokes } = STUDY_THEME;

export default function MechanicalStudy() {
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
          id="mechanical-highlight"
          x1="295"
          y1="135"
          x2="505"
          y2="510"
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
        <path d="M80 55H105 M80 55V80" />
        <path d="M695 55H720 M720 55V80" />
        <path d="M80 535H105 M80 510V535" />
        <path d="M695 535H720 M720 510V535" />
      </g>

      {/* Drawing boundary */}
      <rect
        x="90"
        y="55"
        width="620"
        height="480"
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeDasharray="4 7"
        opacity={opacity.secondary}
      />

      {/* Central alignment axes */}
      <g
        stroke={colors.primary}
        strokeWidth={strokes.guide}
        strokeDasharray="5 7"
        opacity={opacity.guide}
      >
        <path d="M400 65V535" />
        <path d="M115 300H685" />
      </g>

      {/* Exploded alignment guides */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeDasharray="4 6"
        opacity={opacity.secondary}
      >
        <path d="M400 170V195" />
        <path d="M400 270V285" />
        <path d="M400 355V390" />
        <path d="M400 465V485" />
      </g>

      {/* Upper housing */}
      <g stroke="url(#mechanical-highlight)" strokeWidth={strokes.primary}>
        <ellipse cx="400" cy="135" rx="105" ry="35" />
        <ellipse
          cx="400"
          cy="135"
          rx="75"
          ry="24"
          strokeWidth={strokes.secondary}
          opacity={opacity.secondary}
        />
        <path d="M295 135V165Q400 210 505 165V135" />
        <path
          d="M325 135V160 M475 135V160"
          strokeWidth={strokes.guide}
          opacity={opacity.secondary}
        />
        <ellipse
          cx="400"
          cy="165"
          rx="105"
          ry="35"
          strokeDasharray="3 5"
          strokeWidth={strokes.guide}
          opacity={opacity.guide}
        />
      </g>

      {/* Upper bearing */}
      <g stroke={colors.highlight} strokeWidth={strokes.secondary}>
        <ellipse cx="400" cy="235" rx="85" ry="29" />
        <ellipse
          cx="400"
          cy="235"
          rx="56"
          ry="19"
          opacity={opacity.secondary}
        />
        <path d="M315 235V250Q400 280 485 250V235" />
        <path
          d="M344 235V247 M456 235V247"
          strokeWidth={strokes.guide}
          opacity={opacity.secondary}
        />
        <ellipse
          cx="400"
          cy="250"
          rx="85"
          ry="29"
          strokeDasharray="3 5"
          strokeWidth={strokes.guide}
          opacity={opacity.guide}
        />
      </g>

      {/* Central shaft */}
      <g stroke={colors.primary} strokeWidth={strokes.primary}>
        <path d="M378 280V410 M422 280V410" />
        <ellipse cx="400" cy="280" rx="22" ry="8" />
        <ellipse cx="400" cy="410" rx="22" ry="8" />
        <path
          d="M378 345H422 M378 355H422"
          strokeWidth={strokes.guide}
          opacity={opacity.secondary}
        />
      </g>

      {/* Lower bearing */}
      <g stroke={colors.highlight} strokeWidth={strokes.secondary}>
        <ellipse cx="400" cy="435" rx="85" ry="29" />
        <ellipse
          cx="400"
          cy="435"
          rx="56"
          ry="19"
          opacity={opacity.secondary}
        />
        <path d="M315 435V450Q400 480 485 450V435" />
        <ellipse
          cx="400"
          cy="450"
          rx="85"
          ry="29"
          strokeDasharray="3 5"
          strokeWidth={strokes.guide}
          opacity={opacity.guide}
        />
      </g>

      {/* Lower housing */}
      <g stroke={colors.primary} strokeWidth={strokes.primary}>
        <ellipse cx="400" cy="510" rx="105" ry="35" />
        <ellipse
          cx="400"
          cy="510"
          rx="75"
          ry="24"
          strokeWidth={strokes.secondary}
          opacity={opacity.secondary}
        />
        <path d="M295 510V525Q400 570 505 525V510" />
      </g>

      {/* Construction circles */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeDasharray="3 6"
        opacity={opacity.secondary}
      >
        <circle cx="400" cy="135" r="125" />
        <circle cx="400" cy="235" r="105" />
        <circle cx="400" cy="435" r="105" />
      </g>

      {/* Radial reference marks */}
      <g
        stroke={colors.primary}
        strokeWidth={strokes.fine}
        opacity={opacity.secondary}
      >
        <path d="M400 10V30 M390 20H410" />
        <path d="M400 570V590 M390 580H410" />
        <path d="M70 300H90 M80 290V310" />
        <path d="M710 300H730 M720 290V310" />
      </g>

      {/* Component callouts */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.guide}
        opacity={opacity.annotation}
      >
        <path d="M505 150L575 115H640" />
        <path d="M485 235L570 220H640" />
        <path d="M422 345L565 345H640" />
        <path d="M485 435L565 460H640" />
      </g>

      {/* Callout points */}
      <g fill={colors.highlight}>
        <circle cx="505" cy="150" r="3" />
        <circle cx="485" cy="235" r="3" />
        <circle cx="422" cy="345" r="3" />
        <circle cx="485" cy="435" r="3" />
      </g>

      {/* Component labels */}
      <g
        fill={colors.primary}
        fontSize="10"
        letterSpacing="1.5"
        fontFamily="monospace"
        opacity={opacity.annotation}
      >
        <text x="580" y="105">
          01 / HOUSING
        </text>
        <text x="580" y="210">
          02 / BEARING
        </text>
        <text x="580" y="335">
          03 / SHAFT
        </text>
        <text x="580" y="450">
          04 / LOWER RING
        </text>
      </g>

      {/* Dimension indicators */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.guide}
        opacity={opacity.annotation}
      >
        <path d="M260 135H235 M260 510H235 M245 135V510" />
        <path d="M239 145L245 135L251 145" />
        <path d="M239 500L245 510L251 500" />
      </g>

      {/* Measurement ticks */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.fine}
        opacity={opacity.annotation}
      >
        {Array.from({ length: 15 }, (_, i) => (
          <path key={i} d={`M${375 + i * 3.5} 90V${i % 2 === 0 ? 96 : 93}`} />
        ))}
      </g>

      {/* Header and footer */}
      <g
        fill={colors.primary}
        fontSize="10"
        letterSpacing="2"
        fontFamily="monospace"
        opacity={opacity.annotation}
      >
        <text x="105" y="35">
          MECHANICAL STUDY / 003
        </text>
        <text x="105" y="565">
          ASSEMBLY / ALIGNMENT / STRUCTURE
        </text>
        <text x="580" y="500">
          EXPLODED VIEW
        </text>
      </g>

      {/* Handwritten annotation */}
      <g opacity={opacity.annotation}>
        <text
          x="110"
          y="190"
          fill={colors.highlight}
          fontSize="15"
          fontStyle="italic"
          fontFamily="cursive"
          transform="rotate(-6 110 190)"
        >
          concentric alignment
        </text>

        <path
          d="M245 195Q275 210 305 220"
          stroke={colors.highlight}
          strokeWidth={strokes.guide}
        />
      </g>
    </svg>
  );
}
