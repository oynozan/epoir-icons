import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { icons } from "epoir-icons";
import { IconDetail } from "@/components/icon-detail";

export function generateStaticParams() {
  return icons.map((icon) => ({ name: icon.name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  return {
    title: `${name} - Epoir Icons`,
    description: `Animated ${name} icon with copy, download, and framework snippets.`,
  };
}

export default async function IconPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  if (!icons.some((icon) => icon.name === name)) notFound();
  return <IconDetail name={name} />;
}
