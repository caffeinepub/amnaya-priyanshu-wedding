import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Loader2,
  Mail,
  Maximize2,
  Pause,
  Phone,
  Play,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type React from "react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { SiFacebook } from "react-icons/si";
import { toast } from "sonner";
import { useAddSongRequest, useSubmitRSVP } from "./hooks/useQueries";

const queryClient = new QueryClient();

// ── SVG Decorations ────────────────────────────────────────────────────────
const BowSvg = ({
  size = 80,
  color = "#7B2D8B",
}: { size?: number; color?: string }) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size * 0.6}
    viewBox="0 0 120 72"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M60 36 C40 20 10 18 8 36 C10 54 40 52 60 36Z"
      fill={color}
      opacity="0.85"
    />
    <path
      d="M60 36 C80 20 110 18 112 36 C110 54 80 52 60 36Z"
      fill={color}
      opacity="0.85"
    />
    <ellipse cx="60" cy="36" rx="7" ry="7" fill={color} />
    <path
      d="M55 36 C56 28 60 24 63 28 C66 32 64 40 60 42 C56 40 54 40 55 36Z"
      fill="white"
      opacity="0.3"
    />
  </svg>
);

const RingsSvg = () => (
  <svg
    aria-hidden="true"
    width="70"
    height="40"
    viewBox="0 0 70 40"
    fill="none"
  >
    <circle
      cx="22"
      cy="20"
      r="16"
      stroke="#c0a060"
      strokeWidth="3.5"
      fill="none"
    />
    <circle
      cx="48"
      cy="20"
      r="16"
      stroke="#8B1A1A"
      strokeWidth="3.5"
      fill="none"
    />
  </svg>
);

const CakeSvg = () => (
  <svg
    aria-hidden="true"
    width="60"
    height="72"
    viewBox="0 0 60 72"
    fill="none"
  >
    <rect
      x="8"
      y="32"
      width="44"
      height="32"
      rx="4"
      fill="#1a0a1a"
      stroke="#7B2D8B"
      strokeWidth="2"
    />
    <rect
      x="14"
      y="20"
      width="32"
      height="16"
      rx="3"
      fill="#150515"
      stroke="#7B2D8B"
      strokeWidth="2"
    />
    <rect
      x="20"
      y="12"
      width="20"
      height="10"
      rx="2"
      fill="#1a0a1a"
      stroke="#7B2D8B"
      strokeWidth="2"
    />
    <line x1="30" y1="8" x2="30" y2="4" stroke="#8B1A1A" strokeWidth="2" />
    <path d="M28 4 Q30 1 32 4" stroke="#c0a060" strokeWidth="2" fill="none" />
    <ellipse cx="30" cy="3" rx="2" ry="3" fill="#c0a060" opacity="0.7" />
    <circle cx="18" cy="28" r="3" fill="#7B2D8B" />
    <circle cx="30" cy="28" r="3" fill="#7B2D8B" />
    <circle cx="42" cy="28" r="3" fill="#7B2D8B" />
  </svg>
);

const ChampagneSvg = () => (
  <svg
    aria-hidden="true"
    width="50"
    height="80"
    viewBox="0 0 50 80"
    fill="none"
  >
    <path
      d="M15 10 L10 40 L25 46 L40 40 L35 10Z"
      fill="#1a1a2e"
      stroke="#7B2D8B"
      strokeWidth="2"
    />
    <rect x="22" y="46" width="6" height="20" fill="#c0a060" />
    <ellipse cx="25" cy="66" rx="10" ry="4" fill="#c0a060" opacity="0.6" />
    <path
      d="M20 18 Q25 28 30 18"
      stroke="#e8e8e8"
      strokeWidth="1.5"
      fill="none"
      opacity="0.4"
    />
  </svg>
);

const FlowerSvg = () => (
  <svg
    aria-hidden="true"
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
  >
    <circle cx="25" cy="14" r="7" fill="#7B2D8B" />
    <circle cx="36" cy="22" r="7" fill="#7B2D8B" />
    <circle cx="36" cy="34" r="7" fill="#7B2D8B" />
    <circle cx="25" cy="42" r="7" fill="#7B2D8B" />
    <circle cx="14" cy="34" r="7" fill="#7B2D8B" />
    <circle cx="14" cy="22" r="7" fill="#7B2D8B" />
    <circle cx="25" cy="28" r="8" fill="#8B1A1A" />
  </svg>
);

const CandleSvg = ({ x = 0, y = 0 }: { x?: number; y?: number }) => (
  <g transform={`translate(${x},${y})`}>
    <rect
      x="8"
      y="20"
      width="14"
      height="40"
      rx="3"
      fill="#1a0a1a"
      stroke="#7B2D8B"
      strokeWidth="1.5"
    />
    <line x1="15" y1="18" x2="15" y2="12" stroke="#555" strokeWidth="1.5" />
    <ellipse cx="15" cy="11" rx="3" ry="4" fill="#c0a060" opacity="0.8" />
  </g>
);

const MusicNoteSvg = () => (
  <svg
    aria-hidden="true"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      d="M10 20 L10 8 L22 5 L22 17"
      stroke="#8B1A1A"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    <circle cx="8" cy="21" r="3" fill="#8B1A1A" />
    <circle cx="20" cy="18" r="3" fill="#8B1A1A" />
  </svg>
);

// ── Floating Heart SVG ─────────────────────────────────────────────────────
const HeartSvg = ({
  size = 18,
  color = "#8B1A1A",
}: { size?: number; color?: string }) => (
  <svg
    aria-hidden="true"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

// ── Floating hearts in hero background ───────────────────────────
const floatingElements = [
  { id: 1, left: "8%", delay: 0, duration: 5.5, size: 14, color: "#8B1A1A" },
  { id: 2, left: "22%", delay: 1.2, duration: 6.8, size: 10, color: "#7B2D8B" },
  { id: 3, left: "42%", delay: 0.5, duration: 5.0, size: 18, color: "#6a1a6a" },
  { id: 4, left: "65%", delay: 2.1, duration: 7.2, size: 12, color: "#8B1A1A" },
  { id: 5, left: "80%", delay: 0.8, duration: 6.0, size: 16, color: "#7B2D8B" },
  { id: 6, left: "92%", delay: 1.7, duration: 5.8, size: 11, color: "#6a1a6a" },
];

// ── Floating Rose Petals ─────────────────────────────────────────
const petalElements = [
  { id: 1, left: "5%", delay: 0, duration: 8.0, size: 16 },
  { id: 2, left: "18%", delay: 1.5, duration: 9.5, size: 12 },
  { id: 3, left: "35%", delay: 0.8, duration: 7.5, size: 20 },
  { id: 4, left: "52%", delay: 2.3, duration: 10.0, size: 14 },
  { id: 5, left: "68%", delay: 0.4, duration: 8.5, size: 18 },
  { id: 6, left: "82%", delay: 1.9, duration: 7.0, size: 11 },
  { id: 7, left: "93%", delay: 3.1, duration: 9.0, size: 15 },
  { id: 8, left: "44%", delay: 4.0, duration: 8.2, size: 13 },
];

function FloatingPetals() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {petalElements.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: "-30px",
            fontSize: p.size,
            animationName: "petal-fall",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationFillMode: "both",
            color: "#8B1A1A",
            filter: "drop-shadow(0 0 3px rgba(139,26,26,0.5))",
          }}
        >
          🌹
        </div>
      ))}
    </div>
  );
}

// ── Heartbeat Section Divider ────────────────────────────────────
function HeartbeatDivider() {
  return (
    <div
      className="flex items-center justify-center py-4"
      aria-hidden="true"
      style={{ background: "transparent" }}
    >
      <div
        className="h-px flex-1 max-w-32"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.35 0.1 290))",
        }}
      />
      <div className="mx-4 heartbeat">
        <HeartSvg size={22} color="#8B1A1A" />
      </div>
      <div
        className="h-px flex-1 max-w-32"
        style={{
          background:
            "linear-gradient(to left, transparent, oklch(0.35 0.1 290))",
        }}
      />
    </div>
  );
}

// ── Music Player ──────────────────────────────────────────────────────────
// Dildaara from Ra.One (YouTube)
function MusicPlayer({
  onRegisterToggle,
}: { onRegisterToggle?: (fn: () => void) => void }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.muted = false;
      setMuted(false);
      audioRef.current.play().catch(() => {});
    }
    setPlaying((p) => !p);
  };

  // Register togglePlay with parent
  // biome-ignore lint/correctness/useExhaustiveDependencies: register once
  useEffect(() => {
    onRegisterToggle?.(togglePlay);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
    }
    setMuted((m) => !m);
  };

  return (
    <div
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2"
      aria-label="Music player"
    >
      {/* Hidden audio element */}
      {/* biome-ignore lint/a11y/useMediaCaption: background music track */}
      <audio
        ref={audioRef}
        src="/assets/dildaara_stand_by_me_2011-019d1c43-f86a-706d-b7c3-16fa9b32fe39.mp3"
        loop
        preload="none"
        muted={muted}
      />

      {/* Player pill */}
      <motion.div
        className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold"
        style={{
          background: "oklch(0.1 0.04 300 / 0.92)",
          border: "1px solid oklch(0.35 0.12 300)",
          backdropFilter: "blur(10px)",
          color: "oklch(0.85 0.08 300)",
          boxShadow: "0 4px 20px oklch(0.1 0.04 300 / 0.6)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause music" : "Play music"}
          className="hover:opacity-80 transition-opacity"
        >
          {playing ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </button>

        {/* Animated bars when playing */}
        <AnimatePresence>
          {playing && (
            <motion.div
              className="flex items-end gap-0.5 h-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
            >
              {([0.4, 0.7, 1, 0.6, 0.8] as const).map((h, i) => (
                <motion.div
                  // biome-ignore lint/suspicious/noArrayIndexKey: static list
                  key={i}
                  className="w-1 rounded-sm"
                  style={{ background: "oklch(0.55 0.15 330)" }}
                  animate={{ scaleY: [h, 1, h * 0.5, 0.9, h] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 0.8 + i * 0.1,
                    ease: "easeInOut",
                  }}
                  initial={{ height: 12, originY: 1 }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <span className="hidden sm:inline max-w-[120px] truncate">
          Dildaara · Ra.One
        </span>

        {playing && (
          <button
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Unmute" : "Mute"}
            className="hover:opacity-80 transition-opacity"
          >
            {muted ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>
        )}
      </motion.div>
    </div>
  );
}

// ── Wedding Website ────────────────────────────────────────────────────────
function WeddingWebsite() {
  const rsvpRef = useRef<HTMLDivElement>(null);
  const musicToggleRef = useRef<(() => void) | null>(null);

  const scrollToRSVP = () => {
    rsvpRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <HeroSection
        onRSVP={scrollToRSVP}
        onMusicNote={() => musicToggleRef.current?.()}
      />
      <HeartbeatDivider />
      <CouplePhotoSection />
      <HeartbeatDivider />
      <OurStorySection />
      <HeartbeatDivider />
      <BasicStuffSection />
      <HeartbeatDivider />
      <ScheduleSection />
      <HeartbeatDivider />
      <FAQSection />
      <HeartbeatDivider />
      <RSVPSection ref={rsvpRef} />
      <HeartbeatDivider />
      <PhotoGallerySection />
      <HeartbeatDivider />
      <FooterSection />
      <MusicPlayer
        onRegisterToggle={(fn) => {
          musicToggleRef.current = fn;
        }}
      />
    </main>
  );
}

// ── 1. Hero ────────────────────────────────────────────────────────────────
function HeroSection({
  onRSVP,
  onMusicNote,
}: { onRSVP: () => void; onMusicNote?: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const scrolled = window.scrollY;
      setParallaxY(scrolled * 0.3);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pink relative overflow-hidden min-h-screen flex items-center justify-center"
      data-ocid="hero.section"
      style={{ backgroundPositionY: `${parallaxY}px` }}
    >
      {/* Hero background photo */}
      <img
        src="/assets/uploads/whatsapp_image_2026-03-24_at_7.53.48_am-019d1dab-3fd0-7052-8a18-d29b60706445-1.jpeg"
        alt="Amnaya and Priyanshu background"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
        style={{ opacity: 0.35, filter: "grayscale(100%) brightness(0.4)" }}
      />
      {/* Floating hearts in background */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute pointer-events-none"
          style={{ left: el.left, bottom: "10%" }}
          animate={{ y: [-10, -120], opacity: [0.7, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: el.duration,
            delay: el.delay,
            ease: "easeOut",
          }}
          aria-hidden="true"
        >
          <HeartSvg size={el.size} color={el.color} />
        </motion.div>
      ))}

      {/* Floating rose petals */}
      <FloatingPetals />

      {/* Animated corner decorations */}
      <motion.div
        className="absolute top-6 left-6 opacity-80"
        animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 3.5,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <RingsSvg />
      </motion.div>

      <motion.div
        className="absolute top-6 right-8 opacity-75"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 6, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 4,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <FlowerSvg />
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-8 opacity-75"
        animate={{ y: [0, -6, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 3,
          ease: "easeInOut",
          delay: 0.5,
        }}
        aria-hidden="true"
      >
        <CakeSvg />
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 opacity-80"
        animate={{ y: [0, -10, 0], rotate: [-4, 4, -4] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 4.5,
          ease: "easeInOut",
          delay: 1,
        }}
        aria-hidden="true"
      >
        <ChampagneSvg />
      </motion.div>

      {/* Center content with dashed frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="dashed-frame px-12 py-12 text-center max-w-xl mx-4 relative z-10"
        style={{
          background: "oklch(0.1 0.03 290 / 0.85)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Bow at top */}
        <div className="flex justify-center -mt-10 mb-2" aria-hidden="true">
          <BowSvg size={72} color="#8B1A1A" />
        </div>

        <p
          className="text-xs uppercase tracking-[0.25em] font-semibold glow-pulse"
          style={{ color: "oklch(0.65 0.1 300)" }}
        >
          Together with their families
        </p>

        <div className="relative inline-block my-4">
          <h1
            className="script-heading text-6xl md:text-7xl leading-tight relative z-10"
            style={{ color: "oklch(0.95 0 0)" }}
          >
            {"Amnaya".split("").map((letter, i) => (
              <motion.span
                key={`amnaya-letter-${i}-${letter}`}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 0.3 + i * 0.07,
                  duration: 0.45,
                  ease: "easeOut",
                }}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            ))}
            <br />
            <motion.span
              className="text-4xl"
              style={{ color: "oklch(0.65 0.12 300)", display: "inline-block" }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5, ease: "backOut" }}
            >
              &amp;
            </motion.span>
            <br />
            {"Priyanshu".split("").map((letter, i) => (
              <motion.span
                key={`priyanshu-letter-${i}-${letter}`}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 1.0 + i * 0.07,
                  duration: 0.45,
                  ease: "easeOut",
                }}
                style={{ display: "inline-block" }}
              >
                {letter}
              </motion.span>
            ))}
          </h1>
        </div>

        <div className="flex items-center justify-center gap-3 my-4">
          <div
            className="h-px w-12"
            style={{ background: "oklch(0.45 0.1 300)" }}
          />
          <button
            type="button"
            onClick={onMusicNote}
            aria-label="Play Dildaara"
            title="Play Dildaara"
            className="cursor-pointer hover:scale-125 transition-transform active:scale-95"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <MusicNoteSvg />
          </button>
          <div
            className="h-px w-12"
            style={{ background: "oklch(0.45 0.1 300)" }}
          />
        </div>

        <p
          className="text-sm font-semibold tracking-wide mb-1"
          style={{ color: "oklch(0.7 0.08 300)" }}
        >
          JOIN US ON
        </p>
        <p
          className="script-heading text-2xl mb-1"
          style={{ color: "oklch(0.85 0.1 300)" }}
        >
          August 9, 2033
        </p>
        <p className="text-sm" style={{ color: "oklch(0.65 0.05 300)" }}>
          5:00 PM · Our Home
        </p>

        <button
          type="button"
          onClick={onRSVP}
          data-ocid="hero.primary_button"
          className="mt-6 px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
          style={{
            background: "oklch(0.35 0.15 330)",
            color: "white",
            boxShadow: "0 4px 18px oklch(0.35 0.15 330 / 0.4)",
          }}
        >
          RSVP Now
        </button>
      </motion.div>

      {/* Couple doodle */}
      <div
        className="absolute bottom-0 right-1/4 opacity-20 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <img
          src="/assets/generated/wedding-couple-doodle-transparent.dim_200x200.png"
          alt=""
          className="w-40 h-40 object-contain"
        />
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
        aria-hidden="true"
      >
        <ChevronDown
          className="w-6 h-6"
          style={{ color: "oklch(0.5 0.08 300)" }}
        />
      </motion.div>
    </section>
  );
}

// ── 2. Couple Photo ────────────────────────────────────────────────────────
function CouplePhotoSection() {
  return (
    <motion.section
      className="relative w-full overflow-hidden"
      style={{ height: "480px" }}
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="absolute inset-0 overflow-hidden photo-zoom-wrap">
        <img
          src="/assets/uploads/whatsapp_image_2026-03-24_at_7.53.48_am-019d1dab-3fd0-7052-8a18-d29b60706445-1.jpeg"
          alt="Amnaya and Priyanshu"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ filter: "grayscale(1) brightness(0.65) contrast(1.3)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "oklch(0.05 0.02 300 / 0.4)" }}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.p
          className="script-heading text-5xl text-white drop-shadow-xl"
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.9)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Amnaya &amp; Priyanshu
        </motion.p>
      </div>
    </motion.section>
  );
}

// ── 3. Our Story ──────────────────────────────────────────────────────────
function OurStorySection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="section-coral py-20 px-6"
      style={{ color: "oklch(0.88 0 0)" }}
      data-ocid="story.section"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            className="uppercase tracking-[0.2em] text-xs font-bold mb-2"
            style={{ color: "oklch(0.6 0.1 300)" }}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Our journey
          </motion.p>
          <motion.h2
            className="script-heading text-5xl md:text-6xl"
            style={{ color: "oklch(0.92 0 0)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The A to P&apos;s of Amnaya &amp; Priyanshu
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left: main story */}
          <motion.div
            className="md:col-span-1"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p
              className="leading-relaxed text-lg italic"
              style={{
                background:
                  "linear-gradient(90deg, #ff0000, #ff7700, #ffff00, #00cc00, #0000ff, #8b00ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              &ldquo;I still remember the first time I saw you in college, Musa.
              It didn&apos;t feel like just another normal day. There was
              something different about that moment. The first time we talked,
              it felt so easy, like I had known you for much longer. And
              honestly, from that very first meeting, something just clicked. It
              felt like love at first sight, or maybe love at first
              conversation. I didn&apos;t know then where it would lead, but I
              knew you were someone special and I&apos;m really glad I followed
              that feeling.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3" aria-hidden="true">
              <BowSvg size={48} color="#7B2D8B" />
            </div>
          </motion.div>

          {/* Right: sub stories */}
          <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
            <motion.div
              className="rounded-2xl p-6"
              style={{
                background: "oklch(0.15 0.04 280 / 0.8)",
                border: "1px solid oklch(0.28 0.08 290)",
              }}
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <h3
                className="script-heading text-2xl mb-3"
                style={{ color: "oklch(0.85 0.08 300)" }}
              >
                How Did We Meet, Anyway?
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.75 0 0)" }}
              >
                They met in college, a moment that didn&apos;t feel like just
                another ordinary day. The first conversation flowed so
                naturally, as if they had always known each other. Something
                clicked right from the start.
              </p>
            </motion.div>
            <motion.div
              className="rounded-2xl p-6"
              style={{
                background: "oklch(0.15 0.04 280 / 0.8)",
                border: "1px solid oklch(0.28 0.08 290)",
              }}
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            >
              <h3
                className="script-heading text-2xl mb-3"
                style={{ color: "oklch(0.85 0.08 300)" }}
              >
                How the Question Was Popped?
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.75 0 0)" }}
              >
                I still remember that day on the bike. The wind was in our hair,
                the world felt endless, and my heart was racing. I looked at
                you, took a deep breath, and asked you to be mine. When you said
                yes, everything felt perfect. That moment was ours and ours
                alone.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

// ── 4. Basic Stuff ────────────────────────────────────────────────────────
function BasicStuffSection() {
  return (
    <section className="section-white py-20 px-6" data-ocid="basic.section">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            className="uppercase tracking-[0.2em] text-xs font-bold mb-2"
            style={{ color: "oklch(0.6 0.12 300)" }}
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Good to know
          </motion.p>
          <motion.h2
            className="script-heading text-5xl"
            style={{ color: "oklch(0.9 0 0)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            The Basic Stuff
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[0, 1, 2].map((idx) => (
            <motion.div
              key={idx}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
            >
              {idx === 0 && (
                <BasicCard title="Dress Code" icon="👗">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.72 0 0)" }}
                  >
                    Think dark tones, bold style, and a touch of mystery and a
                    little dramatic. We want you to look and feel amazing.
                    Semiformal to formal is the vibe.
                  </p>
                </BasicCard>
              )}
              {idx === 1 && (
                <BasicCard title="Gift Registry" icon="🎁">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.72 0 0)" }}
                  >
                    Your presence is truly the greatest gift we could ask for.
                    No need at all. Just bring your dancing shoes and your best
                    smile!
                  </p>
                </BasicCard>
              )}
              {idx === 2 && <SongRequestCard />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BasicCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="dashed-frame p-6 text-center relative"
      style={{ background: "oklch(0.12 0.03 280)" }}
    >
      <div className="flex justify-center -mt-10 mb-3" aria-hidden="true">
        <BowSvg size={60} color="#8B1A1A" />
      </div>
      <div className="text-3xl mb-3" aria-hidden="true">
        {icon}
      </div>
      <h3
        className="script-heading text-2xl mb-3"
        style={{ color: "oklch(0.85 0.08 300)" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function SongRequestCard() {
  const [songTitle, setSongTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [yourName, setYourName] = useState("");
  const { mutate, isPending } = useAddSongRequest();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!songTitle.trim() || !artist.trim() || !yourName.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    mutate(
      { title: songTitle, artist, name: yourName },
      {
        onSuccess: () => {
          toast.success("Song request added! 🎵");
          setSongTitle("");
          setArtist("");
          setYourName("");
        },
        onError: () => toast.error("Failed to submit. Try again!"),
      },
    );
  };

  return (
    <div
      className="dashed-frame p-6 relative"
      style={{ background: "oklch(0.12 0.03 280)" }}
      data-ocid="song.card"
    >
      <div className="flex justify-center -mt-10 mb-3" aria-hidden="true">
        <BowSvg size={60} color="#8B1A1A" />
      </div>
      <div className="text-3xl mb-2 text-center" aria-hidden="true">
        🎵
      </div>
      <h3
        className="script-heading text-2xl mb-4 text-center"
        style={{ color: "oklch(0.85 0.08 300)" }}
      >
        Song Requests
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          id="song-title"
          value={songTitle}
          onChange={(e) => setSongTitle(e.target.value)}
          placeholder="Song title..."
          aria-label="Song title"
          data-ocid="song.input"
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
          style={{
            borderColor: "oklch(0.3 0.08 290)",
            background: "oklch(0.08 0.02 280)",
            color: "oklch(0.9 0 0)",
          }}
        />
        <input
          id="song-artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Artist..."
          aria-label="Artist name"
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
          style={{
            borderColor: "oklch(0.3 0.08 290)",
            background: "oklch(0.08 0.02 280)",
            color: "oklch(0.9 0 0)",
          }}
        />
        <input
          id="song-requester"
          value={yourName}
          onChange={(e) => setYourName(e.target.value)}
          placeholder="Your name..."
          aria-label="Your name"
          className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2"
          style={{
            borderColor: "oklch(0.3 0.08 290)",
            background: "oklch(0.08 0.02 280)",
            color: "oklch(0.9 0 0)",
          }}
        />
        <button
          type="submit"
          disabled={isPending}
          data-ocid="song.submit_button"
          className="w-full py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: "oklch(0.35 0.15 330)", color: "white" }}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Sending...
            </span>
          ) : (
            "Add Request 🎶"
          )}
        </button>
      </form>
    </div>
  );
}

// ── 5. Schedule ───────────────────────────────────────────────────────────
const scheduleItems = [
  { time: "05:00 PM", event: "Wedding Ceremony", note: "Exchange of vows" },
  { time: "07:00 PM", event: "Reception", note: "Dinner & dancing" },
  { time: "10:00 PM", event: "Party", note: "Late night celebration" },
  { time: "11:30 PM", event: "Fireworks", note: "Grand finale!" },
];

function ScheduleSection() {
  return (
    <section className="section-blue py-20 px-6" data-ocid="schedule.section">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            className="uppercase tracking-[0.2em] text-xs font-bold mb-2"
            style={{ color: "oklch(0.6 0.1 290)" }}
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Mark your calendars
          </motion.p>
          <motion.h2
            className="script-heading text-5xl"
            style={{ color: "oklch(0.92 0 0)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What&apos;s Going Down
          </motion.h2>
          <p
            className="mt-2 font-bold uppercase tracking-widest text-sm"
            style={{ color: "oklch(0.7 0.08 290)" }}
          >
            AUGUST 9, 2033
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: illustration */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <svg
              aria-hidden="true"
              width="200"
              height="250"
              viewBox="0 0 200 250"
              fill="none"
            >
              <CandleSvg x={20} y={60} />
              <CandleSvg x={80} y={40} />
              <CandleSvg x={140} y={70} />
              <rect
                x="10"
                y="160"
                width="180"
                height="10"
                rx="5"
                fill="#c0a060"
              />
              <rect x="30" y="170" width="10" height="60" fill="#c0a060" />
              <rect x="160" y="170" width="10" height="60" fill="#c0a060" />
              <circle
                cx="50"
                cy="155"
                r="12"
                fill="#1a0a1a"
                stroke="#7B2D8B"
                strokeWidth="1.5"
              />
              <circle
                cx="100"
                cy="150"
                r="14"
                fill="#1a0a1a"
                stroke="#7B2D8B"
                strokeWidth="1.5"
              />
              <circle
                cx="150"
                cy="155"
                r="12"
                fill="#1a0a1a"
                stroke="#7B2D8B"
                strokeWidth="1.5"
              />
              <circle cx="50" cy="155" r="5" fill="#8B1A1A" />
              <circle cx="100" cy="150" r="6" fill="#8B1A1A" />
              <circle cx="150" cy="155" r="5" fill="#8B1A1A" />
            </svg>
          </motion.div>

          {/* Right: schedule rows */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "oklch(0.13 0.03 280 / 0.9)",
              border: "1px solid oklch(0.28 0.08 290)",
            }}
          >
            {scheduleItems.map((item, idx) => (
              <motion.div
                key={item.time}
                className="schedule-row px-6 shimmer-card"
                data-ocid={`schedule.item.${idx + 1}`}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.12,
                  ease: "easeOut",
                }}
              >
                <span
                  className="font-bold text-sm"
                  style={{ color: "oklch(0.65 0.12 300)" }}
                >
                  {item.time}
                </span>
                <div>
                  <p
                    className="font-semibold"
                    style={{ color: "oklch(0.9 0 0)" }}
                  >
                    {item.event}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: "oklch(0.65 0.04 280)" }}
                  >
                    {item.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 6. FAQ ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "How should I RSVP?",
    a: "Scroll down to the RSVP section, enter your name, and let us know if you can make it!",
  },
  {
    q: "Can I bring a plus one?",
    a: "We've carefully planned our guest list. Please check your invitation to see if a plus one was included.",
  },
  {
    q: "Is the venue wheelchair accessible?",
    a: "Absolutely! Our venue is fully wheelchair accessible. Please let us know if you need any special arrangements.",
  },
];

function FAQSection() {
  return (
    <section
      className="section-coral py-20 px-6"
      style={{ color: "oklch(0.88 0 0)" }}
      data-ocid="faq.section"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            className="uppercase tracking-[0.2em] text-xs font-bold mb-2"
            style={{ color: "oklch(0.6 0.1 300)" }}
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Questions?
          </motion.p>
          <motion.h2
            className="script-heading text-5xl"
            style={{ color: "oklch(0.92 0 0)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We&apos;ve all the answers
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left: circular photo */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div
              className="rounded-full overflow-hidden"
              style={{
                width: 240,
                height: 240,
                border: "4px solid oklch(0.35 0.12 300)",
              }}
            >
              <img
                src="/assets/uploads/whatsapp_image_2026-03-24_at_8.27.19_am-019d1dc9-d38d-7786-aff5-6b8e919b256c-1.jpeg"
                alt="Amnaya and Priyanshu"
                className="w-full h-full object-cover"
                style={{
                  filter: "grayscale(1) brightness(0.65) contrast(1.3)",
                }}
              />
            </div>
          </motion.div>

          {/* Right: Q&A */}
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div
                key={faq.q}
                className="rounded-2xl p-5"
                style={{
                  background: "oklch(0.15 0.04 280 / 0.8)",
                  border: "1px solid oklch(0.28 0.08 290)",
                }}
                data-ocid={`faq.item.${idx + 1}`}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.15,
                  ease: "easeOut",
                }}
              >
                <p
                  className="font-bold mb-1"
                  style={{ color: "oklch(0.9 0 0)" }}
                >
                  {faq.q}
                </p>
                <p className="text-sm" style={{ color: "oklch(0.72 0 0)" }}>
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 7. RSVP ───────────────────────────────────────────────────────────────
const RSVPSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [name, setName] = useState("");
  const [inviteCode] = useState("MUSA");
  const [attending, setAttending] = useState<boolean | null>(null);
  const { mutate, isPending, isSuccess } = useSubmitRSVP();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !inviteCode.trim() || attending === null) {
      toast.error("Please fill in all fields");
      return;
    }
    mutate(
      { name, attending, inviteCode },
      {
        onSuccess: () => toast.success("RSVP submitted! See you soon 🎉"),
        onError: () => toast.error("Invalid invite code or submission failed"),
      },
    );
  };

  return (
    <section
      ref={ref}
      className="section-pink py-20 px-6"
      data-ocid="rsvp.section"
    >
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10">
          <motion.div
            className="flex justify-center mb-2"
            aria-hidden="true"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 12,
              delay: 0.2,
            }}
          >
            <motion.div
              animate={{ rotate: [-4, 4, -4, 4, 0] }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 4,
              }}
            >
              <BowSvg size={64} color="#8B1A1A" />
            </motion.div>
          </motion.div>
          <motion.h2
            className="script-heading text-5xl"
            style={{ color: "oklch(0.92 0 0)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            RSVP
          </motion.h2>
          <motion.p
            className="mt-2 text-sm"
            style={{ color: "oklch(0.65 0.06 290)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Let us know if you&apos;ll be joining us!
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="dashed-frame p-8 text-center"
              style={{ background: "oklch(0.12 0.03 280)" }}
              data-ocid="rsvp.success_state"
            >
              <div className="text-5xl mb-4" aria-hidden="true">
                🎊
              </div>
              <h3
                className="script-heading text-3xl mb-2"
                style={{ color: "oklch(0.9 0 0)" }}
              >
                You&apos;re on the list!
              </h3>
              <p className="text-sm" style={{ color: "oklch(0.65 0.05 280)" }}>
                Thanks {name}! We can&apos;t wait to celebrate with you.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="dashed-frame p-8 space-y-5"
              style={{ background: "oklch(0.12 0.03 280)" }}
              data-ocid="rsvp.modal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div>
                <label
                  htmlFor="rsvp-name"
                  className="block text-xs font-semibold uppercase tracking-wider mb-1"
                  style={{ color: "oklch(0.65 0.08 290)" }}
                >
                  Your Name
                </label>
                <input
                  id="rsvp-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full name"
                  data-ocid="rsvp.input"
                  className="w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2"
                  style={{
                    borderColor: "oklch(0.3 0.08 290)",
                    background: "oklch(0.08 0.02 280)",
                    color: "oklch(0.9 0 0)",
                  }}
                />
              </div>

              <div>
                <p
                  className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: "oklch(0.65 0.08 290)" }}
                >
                  Will you attend?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending(true)}
                    data-ocid="rsvp.toggle"
                    className="py-2.5 rounded-lg border-2 font-semibold text-sm transition-all"
                    style={{
                      borderColor:
                        attending === true
                          ? "oklch(0.5 0.15 330)"
                          : "oklch(0.3 0.08 290)",
                      background:
                        attending === true
                          ? "oklch(0.35 0.15 330)"
                          : "transparent",
                      color:
                        attending === true ? "white" : "oklch(0.65 0.08 290)",
                    }}
                  >
                    Joyfully Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => setAttending(false)}
                    data-ocid="rsvp.toggle"
                    className="py-2.5 rounded-lg border-2 font-semibold text-sm transition-all"
                    style={{
                      borderColor:
                        attending === false
                          ? "oklch(0.4 0.12 25)"
                          : "oklch(0.3 0.08 290)",
                      background:
                        attending === false
                          ? "oklch(0.3 0.12 25)"
                          : "transparent",
                      color:
                        attending === false ? "white" : "oklch(0.65 0.08 290)",
                    }}
                  >
                    Regretfully Decline
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                data-ocid="rsvp.submit_button"
                className="w-full py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: "oklch(0.35 0.15 330)", color: "white" }}
              >
                {isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                  </span>
                ) : (
                  "Send RSVP 💌"
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

RSVPSection.displayName = "RSVPSection";

// ── 8. Photo Gallery ─────────────────────────────────────────────────────
const galleryPhotos = [
  {
    src: "/assets/uploads/whatsapp_image_2026-03-24_at_8.57.05_am-019d1de2-2608-7483-b4ab-5ac7d41e38c0-1.jpeg",
    caption: "Under the Stars",
  },
  {
    src: "/assets/uploads/whatsapp_image_2026-03-24_at_8.27.19_am-019d1dc9-d38d-7786-aff5-6b8e919b256c-1.jpeg",
    caption: "Together Forever",
  },
  {
    src: "/assets/uploads/whatsapp_image_2026-03-23_at_10.14.21_pm-019d1c2f-4968-76de-ab6a-6b6a418002f9-1.jpeg",
    caption: "Our Story Begins",
  },
];

function PhotoGallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const goPrevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlide(
      (i) => (i - 1 + galleryPhotos.length) % galleryPhotos.length,
    );
  };
  const goNextSlide = () => {
    setSlideDirection(1);
    setCurrentSlide((i) => (i + 1) % galleryPhotos.length);
  };
  const goPrev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + galleryPhotos.length) % galleryPhotos.length : 0,
    );
  const goNext = () =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % galleryPhotos.length : 0));

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft")
        setLightboxIndex((i) =>
          i !== null
            ? (i - 1 + galleryPhotos.length) % galleryPhotos.length
            : 0,
        );
      if (e.key === "ArrowRight")
        setLightboxIndex((i) =>
          i !== null ? (i + 1) % galleryPhotos.length : 0,
        );
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex]);

  return (
    <>
      <section
        className="py-24 px-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.06 0.025 300) 0%, oklch(0.09 0.035 270) 50%, oklch(0.06 0.025 300) 100%)",
        }}
        data-ocid="gallery.section"
      >
        {/* Decorative ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, oklch(0.55 0.22 25 / 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.5 0.25 310 / 0.08) 0%, transparent 50%)",
          }}
        />

        <div className="max-w-6xl mx-auto relative">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            {/* Top ornament */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <div
                className="h-px flex-1 max-w-32"
                style={{
                  background:
                    "linear-gradient(to right, transparent, oklch(0.55 0.22 25))",
                }}
              />
              <span
                className="text-2xl"
                style={{ color: "oklch(0.55 0.22 25)" }}
              >
                ✦
              </span>
              <span
                className="text-3xl"
                style={{ color: "oklch(0.6 0.25 310)" }}
              >
                ❧
              </span>
              <span
                className="text-2xl"
                style={{ color: "oklch(0.55 0.22 25)" }}
              >
                ✦
              </span>
              <div
                className="h-px flex-1 max-w-32"
                style={{
                  background:
                    "linear-gradient(to left, transparent, oklch(0.55 0.22 25))",
                }}
              />
            </div>

            <h2 className="script-heading text-6xl md:text-7xl rainbow-text mb-4">
              Our Moments
            </h2>

            <p
              className="text-lg tracking-widest uppercase"
              style={{
                fontFamily: "Georgia, serif",
                color: "oklch(0.65 0.08 300)",
                letterSpacing: "0.25em",
              }}
            >
              Cherished memories, frozen in time
            </p>

            {/* Bottom ornament */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div
                className="h-px flex-1 max-w-32"
                style={{
                  background:
                    "linear-gradient(to right, transparent, oklch(0.6 0.25 310))",
                }}
              />
              <span style={{ color: "oklch(0.6 0.25 310)" }}>◆</span>
              <span style={{ color: "oklch(0.55 0.22 25)" }}>♥</span>
              <span style={{ color: "oklch(0.6 0.25 310)" }}>◆</span>
              <div
                className="h-px flex-1 max-w-32"
                style={{
                  background:
                    "linear-gradient(to left, transparent, oklch(0.6 0.25 310))",
                }}
              />
            </div>
          </motion.div>

          {/* Slideshow Carousel */}
          <div className="max-w-3xl mx-auto relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlide}
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  borderRadius: "2px",
                  border: "1px solid oklch(0.55 0.22 25 / 0.3)",
                  height: "500px",
                }}
                initial={{ x: slideDirection > 0 ? 300 : -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: slideDirection > 0 ? -300 : 300, opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                onClick={() => openLightbox(currentSlide)}
                data-ocid="gallery.canvas_target"
              >
                <img
                  src={galleryPhotos[currentSlide].src}
                  alt={`Amnaya and Priyanshu moment ${currentSlide + 1}`}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105"
                  style={{
                    filter: "grayscale(1) brightness(0.65) contrast(1.35)",
                  }}
                />
                <img
                  src={galleryPhotos[currentSlide].src}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:scale-105"
                  style={{
                    filter: "brightness(0.75) contrast(1.1) saturate(1.2)",
                  }}
                />
                <div
                  className="absolute inset-0 transition-all duration-500 opacity-0 group-hover:opacity-100"
                  style={{
                    boxShadow:
                      "inset 0 0 0 2px oklch(0.55 0.22 25), inset 0 0 40px oklch(0.55 0.22 25 / 0.25)",
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.04 0.01 290 / 0.95) 0%, transparent 100%)",
                    padding: "60px 24px 24px",
                  }}
                >
                  <p
                    className="text-center text-xl"
                    style={{
                      fontFamily: "Parisienne, cursive",
                      color: "oklch(0.85 0.08 30)",
                    }}
                  >
                    {galleryPhotos[currentSlide].caption}
                  </p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="w-8 h-8 flex items-center justify-center rounded-full"
                    style={{ background: "oklch(0.55 0.22 25 / 0.8)" }}
                  >
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={goPrevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full text-white transition-all hover:opacity-80 hover:scale-110"
              style={{ background: "oklch(0.55 0.22 25)" }}
              data-ocid="gallery.pagination_prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={goNextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center rounded-full text-white transition-all hover:opacity-80 hover:scale-110"
              style={{ background: "oklch(0.55 0.22 25)" }}
              data-ocid="gallery.pagination_next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-3 mt-6">
              {galleryPhotos.map((photo, idx) => (
                <button
                  key={photo.src}
                  type="button"
                  onClick={() => {
                    setSlideDirection(idx > currentSlide ? 1 : -1);
                    setCurrentSlide(idx);
                  }}
                  className="w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-125"
                  style={{
                    background:
                      idx === currentSlide
                        ? "oklch(0.55 0.22 25)"
                        : "oklch(0.3 0.04 290)",
                  }}
                  aria-label={`Go to photo ${idx + 1}`}
                  data-ocid={`gallery.item.${idx + 1}`}
                />
              ))}
            </div>

            <motion.div
              className="flex items-center justify-center gap-3 mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div
                className="h-px w-24"
                style={{
                  background:
                    "linear-gradient(to right, transparent, oklch(0.55 0.22 25 / 0.6))",
                }}
              />
              <span
                style={{ color: "oklch(0.55 0.22 25 / 0.7)", fontSize: "10px" }}
              >
                ◆
              </span>
              <span
                className="text-sm tracking-[0.3em] uppercase"
                style={{ color: "oklch(0.5 0.08 300)" }}
              >
                MUSAA
              </span>
              <span
                style={{ color: "oklch(0.55 0.22 25 / 0.7)", fontSize: "10px" }}
              >
                ◆
              </span>
              <div
                className="h-px w-24"
                style={{
                  background:
                    "linear-gradient(to left, transparent, oklch(0.55 0.22 25 / 0.6))",
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "oklch(0.03 0.01 290 / 0.97)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={closeLightbox}
            data-ocid="gallery.modal"
          >
            <motion.div
              className="relative max-w-4xl w-full mx-4"
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIndex}
                  src={galleryPhotos[lightboxIndex].src}
                  alt={`Amnaya and Priyanshu moment ${lightboxIndex + 1}`}
                  className="w-full h-auto max-h-[78vh] object-contain rounded-sm"
                  style={{
                    boxShadow:
                      "0 0 80px oklch(0.55 0.22 25 / 0.35), 0 0 120px oklch(0.6 0.25 310 / 0.2)",
                    border: "1px solid oklch(0.55 0.22 25 / 0.3)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </AnimatePresence>

              {/* Counter */}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm tracking-widest whitespace-nowrap"
                style={{
                  color: "oklch(0.6 0.08 300)",
                  fontFamily: "Georgia, serif",
                }}
              >
                {lightboxIndex + 1} / {galleryPhotos.length}
              </div>

              {/* Caption */}
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-full">
                <p
                  style={{
                    fontFamily: "Parisienne, cursive",
                    color: "oklch(0.75 0.12 30)",
                    fontSize: "1.25rem",
                  }}
                >
                  {galleryPhotos[lightboxIndex].caption}
                </p>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute -top-4 -right-4 w-9 h-9 flex items-center justify-center rounded-full text-white transition-opacity hover:opacity-70"
                style={{ background: "oklch(0.55 0.22 25)" }}
                data-ocid="gallery.close_button"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Prev */}
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full text-white transition-all hover:opacity-80 hover:scale-110"
                style={{
                  background: "oklch(0.12 0.04 290 / 0.9)",
                  border: "1px solid oklch(0.55 0.22 25 / 0.4)",
                }}
                data-ocid="gallery.pagination_prev"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full text-white transition-all hover:opacity-80 hover:scale-110"
                style={{
                  background: "oklch(0.12 0.04 290 / 0.9)",
                  border: "1px solid oklch(0.55 0.22 25 / 0.4)",
                }}
                data-ocid="gallery.pagination_next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── 9. Footer ─────────────────────────────────────────────────────────────
function FooterSection() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      style={{ background: "#000000" }}
      className="py-16 px-6 text-center"
      data-ocid="footer.section"
    >
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex justify-center mb-4" aria-hidden="true">
          <BowSvg size={80} color="#8B1A1A" />
        </div>

        <h3
          className="script-heading text-3xl mb-2"
          style={{ color: "oklch(0.9 0 0)" }}
        >
          Amnaya &amp; Priyanshu
        </h3>
        <p
          className="font-bold uppercase tracking-[0.2em] text-sm mb-8"
          style={{ color: "oklch(0.55 0.08 290)" }}
        >
          MORE QUESTIONS? ASK AWAY!
        </p>

        <div
          className="flex flex-wrap items-center justify-center gap-6 mb-8 text-sm"
          style={{ color: "oklch(0.6 0.06 280)" }}
        >
          <a
            href="tel:+11234567890"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            data-ocid="footer.link"
          >
            <Phone className="w-4 h-4" />
            (123) 456-7890
          </a>
          <a
            href="mailto:hello@reallygranite.com"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            data-ocid="footer.link"
          >
            <Mail className="w-4 h-4" />
            hello@reallygranite.com
          </a>
          <a
            href="https://instagram.com"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            data-ocid="footer.link"
          >
            <Instagram className="w-4 h-4" />
            @amnaya.priyanshu
          </a>
          <a
            href="https://facebook.com"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            data-ocid="footer.link"
          >
            <SiFacebook className="w-4 h-4" />
            AmPriWedding
          </a>
        </div>

        <div
          className="h-px my-6 mx-auto max-w-xs"
          style={{ background: "oklch(0.3 0.08 290)" }}
        />

        <p className="text-xs" style={{ color: "oklch(0.45 0.04 280)" }}>
          © {year}. Built with love using{" "}
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-70"
          >
            caffeine.ai
          </a>
        </p>
      </motion.div>
    </footer>
  );
}

// ── App Root ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeddingWebsite />

      <Toaster />
    </QueryClientProvider>
  );
}
