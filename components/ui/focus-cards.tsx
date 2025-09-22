"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type FocusCardProps = {
  image: string;            // e.g. "/darkfrost.png"
  alt?: string;
  title: string;
  description?: string;     // short line shown on hover
  summary?: string;         // longer text (optional, used on hover)
  href?: string;            // click-through
  tags?: string[];          // chips on hover
  className?: string;
};

type CardItemProps = {
  card: FocusCardProps;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
};

const CardItem = React.memo(function CardItem({
  card,
  index,
  hovered,
  setHovered,
}: CardItemProps) {
  const content = (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative h-60 w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900 md:h-96",
        "transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-[1px] scale-[0.98]",
        card.className
      )}
      aria-label={card.title}
    >
      {/* Image */}
      <img
        src={card.image}
        alt={card.alt ?? card.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient mask + hover overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent",
          "transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-90"
        )}
      />

      {/* Text on bottom */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 p-4 md:p-6 text-neutral-50 transition-opacity duration-300"
        )}
      >
        <h3 className="text-lg font-semibold md:text-2xl">{card.title}</h3>
        {(card.description || card.summary) && (
          <p
            className={cn(
              "mt-1 text-sm/5 text-neutral-200",
              hovered === index ? "opacity-100" : "opacity-90"
            )}
          >
            {hovered === index ? card.summary ?? card.description : card.description}
          </p>
        )}
        {!!card.tags?.length && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {card.tags.map((t) => (
              <span
                key={t}
                className="rounded-md border border-white/20 bg-white/10 px-2 py-0.5 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Make whole card clickable if href provided
  return card.href ? (
    <Link href={card.href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-magenta">
      {content}
    </Link>
  ) : (
    content
  );
});

export function FocusCardsContainer({ cards }: { cards: FocusCardProps[] }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
      {cards.map((card, index) => (
        <CardItem
          key={`${card.title}-${index}`}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
