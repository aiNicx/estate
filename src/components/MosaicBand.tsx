const TILES = [
  "#1b3a4a",
  "#2d6a78",
  "#8b3e2a",
  "#b0892a",
  "#3c4f3d",
  "#e4eef0",
  "#4a5e48",
  "#c47a3a",
];

const HEIGHTS = [70, 100, 55, 90, 40, 80, 100, 60, 75, 45, 95, 50, 85, 65, 100, 42, 78, 58];

export function MosaicBand({ invert = false }: { invert?: boolean }) {
  return (
    <div className="mosaic-band" aria-hidden="true">
      {HEIGHTS.map((height, index) => (
        <i
          key={`${height}-${index}`}
          style={{
            height: `${height}%`,
            background: invert && index % 5 === 0 ? "#fbf8f2" : TILES[index % TILES.length],
            opacity: invert ? 0.86 : 1,
          }}
        />
      ))}
    </div>
  );
}
