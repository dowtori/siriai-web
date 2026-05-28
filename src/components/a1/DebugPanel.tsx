"use client";

import { useEffect, useState } from "react";
import {
  A1_MOTION_DEFAULTS,
  A1_MOTION_RANGES,
  useA1Motion,
  type A1MotionParams,
} from "./motion-context";

function formatValue(key: keyof A1MotionParams, value: number): string {
  const r = A1_MOTION_RANGES[key];
  const precision = r.step < 0.01 ? 3 : r.step < 0.1 ? 2 : r.step < 1 ? 1 : 0;
  return value.toFixed(precision) + r.unit;
}

export default function DebugPanel() {
  const { params, update, reset, reducedMotion, setReducedMotion } = useA1Motion();
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // URL ?debug=1 → 패널 자동 노출. client mount 후만 가능 (window 의존).
    // React 19 lint(react-hooks/set-state-in-effect)의 합리적 예외.
    const sp = new URLSearchParams(window.location.search);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (sp.get("debug") === "1") setVisible(true);
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleCopy = async () => {
    const css =
      `/* A1 Motion tuning — generated ${new Date().toISOString().slice(0, 10)} */\n` +
      `const A1_MOTION: A1MotionParams = {\n` +
      (Object.keys(params) as Array<keyof A1MotionParams>)
        .map((k) => `  ${k}: ${params[k]},`)
        .join("\n") +
      `\n};`;
    try {
      await navigator.clipboard.writeText(css);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  if (!visible) {
    return (
      <button
        type="button"
        onClick={() => setVisible(true)}
        aria-label="Open A1 motion debug panel"
        style={{
          position: "fixed",
          right: 16,
          bottom: 16,
          zIndex: 9999,
          width: 32,
          height: 32,
          borderRadius: 999,
          border: "1px solid var(--a1-hairline-strong)",
          background: "var(--a1-paper)",
          color: "var(--a1-ink)",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ⚙
      </button>
    );
  }

  return (
    <aside
      role="region"
      aria-label="A1 motion debug panel"
      style={{
        position: "fixed",
        right: 16,
        top: 16,
        bottom: 16,
        width: 320,
        zIndex: 9999,
        background: "var(--a1-paper)",
        color: "var(--a1-ink)",
        border: "1px solid var(--a1-hairline-strong)",
        borderRadius: 8,
        boxShadow: "0 12px 32px rgba(15,20,25,0.08)",
        overflowY: "auto",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
      }}
    >
      <header
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid var(--a1-hairline)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        <span>A1 · motion</span>
        <button
          type="button"
          onClick={() => setVisible(false)}
          aria-label="Close debug panel"
          style={{
            border: "none",
            background: "transparent",
            color: "var(--a1-mute)",
            cursor: "pointer",
            fontSize: 14,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </header>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
        {(Object.keys(A1_MOTION_RANGES) as Array<keyof A1MotionParams>).map((key) => {
          const r = A1_MOTION_RANGES[key];
          const v = params[key];
          const isDefault = v === A1_MOTION_DEFAULTS[key];
          return (
            <div key={key} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <label
                  htmlFor={`a1-slider-${key}`}
                  style={{
                    color: "var(--a1-mute)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {r.label}
                </label>
                <span
                  style={{
                    color: isDefault ? "var(--a1-mute)" : "var(--a1-ink)",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {formatValue(key, v)}
                </span>
              </div>
              <input
                id={`a1-slider-${key}`}
                type="range"
                min={r.min}
                max={r.max}
                step={r.step}
                value={v}
                onChange={(e) => update(key, Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--a1-ink)" }}
              />
            </div>
          );
        })}

        <div style={{ borderTop: "1px solid var(--a1-hairline)", paddingTop: 12 }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "var(--a1-mute)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              style={{ accentColor: "var(--a1-ink)" }}
            />
            <span>Reduced motion sim</span>
          </label>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
          <button
            type="button"
            onClick={handleCopy}
            style={{
              flex: 1,
              padding: "8px 10px",
              border: "1px solid var(--a1-hairline-strong)",
              background: "transparent",
              color: "var(--a1-ink)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            {copied ? "Copied" : "Copy as code"}
          </button>
          <button
            type="button"
            onClick={reset}
            style={{
              flex: 1,
              padding: "8px 10px",
              border: "1px solid var(--a1-hairline-strong)",
              background: "transparent",
              color: "var(--a1-mute)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>

        <p
          style={{
            color: "var(--a1-mute)",
            fontSize: 10,
            lineHeight: 1.55,
            marginTop: 4,
          }}
        >
          ⌘D / Ctrl+D 토글 · 값은 localStorage 저장 · ?debug=1로 자동 노출
        </p>
      </div>
    </aside>
  );
}
