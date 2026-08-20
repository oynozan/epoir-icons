"use client";

import { useRouter } from "next/navigation";
import { icons, type IconEntry } from "epoir-icons";
import { IconTile } from "@/components/animated";

export function MoreLikeThis({ current }: { current: IconEntry }) {
  const router = useRouter();
  const related = icons.filter(
    (icon) =>
      icon.name !== current.name &&
      icon.categories.some((c) => current.categories.includes(c)),
  );

  if (related.length === 0) return null;

  return (
    <section className="mt-16 border-t border-line pt-12">
      <h2 className="text-center text-2xl font-semibold tracking-tight">
        More icons like this
      </h2>
      <div
        className="mx-auto mt-8 grid max-w-3xl gap-2"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))",
        }}
      >
        {related.map((icon) => (
          <IconTile
            key={icon.name}
            icon={icon}
            onClick={() => router.push(`/icons/${icon.name}`)}
          />
        ))}
      </div>
    </section>
  );
}
