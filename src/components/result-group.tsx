export function ResultGroup({ label, results }: { label: string, results: string[][] }) {
  return (
    <div className="space-y-2">
      <h2 className="font-bold text-lg">
        {results.length}{" "}
        {results.length > 1
          ? `${label}s`
          : label
        }
      </h2>
      {results.map((item, idx) => (
        <h3 key={idx}>
          {item.join(" ")}
        </h3>
      ))}
    </div>

  )
}
