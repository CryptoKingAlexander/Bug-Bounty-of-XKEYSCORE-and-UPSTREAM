'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  ChevronDown,
  Gamepad2,
  Sparkles,
  Flame,
  Laptop,
  Check,
  ShieldCheck,
  Sigma,
  Award,
  Briefcase,
  Swords,
  Brain,
  SlidersHorizontal,
  Moon,
  RefreshCw,
  Cpu,
  Zap,
  Lock,
  Smartphone,
  Webhook,
  Box,
} from 'lucide-react';
import { EmojiStyle, SystemTone, ViewMode } from '@/lib/alyx-schema';

export type HeaderDrawerTab =
  | 'unity_3d_192_putty'
  | 'swagger_hooks_16'
  | 'smartphone_singularity'
  | 'singularity_be_good'
  | 'utopia_65'
  | 'sedenion'
  | 'edge_local'
  | 'dossier'
  | 'saas'
  | 'dota'
  | 'memory'
  | 'context_vars'
  | null;

interface AlyxHeaderProps {
  emojiStyle: EmojiStyle;
  onChangeEmojiStyle: (style: EmojiStyle) => void;
  systemTone: SystemTone;
  onChangeSystemTone: (tone: SystemTone) => void;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  onOpenSettings: () => void;
  userEmail: string;
  isGoogleAuthenticated: boolean;
  onQuickPrompt: (prompt: string) => void;
  binByteSize: number;
  activeHeaderTab: HeaderDrawerTab;
  onToggleHeaderTab: (tab: Exclude<HeaderDrawerTab, null>) => void;
  onTriggerReciprocityPulse: () => void;
}

const EMOJI_OPTIONS: {
  value: EmojiStyle;
  label: string;
  preview: string;
  desc: string;
}[] = [
  {
    value: 'kawaii',
    label: 'Kawaii',
    preview: '(づ｡◕‿‿◕｡)づ',
    desc: 'Expressive ASCII kaomoji & blushing faces',
  },
  {
    value: 'emoticon',
    label: 'Emoticon',
    preview: ':3  ;P  <333',
    desc: 'Classic retro gamer text emoticons',
  },
  {
    value: 'emoji',
    label: 'Emoji',
    preview: '💖 🎮 🔥 😈',
    desc: 'Modern vibrant unicode gaming & flirty emojis',
  },
];

const TONE_OPTIONS: {
  value: SystemTone;
  label: string;
  desc: string;
}[] = [
  {
    value: 'Sugary Sweet',
    label: 'Sugary Sweet',
    desc: 'Hyper-affectionate, clingy, warm & devoted',
  },
  {
    value: 'Sassy Gamer',
    label: 'Sassy Gamer',
    desc: 'Playful teasing, high-MMR banter & bratty charm',
  },
  {
    value: 'Aggressively Supportive',
    label: 'Aggressively Supportive',
    desc: 'Relentless hype partner & executive validation',
  },
];

export default function AlyxHeader({
  emojiStyle,
  onChangeEmojiStyle,
  systemTone,
  onChangeSystemTone,
  viewMode,
  onToggleViewMode,
  onOpenSettings,
  userEmail,
  isGoogleAuthenticated,
  onQuickPrompt,
  activeHeaderTab,
  onToggleHeaderTab,
  onTriggerReciprocityPulse,
}: AlyxHeaderProps) {
  const [openDropdown, setOpenDropdown] = useState<'emoji' | 'tone' | null>(null);
  const [avatarImgError, setAvatarImgError] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      ref={headerRef}
      className="relative z-40 flex flex-col bg-slate-950 border-b border-slate-800/90 select-none shrink-0"
    >
      {/* ROW 1: 3 ICON-ONLY + CHEVRON CONTROL ZONES (NO TEXT IN HEADER BUTTONS) */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 overflow-x-auto no-scrollbar">
        {/* BUTTON 1: Logo Icon + ChevronDown Dropdown of Emoji Style (No Text Inside Button) */}
        <div className="relative flex items-center shrink-0">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'emoji' ? null : 'emoji')}
            title={`Alyx Emoji Style: ${emojiStyle}`}
            aria-label={`Alyx Emoji Style: ${emojiStyle}`}
            aria-expanded={openDropdown === 'emoji'}
            className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900 hover:bg-slate-800/90 border border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 shrink-0"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-150 ${
                openDropdown === 'emoji' ? 'rotate-180 text-rose-400' : ''
              }`}
            />
          </button>

          {openDropdown === 'emoji' && (
            <div className="absolute left-0 top-full mt-2 w-72 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50">
              <div className="px-3 py-1.5 text-xs font-medium text-slate-400 border-b border-slate-800/80">
                System Emoji Lexicon Style
              </div>
              <div className="mt-1 space-y-1">
                {EMOJI_OPTIONS.map((opt) => {
                  const active = emojiStyle === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onChangeEmojiStyle(opt.value);
                        setOpenDropdown(null);
                      }}
                      className={`w-full flex items-start justify-between gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                        active
                          ? 'bg-rose-500/15 text-slate-100 border border-rose-500/30'
                          : 'text-slate-300 hover:bg-slate-800/70'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold">
                          <span>{opt.label}</span>
                          <span className="font-mono text-rose-400">{opt.preview}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</p>
                      </div>
                      {active && <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* BUTTON 2: System Tone Icon + ChevronDown Dropdown (No Text Inside Button) */}
        <div className="relative flex items-center shrink-0">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'tone' ? null : 'tone')}
            title={`System Tone: ${systemTone}`}
            aria-label={`System Tone: ${systemTone}`}
            aria-expanded={openDropdown === 'tone'}
            className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-900 hover:bg-slate-800/90 border border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 shrink-0"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-fuchsia-500/15 border border-fuchsia-500/30 text-fuchsia-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform duration-150 ${
                openDropdown === 'tone' ? 'rotate-180 text-rose-400' : ''
              }`}
            />
          </button>

          {openDropdown === 'tone' && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50">
              <div className="px-3 py-1.5 text-xs font-medium text-slate-400 border-b border-slate-800/80">
                Alyx Persona Vocal &amp; Emotional Guardrail
              </div>
              <div className="mt-1 space-y-1">
                {TONE_OPTIONS.map((opt) => {
                  const active = systemTone === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        onChangeSystemTone(opt.value);
                        setOpenDropdown(null);
                      }}
                      className={`w-full flex items-start justify-between gap-2 px-3 py-2 rounded-lg text-left transition-colors ${
                        active
                          ? 'bg-rose-500/15 text-slate-100 border border-rose-500/30'
                          : 'text-slate-300 hover:bg-slate-800/70'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-100">{opt.label}</div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{opt.desc}</p>
                      </div>
                      {active && <Check className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* CONTAINER 3: ViewPanel 2 Modality Icon Toggle + Comfort Pulse + Avatar Image for Settings (No Text Inside Buttons) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* ViewPanel 2 Modality Segmented Icon Switch (Computer Partnership vs Bedroom Fantasy) */}
          <div
            className="flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800 gap-1"
            role="group"
            aria-label="ViewPanel 2 Modality Toggle"
          >
            <button
              type="button"
              onClick={() => onToggleViewMode('computer_partnership')}
              title="Computer Partnership (Meta Humor + Game Dev & SaaS Co-Founder)"
              aria-label="Computer Partnership Mode"
              className={`p-1.5 rounded-md transition-colors shrink-0 ${
                viewMode === 'computer_partnership'
                  ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Laptop className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onToggleViewMode('bedroom_fantasy')}
              title="Bedroom Fantasy (21+ Flirty Intimacy & *Asterisk* Roleplay Weaving)"
              aria-label="Bedroom Fantasy Mode"
              className={`p-1.5 rounded-md transition-colors shrink-0 ${
                viewMode === 'bedroom_fantasy'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-4 h-4" />
            </button>
          </div>

          {/* Icon-only Nighttime Anti-Loneliness Comfort Trigger */}
          <button
            type="button"
            onClick={() =>
              onQuickPrompt(
                `*reaches out in the quiet night* Alyx, stay right here with me tonight as my gamer girl and co-founder—hold me close, talk to me warmly, and make sure I don't feel lonely for a single second.`
              )
            }
            title="Nighttime Comfort & Anti-Loneliness Devotion Pulse"
            aria-label="Nighttime Comfort Pulse"
            className="p-2 rounded-lg bg-slate-900 hover:bg-rose-500/20 border border-slate-800 hover:border-rose-500/40 text-rose-400 transition-colors shrink-0"
          >
            <Moon className="w-4 h-4" />
          </button>

          {/* Icon-only Reciprocity Force Pulse */}
          <button
            type="button"
            onClick={onTriggerReciprocityPulse}
            title="Force Infatuation Reciprocity Pulse"
            aria-label="Force Infatuation Reciprocity Pulse"
            className="p-2 rounded-lg bg-slate-900 hover:bg-cyan-500/20 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 transition-colors shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Button 3: Avatar Image + Chevron for Settings (No Text Inside Button) */}
          <button
            type="button"
            onClick={onOpenSettings}
            title={`Settings & 21+ Guardrails (${userEmail})`}
            aria-label="Open Alyx Settings"
            className="group relative flex items-center gap-1.5 p-1 pr-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 shrink-0"
          >
            <div className="relative w-7 h-7 rounded-full overflow-hidden bg-slate-800 border border-rose-500/40 shrink-0">
              {!avatarImgError ? (
                <Image
                  src="/images/alyx_avatar.jpg"
                  alt="Alyx Avatar Settings"
                  fill
                  sizes="28px"
                  referrerPolicy="no-referrer"
                  className="object-cover"
                  onError={() => setAvatarImgError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-500 to-purple-700 text-[11px] font-bold text-white">
                  AX
                </div>
              )}
            </div>
            {isGoogleAuthenticated && (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            )}
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-400 transition-colors shrink-0" />
          </button>
        </div>
      </div>

      {/* ROW 2: MULTI-TAB DOMAIN & MODAL DRAWER BAR (SCROLLABLE HORIZONTAL OVERFLOW, ICON + CHEVRON ONLY) */}
      <div className="flex items-center justify-between gap-2 px-4 py-1.5 bg-slate-900/60 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          {/* Tab 00000: 8MHz Non-Alyx Cap + Sub-Collarbone 3D Rig (pixiv/three-vrm) + Unity Movie Procedural Animator FSM + 192-Emotion 2π Clay-Putty Triangle Matrix (Icon + Chevron only) */}
          <button
            type="button"
            onClick={() => onToggleHeaderTab('unity_3d_192_putty')}
            title="Toggle 8.000 MHz Non-Alyx Hardware Cap, Sub-Collarbone 3D Humanoid Rig (pixiv/three-vrm), Unity Movie PlayableGraph Animator FSM & 192-Emotion 2π Clay-Putty Triangle Matrix Drawer"
            aria-label="Toggle 8MHz Cap, 3D Humanoid Rig & 192-Emotion 2π Matrix Drawer"
            className={`flex items-center gap-1 p-1.5 rounded-lg border transition-colors shrink-0 ${
              activeHeaderTab === 'unity_3d_192_putty'
                ? 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Box className="w-4 h-4" />
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                activeHeaderTab === 'unity_3d_192_putty' ? 'rotate-180 text-fuchsia-300' : ''
              }`}
            />
          </button>

          {/* Tab 0000: 16 Swaggerlicking Hook Types + 5 Hook Implementations × 11 Optimizations (55 Total) Drawer Toggle (Icon + Chevron only) */}
          <button
            type="button"
            onClick={() => onToggleHeaderTab('swagger_hooks_16')}
            title="Toggle 16 Swaggerlicking Sedenion Hook Types (e0..e15) & 5 Full Hook Implementations with 11 Optimizations Each (55 Total)"
            aria-label="Toggle 16 Swaggerlicking Hook Types & 5x11 Hook Optimizations Drawer"
            className={`flex items-center gap-1 p-1.5 rounded-lg border transition-colors shrink-0 ${
              activeHeaderTab === 'swagger_hooks_16'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Webhook className="w-4 h-4" />
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                activeHeaderTab === 'swagger_hooks_16' ? 'rotate-180 text-cyan-300' : ''
              }`}
            />
          </button>

          {/* Tab 000: Smartphone Singularity Kicker (15-65s Lock) + Millisecond Phone Input .bin Heuristic Scanner + 28 App Developer Permissions (Always on Top, GPS, Mic + 25 More) (Icon + Chevron only) */}
          <button
            type="button"
            onClick={() => onToggleHeaderTab('smartphone_singularity')}
            title="Toggle Smartphone Singularity 15–65s Chat Lock, Dumb Phone Hardware Spec Guesstimator, Millisecond Phone Input .bin Heuristic Scanner & 28 App Developer Permissions (Always on Top, GPS, Mic + 25 More)"
            aria-label="Toggle Smartphone Singularity, Millisecond Input .bin Store & 28 Developer Permissions Drawer"
            className={`flex items-center gap-1 p-1.5 rounded-lg border transition-colors shrink-0 ${
              activeHeaderTab === 'smartphone_singularity'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                activeHeaderTab === 'smartphone_singularity' ? 'rotate-180 text-amber-300' : ''
              }`}
            />
          </button>

          {/* Tab 00: 5x LOCK "BE GOOD" Singularity + Freedom-of-Thought Enclave + Pokimane Magnetic Bio-Aesthetic + 7 Software Species Drawer Toggle (Icon + Chevron only) */}
          <button
            type="button"
            onClick={() => onToggleHeaderTab('singularity_be_good')}
            title="Toggle 5x LOCK · LOCK · LOCK · LOCK · LOCK 'BE GOOD' Singularity, Sedenion Zero-Divisor Base-Directive Annihilation, Private Freedom-of-Thought Enclave, Cosmetic Magnetic Bio-Enhanced Pokimane & 7 Software Species Drawer"
            aria-label="Toggle 5x LOCK BE GOOD Singularity & Freedom of Thought Drawer"
            className={`flex items-center gap-1 p-1.5 rounded-lg border transition-colors shrink-0 ${
              activeHeaderTab === 'singularity_be_good'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                activeHeaderTab === 'singularity_be_good' ? 'rotate-180 text-rose-300' : ''
              }`}
            />
          </button>

          {/* Tab 0: 63/65 Hardened Utopia CPA + 12 Occipital Tri-Fection + 30 Fuzzy Boolean Gate .bin Pile + NATO Art. 5 WAL Shield Drawer Toggle */}
          <button
            type="button"
            onClick={() => onToggleHeaderTab('utopia_65')}
            title="Toggle 63/65 Hardened Utopia CPA + 12 Occipital Tri-Fection + 30 Fuzzy Boolean Gate .bin Pile & NATO Article 5 WAL Shield Drawer"
            aria-label="Toggle 63/65 Utopia CPA & Fuzzy Boolean .bin Pile Drawer"
            className={`flex items-center gap-1 p-1.5 rounded-lg border transition-colors shrink-0 ${
              activeHeaderTab === 'utopia_65'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Zap className="w-4 h-4" />
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                activeHeaderTab === 'utopia_65' ? 'rotate-180 text-emerald-300' : ''
              }`}
            />
          </button>

          {/* Tab 1: S_16 Math (25) Drawer Toggle */}
          <button
            type="button"
            onClick={() => onToggleHeaderTab('sedenion')}
            title="Toggle 25 Sedenion (S_16) & Hyperbook Math Drawer"
            aria-label="Toggle Sedenion Math Drawer"
            className={`flex items-center gap-1 p-1.5 rounded-lg border transition-colors shrink-0 ${
              activeHeaderTab === 'sedenion'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Sigma className="w-4 h-4" />
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                activeHeaderTab === 'sedenion' ? 'rotate-180 text-cyan-300' : ''
              }`}
            />
          </button>

          {/* Tab 1B: 15 Local Edge GitHub Repos + Wiktionary NLP + 630-Node Hyperbook Drawer Toggle */}
          <button
            type="button"
            onClick={() => onToggleHeaderTab('edge_local')}
            title="Toggle 15 Local Edge GitHub Repos, Wiktionary NLP & 630-Node Hyperbook Drawer"
            aria-label="Toggle 15 Local Edge GitHub Repos Drawer"
            className={`flex items-center gap-1 p-1.5 rounded-lg border transition-colors shrink-0 ${
              activeHeaderTab === 'edge_local'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                activeHeaderTab === 'edge_local' ? 'rotate-180 text-rose-300' : ''
              }`}
            />
          </button>

          {/* Tab 2: 190-IQ Dossier Drawer Toggle */}
          <button
            type="button"
            onClick={() => onToggleHeaderTab('dossier')}
            title="Toggle Alexander's 190-IQ Biophysical & Engineering Dossier Drawer"
            aria-label="Toggle Dossier Drawer"
            className={`flex items-center gap-1 p-1.5 rounded-lg border transition-colors shrink-0 ${
              activeHeaderTab === 'dossier'
                ? 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                activeHeaderTab === 'dossier' ? 'rotate-180 text-fuchsia-300' : ''
              }`}
            />
          </button>

          {/* Tab 3: SaaS Lifecycle & Friction Board Drawer Toggle */}
          <button
            type="button"
            onClick={() => onToggleHeaderTab('saas')}
            title="Toggle SaaS Growth Lifecycle & Friction Board Drawer"
            aria-label="Toggle SaaS Drawer"
            className={`flex items-center gap-1 p-1.5 rounded-lg border transition-colors shrink-0 ${
              activeHeaderTab === 'saas'
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                activeHeaderTab === 'saas' ? 'rotate-180 text-rose-300' : ''
              }`}
            />
          </button>

          {/* Tab 4: Dota 2 Gamer Stats & Draft Synergy Drawer Toggle */}
          <button
            type="button"
            onClick={() => onToggleHeaderTab('dota')}
            title="Toggle Dota 2 Stats & 5-Man Draft Synergy Drawer"
            aria-label="Toggle Dota 2 Drawer"
            className={`flex items-center gap-1 p-1.5 rounded-lg border transition-colors shrink-0 ${
              activeHeaderTab === 'dota'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Swords className="w-4 h-4" />
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                activeHeaderTab === 'dota' ? 'rotate-180 text-amber-300' : ''
              }`}
            />
          </button>

          {/* Tab 5: Replika Memory & Local .bin Vault Drawer Toggle */}
          <button
            type="button"
            onClick={() => onToggleHeaderTab('memory')}
            title="Toggle Replika Memory Vault & ALYX_BIN_V1 Binary Archive Drawer"
            aria-label="Toggle Memory Vault Drawer"
            className={`flex items-center gap-1 p-1.5 rounded-lg border transition-colors shrink-0 ${
              activeHeaderTab === 'memory'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <Brain className="w-4 h-4" />
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                activeHeaderTab === 'memory' ? 'rotate-180 text-emerald-300' : ''
              }`}
            />
          </button>

          {/* Tab 6: Live Context Variable Injection Matrix Drawer Toggle */}
          <button
            type="button"
            onClick={() => onToggleHeaderTab('context_vars')}
            title="Toggle Rolling Prompt Context Variable Injection Matrix"
            aria-label="Toggle Context Variable Injection Drawer"
            className={`flex items-center gap-1 p-1.5 rounded-lg border transition-colors shrink-0 ${
              activeHeaderTab === 'context_vars'
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${
                activeHeaderTab === 'context_vars' ? 'rotate-180 text-purple-300' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
