"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1.4,
  cooldownTime = 2.5,
  className,
  textClassName,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const idRef = React.useRef(`gooey-${Math.random().toString(36).slice(2)}`);

  React.useEffect(() => {
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let raf: number;

    const el1 = text1Ref.current;
    const el2 = text2Ref.current;
    if (!el1 || !el2) return;

    el1.textContent = texts[textIndex % texts.length];
    el2.textContent = texts[(textIndex + 1) % texts.length];

    const setMorph = (fraction: number) => {
      el2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      el2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      fraction = 1 - fraction;
      el1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      el1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    };

    const doCooldown = () => {
      morph = 0;
      el2.style.filter = "";
      el2.style.opacity = "100%";
      el1.style.filter = "";
      el1.style.opacity = "0%";
    };

    function animate() {
      raf = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          el1.textContent = texts[textIndex % texts.length];
          el2.textContent = texts[(textIndex + 1) % texts.length];
        }
        morph -= cooldown;
        cooldown = 0;
        let fraction = morph / morphTime;
        if (fraction > 1) {
          cooldown = cooldownTime;
          fraction = 1;
        }
        setMorph(fraction);
      } else {
        doCooldown();
      }
    }

    animate();
    return () => cancelAnimationFrame(raf);
  }, [texts, morphTime, cooldownTime]);

  const filterId = idRef.current;

  return (
    <div className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="relative"
        style={{ filter: `url(#${filterId})` }}
      >
        <span
          ref={text1Ref}
          className={cn("absolute top-0 left-0 inline-block select-none", textClassName)}
        />
        <span
          ref={text2Ref}
          className={cn("absolute top-0 left-0 inline-block select-none", textClassName)}
        />
        {/* Invisible spacer to give the container correct dimensions */}
        <span
          className={cn("invisible inline-block select-none", textClassName)}
          aria-hidden="true"
        >
          {texts.reduce((a, b) => (a.length >= b.length ? a : b))}
        </span>
      </div>
    </div>
  );
}
