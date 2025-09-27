// components/HeroVideo.tsx
"use client";

type Props = {
  mp4: string;
  poster: string;
  webm?: string;
  children?: React.ReactNode;
};

export default function HeroVideo({ mp4, webm, poster, children }: Props) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* video background */}
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          aria-hidden="true"
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" />
        </video>

        {/* contrast layers to protect the headline */}
        <div className="absolute inset-0 bg-black/60" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 20% 30%, rgba(226,0,116,0.25) 0%, transparent 60%), radial-gradient(90% 70% at 80% 70%, rgba(5,242,175,0.20) 0%, transparent 60%)",
          }}
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_50%,black_60%,transparent_100%)] bg-black/20" />
      </div>

      {/* content (your existing text/buttons) */}
      <div className="mx-auto max-w-7xl px-6 py-28 sm:py-36">
        <div className="max-w-3xl">
          {children}
        </div>
      </div>

      {/* reduce motion support */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          video { display: none; }
        }
      `}</style>
    </section>
  );
}
