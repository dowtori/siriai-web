"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Logo =
  | { id: string; name: string; type: "svg"; path: string }
  | { id: string; name: string; type: "wordmark"; display: string; weight?: number; tracking?: string };

export type { Logo };

export const LOGOS: Logo[] = [
  { id: "hybe", name: "HYBE", type: "wordmark", display: "HYBE", weight: 800, tracking: "0.02em" },
  { id: "cj", name: "CJ ENM", type: "wordmark", display: "CJ ENM", weight: 700, tracking: "0.04em" },
  { id: "jyp", name: "JYP Entertainment", type: "wordmark", display: "JYP", weight: 800, tracking: "0.04em" },
  { id: "musinsa", name: "Musinsa", type: "wordmark", display: "MUSINSA", weight: 700, tracking: "0.06em" },
  { id: "cosrx", name: "COSRX", type: "wordmark", display: "COSRX", weight: 700, tracking: "0.08em" },
  { id: "innisfree", name: "innisfree", type: "wordmark", display: "innisfree", weight: 500, tracking: "-0.01em" },
  { id: "moev", name: "moev", type: "wordmark", display: "moev", weight: 500, tracking: "-0.02em" },
  { id: "oddtype", name: "oddtype", type: "wordmark", display: "oddtype", weight: 500, tracking: "-0.01em" },
  { id: "8division", name: "8 Division", type: "wordmark", display: "8DIVISION", weight: 600, tracking: "0.14em" },
  { id: "openai", name: "OpenAI", type: "wordmark", display: "OpenAI", weight: 600, tracking: "-0.01em" },
  { id: "anthropic", name: "Anthropic", type: "svg", path: "M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" },
  { id: "gemini", name: "Gemini", type: "svg", path: "M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" },
  { id: "antigravity", name: "Antigravity", type: "wordmark", display: "Antigravity", weight: 500, tracking: "-0.01em" },
  { id: "vercel", name: "Vercel", type: "svg", path: "m12 1.608 12 20.784H0Z" },
  { id: "nextjs", name: "Next.js", type: "svg", path: "M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z" },
  { id: "supabase", name: "Supabase", type: "svg", path: "M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C-.33 13.427.65 15.455 2.409 15.455h9.579l.113 7.51c.014.985 1.259 1.408 1.873.636l9.262-11.653c1.093-1.375.113-3.403-1.645-3.403h-9.642z" },
];

export function LogoItem({ logo }: { logo: Logo }) {
  if (logo.type === "svg") {
    return (
      <span
        aria-label={logo.name}
        title={logo.name}
        style={{
          display: "inline-flex",
          alignItems: "center",
          height: 28,
          color: "var(--fg-default)",
          opacity: 0.72,
        }}
      >
        <svg
          role="img"
          aria-hidden
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width={28}
          height={28}
          style={{ display: "block" }}
        >
          <path d={logo.path} fill="currentColor" />
        </svg>
      </span>
    );
  }
  return (
    <span
      aria-label={logo.name}
      title={logo.name}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: 20,
        fontWeight: logo.weight ?? 600,
        letterSpacing: logo.tracking ?? "0",
        color: "var(--fg-default)",
        opacity: 0.72,
        lineHeight: 1,
        whiteSpace: "nowrap",
        userSelect: "none",
      }}
    >
      {logo.display}
    </span>
  );
}

export default function ClientsSection() {
  const ref = useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const track = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section
      id="clients"
      ref={ref}
      style={{
        backgroundColor: "var(--surface-base)",
        color: "var(--fg-default)",
        overflow: "hidden",
      }}
    >
      <div className="mx-auto max-w-screen-xl px-6 pt-32 pb-12 md:px-10 md:pt-40 md:pb-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center text-[11px] uppercase tracking-[0.28em]"
          style={{ color: "var(--fg-muted)" }}
        >
          With
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
          className="mt-6 text-center tracking-[-0.02em]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 3.2vw, 3rem)",
            fontWeight: 500,
            lineHeight: 1.1,
          }}
        >
          Brands we&apos;ve sat with.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.75, ease: EASE, delay: 0.24 }}
          className="mt-5 text-center"
          style={{
            fontSize: "clamp(0.9375rem, 1.05vw, 1.0625rem)",
            lineHeight: 1.75,
            color: "var(--fg-muted)",
            wordBreak: "keep-all",
          }}
        >
          각자 다른 결, 같은 자세.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        className="relative pb-32 md:pb-40"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div
          className="flex w-max animate-siriai-marquee-slow"
          style={{ willChange: "transform" }}
        >
          {track.map((logo, i) => (
            <div
              key={`${logo.id}-${i}`}
              className="flex shrink-0 items-center justify-center"
              style={{ paddingLeft: 36, paddingRight: 36, height: 56 }}
            >
              <LogoItem logo={logo} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
