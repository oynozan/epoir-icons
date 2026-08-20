export function CategoryChips({
  categories,
  onPick,
}: {
  categories: string[];
  onPick: (name: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((name) => (
        <button
          key={name}
          onClick={() => onPick(name)}
          className="rounded-lg border border-line bg-tile px-3 py-2 text-sm capitalize transition-colors hover:bg-tile-hover"
        >
          {name}
        </button>
      ))}
    </div>
  );
}

export function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-end gap-3">
      <span>{label}:</span>
      <span className="rounded-lg border border-line bg-tile px-3 py-1.5 text-xs text-fg">
        {value}
      </span>
    </div>
  );
}
