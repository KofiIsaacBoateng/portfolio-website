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
          <stop offset="1" stopColor={colors.primary} />
        </linearGradient>
      </defs>

      {/* Registration marks */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        opacity={opacity.secondary}
      >
        <path d="M75 55H105 M75 55V85" />
        <path d="M695 55H725 M725 55V85" />
        <path d="M75 538H105 M75 508V538" />
        <path d="M695 538H725 M725 508V538" />
      </g>

      {/* Drawing boundary */}
      <rect
        x="88"
        y="55"
        width="624"
        height="483"
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeDasharray="5 7"
        opacity={opacity.guide}
      />

      {/* Central alignment axes */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeDasharray="5 7"
        opacity={opacity.guide}
      >
        <path d="M400 65V535" />
        <path d="M110 300H690" />
      </g>

      {/* Exploded alignment guides */}
      <g
        stroke={colors.primary}
        strokeWidth={strokes.secondary}
        strokeDasharray="4 6"
        opacity={opacity.secondary}
      >
        <path d="M400 170V195" />
        <path d="M400 270V285" />
        <path d="M400 355V390" />
        <path d="M400 465V485" />
      </g>

      {/* Construction circles */}
      <g
        stroke={colors.secondary}
        strokeWidth={strokes.guide}
        strokeDasharray="3 6"
        opacity={opacity.guide}
      >
        <circle cx="400" cy="135" r="128" />
        <circle cx="400" cy="235" r="108" />
        <circle cx="400" cy="435" r="108" />
      </g>

      {/* Lower housing */}
      <g stroke={colors.primary} strokeWidth={strokes.primary}>
        <ellipse
          cx="400"
          cy="510"
          rx="110"
          ry="36"
          fill="#070709"
          fillOpacity="0.88"
        />
        <ellipse
          cx="400"
          cy="510"
          rx="78"
          ry="25"
          strokeWidth={strokes.secondary}
          opacity={opacity.secondary}
        />
        <path d="M290 510V526Q400 572 510 526V510" />
      </g>

      {/* Lower bearing */}
      <g stroke={colors.highlight} strokeWidth={strokes.primary}>
        <ellipse
          cx="400"
          cy="435"
          rx="88"
          ry="30"
          fill="#070709"
          fillOpacity="0.88"
        />
        <ellipse
          cx="400"
          cy="435"
          rx="58"
          ry="20"
          strokeWidth={strokes.secondary}
          opacity={opacity.secondary}
        />
        <path d="M312 435V451Q400 482 488 451V435" />
        <ellipse
          cx="400"
          cy="451"
          rx="88"
          ry="30"
          strokeDasharray="3 5"
          strokeWidth={strokes.guide}
          opacity={opacity.guide}
        />
      </g>

      {/* Central shaft */}
      <g stroke={colors.highlight} strokeWidth={strokes.primary}>
        <rect
          x="376"
          y="280"
          width="48"
          height="130"
          fill="#070709"
          fillOpacity="0.9"
          stroke="none"
        />
        <path d="M376 280V410 M424 280V410" />
        <ellipse cx="400" cy="280" rx="24" ry="8.5" fill="#070709" />
        <ellipse cx="400" cy="410" rx="24" ry="8.5" />
        <path
          d="M376 344H424 M376 356H424"
          strokeWidth={strokes.secondary}
          opacity={opacity.secondary}
        />
      </g>

      {/* Upper bearing */}
      <g stroke={colors.highlight} strokeWidth={strokes.primary}>
        <ellipse
          cx="400"
          cy="235"
          rx="88"
          ry="30"
          fill="#070709"
          fillOpacity="0.88"
        />
        <ellipse
          cx="400"
          cy="235"
          rx="58"
          ry="20"
          strokeWidth={strokes.secondary}
          opacity={opacity.secondary}
        />
        <path d="M312 235V251Q400 282 488 251V235" />
        <path
          d="M342 235V248 M458 235V248"
          strokeWidth={strokes.guide}
          opacity={opacity.secondary}
        />
        <ellipse
          cx="400"
          cy="251"
          rx="88"
          ry="30"
          strokeDasharray="3 5"
          strokeWidth={strokes.guide}
          opacity={opacity.guide}
        />
      </g>

      {/* Upper housing */}
      <g
        stroke="url(#mechanical-highlight)"
        strokeWidth={strokes.primary + 0.4}
      >
        <ellipse
          cx="400"
          cy="135"
          rx="110"
          ry="36"
          fill="#070709"
          fillOpacity="0.88"
        />
        <ellipse
          cx="400"
          cy="135"
          rx="78"
          ry="25"
          strokeWidth={strokes.secondary}
          opacity={opacity.secondary}
        />
        <path d="M290 135V166Q400 212 510 166V135" />
        <path
          d="M322 135V161 M478 135V161"
          strokeWidth={strokes.guide}
          opacity={opacity.secondary}
        />
        <ellipse
          cx="400"
          cy="166"
          rx="110"
          ry="36"
          strokeDasharray="3 5"
          strokeWidth={strokes.guide}
          opacity={opacity.guide}
        />
      </g>

      {/* Radial reference marks */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        opacity={opacity.secondary}
      >
        <path d="M400 10V30 M390 20H410" />
        <path d="M400 570V590 M390 580H410" />
        <path d="M68 300H88 M78 290V310" />
        <path d="M712 300H732 M722 290V310" />
      </g>

      {/* Component callouts */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        opacity={opacity.annotation}
      >
        <path d="M510 150L572 115H675" />
        <path d="M488 235L572 220H675" />
        <path d="M424 345L572 345H675" />
        <path d="M488 435L572 460H675" />
      </g>

      {/* Callout points */}
      <g fill={colors.highlight}>
        <circle cx="510" cy="150" r="3.5" />
        <circle cx="488" cy="235" r="3.5" />
        <circle cx="424" cy="345" r="3.5" />
        <circle cx="488" cy="435" r="3.5" />
      </g>

      {/* Enlarged component labels */}
      <g
        fill={colors.highlight}
        fontSize="12"
        fontWeight="700"
        letterSpacing="1.8"
        fontFamily="monospace"
        opacity={opacity.annotation}
      >
        <text x="575" y="106">
          01 / HOUSING
        </text>
        <text x="575" y="211">
          02 / BEARING
        </text>
        <text x="575" y="336">
          03 / SHAFT
        </text>
        <text x="575" y="451">
          04 / LOWER RING
        </text>
      </g>

      {/* Dimension indicators */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.secondary}
        opacity={opacity.annotation}
      >
        <path d="M258 135H230 M258 510H230 M242 135V510" />
        <path d="M236 146L242 135L248 146" />
        <path d="M236 499L242 510L248 499" />
      </g>

      {/* Measurement ticks */}
      <g
        stroke={colors.highlight}
        strokeWidth={strokes.fine}
        opacity={opacity.annotation}
      >
        {Array.from({ length: 15 }, (_, i) => (
          <path key={i} d={`M${375 + i * 3.5} 88V${i % 2 === 0 ? 96 : 92}`} />
        ))}
      </g>

      {/* Header and footer */}
      <g
        fill={colors.highlight}
        fontSize="12"
        fontWeight="600"
        letterSpacing="2.2"
        fontFamily="monospace"
        opacity={opacity.annotation}
      >
        <text x="102" y="36">
          MECHANICAL STUDY // 003
        </text>
        <text x="102" y="568">
          ASSEMBLY / ALIGNMENT / STRUCTURE
        </text>
        <text x="575" y="505">
          EXPLODED VIEW
        </text>
      </g>

      {/* Handwritten annotation */}
      <g opacity={opacity.annotation}>
        <text
          x="105"
          y="190"
          fill={colors.highlight}
          fontSize="17"
          fontStyle="italic"
          fontFamily="cursive"
          transform="rotate(-6 105 190)"
        >
          concentric alignment
        </text>

        <path
          d="M255 195Q282 210 310 220"
          stroke={colors.highlight}
          strokeWidth={strokes.secondary}
        />
      </g>
    </svg>
  );
}
