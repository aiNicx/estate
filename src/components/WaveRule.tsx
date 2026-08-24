export function WaveRule({ invert = false }: { invert?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 18"
      className={`wave-rule ${invert ? "wave-rule-invert" : ""}`}
    >
      <path
        d="M0 11 C 28 4, 44 16, 72 11 S 116 4, 144 11 188 18, 216 11 260 4, 288 11 312 16, 320 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}
