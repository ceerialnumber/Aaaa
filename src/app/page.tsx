import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Plus,
  Compass,
  Smile,
  Dumbbell,
  Wine,
  Sparkles,
  Calendar,
  MapPin,
  Trash2,
  CheckCircle,
  HelpCircle,
  Clock,
  Flame,
  Award,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Highlight, Snapshot, Metric } from '../types';

interface PageProps {
  userProfile?: {
    name: string;
    avatar: string;
    tagline: string;
  };
  snapshots: Snapshot[];
  setSnapshots: React.Dispatch<React.SetStateAction<Snapshot[]>>;
  metrics: Metric[];
  setMetrics: React.Dispatch<React.SetStateAction<Metric[]>>;
}

export default function Page({
  userProfile = { name: 'Natpakal', avatar: '', tagline: '' },
  snapshots,
  setSnapshots,
  metrics,
  setMetrics
}: PageProps) {
  const [activeTab, setActiveTab] = useState<'activity' | 'self'>('activity');
  const [selectedSnapshot, setSelectedSnapshot] = useState<Snapshot | null>(null);
  const [activeHighlightIdx, setActiveHighlightIdx] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);

  // New item form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newCategory, setNewCategory] = useState<'fun' | 'workout' | 'hobby'>('fun');
  const [newPresetImgIdx, setNewPresetImgIdx] = useState(0);

  // Preset images for easy mock upload additions
  const PRESET_ADDITION_IMAGES = [
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80', // Reading book
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', // Healthy salad brunch
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80', // Scenic boat travel
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80', // Yoga stretch
    'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80', // Cool sneakers
  ];

  // Static eye-catching items config with Thai & English context
  const highlights: Highlight[] = [
    {
      id: 'h1',
      image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80',
      title: 'ดนตรีในสวน',
      date: '1 April 2026',
      location: '@Lumpini park',
      iconType: 'clapping'
    },
    {
      id: 'h2',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      title: 'เที่ยวคาเฟ่สุดคิ้วท์',
      date: '12 May 2026',
      location: '@Ari neighborhood',
      iconType: 'cheers'
    },
    {
      id: 'h3',
      image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
      title: 'เดินชมป่าไม้เขียวขจี',
      date: '4 June 2026',
      location: '@Khao Yai forest',
      iconType: 'hiking'
    }
  ];

  const handleNextHighlight = () => {
    setActiveHighlightIdx((prev) => (prev + 1) % highlights.length);
  };

  const handlePrevHighlight = () => {
    setActiveHighlightIdx((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  const currentHighlight = highlights[activeHighlightIdx];

  const handleAddLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    // Angles options for standard rotating aesthetic
    const anglePresets = ['-rotate-6', '-rotate-3', 'rotate-2', 'rotate-6', 'rotate-3'];
    const chosenAngle = anglePresets[snapshots.length % anglePresets.length];

    const newSnapshot: Snapshot = {
      id: `snap_${Date.now()}`,
      image: PRESET_ADDITION_IMAGES[newPresetImgIdx],
      category: newCategory,
      title: newTitle.trim(),
      description: newDescription.trim() || 'A snapshot of another awesome day logged with pure joy!',
      angle: chosenAngle,
    };

    // Update snapshots
    setSnapshots([newSnapshot, ...snapshots]);

    // Increment corresponding metric limit to max of 10
    setMetrics(prevMetrics =>
      prevMetrics.map(m => {
        if (m.id === newCategory) {
          return { ...m, value: Math.min(m.value + 1, m.max) };
        }
        return m;
      })
    );

    // Reset fields & close modal
    setNewTitle('');
    setNewDescription('');
    setNewCategory('fun');
    setNewPresetImgIdx(0);
    setIsAddModalOpen(false);

    // Gentle scroll tracking highlight back to top
    const mainSectionElem = document.getElementById('snapshots-title');
    if (mainSectionElem) {
      mainSectionElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDeleteSnapshot = (id: string, category: 'fun' | 'workout' | 'hobby' | 'other') => {
    setSnapshots(prev => prev.filter(s => s.id !== id));
    if (category !== 'other') {
      setMetrics(prev =>
        prev.map(m => {
          if (m.id === category) {
            return { ...m, value: Math.max(m.value - 1, 0) };
          }
          return m;
        })
      );
    }
    setSelectedSnapshot(null);
  };

  const filteredSnapshots = filterCategory
    ? snapshots.filter(s => s.category === filterCategory)
    : snapshots;

  return (
    <div className="flex-1 flex flex-col relative">
      <AnimatePresence mode="wait">
        {activeTab === 'activity' ? (
          /* =====================================
             ACTIVITY TAB
             ===================================== */
          <motion.div
            key="activity-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="px-6 py-4 flex flex-col gap-6"
          >
            {/* Eye-catching Heading with dynamic badge */}
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black font-display tracking-tight text-blue-600 flex items-center gap-1.5">
                  Eye-catching!
                </h2>
                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-ping mt-1" />
              </div>
              <button
                onClick={handleNextHighlight}
                className="text-blue-500 hover:text-blue-700 transition-colors p-1.5 hover:bg-blue-50 rounded-full cursor-pointer"
                title="Next Feature"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Highly Highlighted organic squircle container */}
            <div className="relative w-full aspect-[4/3] shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden organic-squircle group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHighlight.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={currentHighlight.image}
                    alt={currentHighlight.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Slider Controller arrows overlay */}
              <button
                onClick={handlePrevHighlight}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 hover:bg-white/80 text-white hover:text-blue-600 flex items-center justify-center backdrop-blur-sm transition-all shadow cursor-pointer z-10"
              >
                <ChevronLeft className="w-5 h-5 pointer-events-none" />
              </button>
              <button
                onClick={handleNextHighlight}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 hover:bg-white/80 text-white hover:text-blue-600 flex items-center justify-center backdrop-blur-sm transition-all shadow cursor-pointer z-10"
              >
                <ChevronRight className="w-5 h-5 pointer-events-none" />
              </button>

              {/* In-Image Labels & details */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between text-white">
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-xl font-bold font-display tracking-tight text-white drop-shadow-md">
                    {currentHighlight.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>{currentHighlight.location}</span>
                  </div>
                </div>

                {/* Floating Centered Custom clapping logo icon badge */}
                <div className="absolute left-[45%] bottom-1 w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-1 hover:scale-110 active:scale-95 transition-all duration-300">
                  {currentHighlight.iconType === 'clapping' && (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    >
                      <path d="M12 2C11.5 2 11 2.5 11 3C11 4 10.5 5 9.5 5C8.5 5 8 4 8 3C8 2.5 7.5 2 7 2C6.5 2 6 2.5 6 3C6 4.5 5.5 5.5 4 6C3 6.3 2 6.5 2 7.5" />
                      <path d="M14 6c1-1 3-1 4 0s1 3 0 4" />
                      <path d="M16 4c1.5-1.5 4.5-1.5 6 0s1.5 4.5 0 6" />
                    </svg>
                  )}
                  {currentHighlight.iconType === 'cheers' && (
                    <Wine className="w-5 h-5 text-amber-500 fill-amber-50" />
                  )}
                  {currentHighlight.iconType === 'hiking' && (
                    <Compass className="w-5 h-5 text-emerald-600 animate-spin-slow" />
                  )}
                </div>

                <div className="text-right text-xs font-mono font-medium opacity-90 drop-shadow-md pb-0.5">
                  {currentHighlight.date}
                </div>
              </div>
            </div>

            {/* Snapshots header */}
            <div id="snapshots-title" className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black font-display tracking-tight text-blue-600">
                  Snapshots
                </h2>
                {filterCategory && (
                  <button
                    onClick={() => setFilterCategory(null)}
                    className="text-[11px] font-semibold bg-blue-50 text-blue-500 hover:bg-blue-100 px-2 py-0.5 rounded-full transition-all cursor-pointer"
                  >
                    Clear Filter ({filterCategory}) ×
                  </button>
                )}
              </div>
              <span className="text-slate-400 group flex items-center gap-1 text-xs font-semibold cursor-pointer">
                Swipe to scout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            {/* Side Scrollable Stack of Snapshot cards matching angled rotated reference mockup */}
            <div className="w-full relative overflow-x-auto pb-6 pt-2">
              <div className="flex gap-4 px-3 w-max">
                {filteredSnapshots.map((snap) => (
                  <motion.div
                    key={snap.id}
                    onClick={() => setSelectedSnapshot(snap)}
                    className={`w-44 aspect-[3/4] bg-white p-2.5 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 transform ${snap.angle} cursor-pointer origin-center relative overflow-hidden group select-none`}
                    whileHover={{ rotate: 0, zIndex: 30 }}
                  >
                    {/* Inner image frame */}
                    <div className="w-full h-[85%] bg-slate-50 rounded-xl overflow-hidden relative">
                      <img
                        src={snap.image}
                        alt={snap.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Floating tag inside Card */}
                      <span className={`absolute top-1.5 right-1.5 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-white shadow shadow-black/10 ${
                        snap.category === 'fun'
                          ? 'bg-orange-500'
                          : snap.category === 'workout'
                          ? 'bg-blue-600'
                          : 'bg-indigo-400'
                      }`}>
                        {snap.category === 'workout' ? 'gym' : snap.category}
                      </span>
                    </div>

                    <div className="pt-2 text-center">
                      <h4 className="text-[11px] font-bold text-slate-700 truncate font-display">
                        {snap.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}

                {filteredSnapshots.length === 0 && (
                  <div className="w-[300px] h-[180px] bg-slate-100 border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center p-6 text-center">
                    <HelpCircle className="w-10 h-10 text-slate-400 mb-2 animate-bounce" />
                    <p className="text-xs font-semibold text-slate-500">No snapshots for this filter.</p>
                    <button
                      onClick={() => setFilterCategory(null)}
                      className="text-[10px] font-bold text-blue-600 hover:underline mt-1 cursor-pointer"
                    >
                      Show all snapshots
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Counter and Progress Bar meters matching Red, Blue, Cyan screenshot */}
            <div className="flex justify-between items-center gap-2 pt-2 pb-2">
              {metrics.map((metric) => {
                const percentage = (metric.value / metric.max) * 100;
                const isSelected = filterCategory === metric.id;
                return (
                  <button
                    key={metric.id}
                    onClick={() => setFilterCategory(isSelected ? null : metric.id)}
                    className={`flex-1 group focus:outline-none text-left transition-all duration-300 hover:scale-[102%] ${
                      filterCategory && !isSelected ? 'opacity-40 scale-95' : 'opacity-100'
                    }`}
                  >
                    {/* The Capsule tag */}
                    <div className="relative w-full h-[34px] rounded-full overflow-hidden bg-slate-100 border border-slate-200/50 flex items-center pr-2">
                      {/* Active category light highlighted pulse ring */}
                      {isSelected && (
                        <div className="absolute inset-0 border border-blue-500 rounded-full animate-pulse z-20 pointer-events-none" />
                      )}

                      {/* Internal Progress Bar Fill */}
                      <div
                        className="absolute left-0 top-0 bottom-0 transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor:
                            metric.id === 'fun'
                              ? '#f97316' // red orange
                              : metric.id === 'workout'
                              ? '#3b82f6' // rich blue
                              : '#60a5fa', // sky blue
                        }}
                      />

                      {/* Pill contents overlay */}
                      <div className="absolute inset-0 flex items-center justify-between px-2.5 z-10 text-white font-mono font-bold text-[10px]">
                        {/* Icon sphere */}
                        <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs shadow-inner">
                          {metric.id === 'fun' && <Wine className="w-3 h-3 text-white fill-white" />}
                          {metric.id === 'workout' && <Dumbbell className="w-3 h-3 text-white" />}
                          {metric.id === 'hobby' && <Smile className="w-3 h-3 text-white" />}
                        </div>

                        {/* Text value */}
                        <span className="drop-shadow-md text-white">
                          {metric.value}/{metric.max}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* =====================================
             SELF TAB (REFLECTIONS & PERSONAL METRICS)
             ===================================== */
          <motion.div
            key="self-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="px-6 py-4 flex flex-col gap-6"
          >
            {/* Header section */}
            <div className="flex items-center gap-4 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-3xl p-5 text-white shadow-lg mt-2">
              <div className="w-14 h-14 rounded-full border-2 border-white/60 overflow-hidden shadow">
                <img src={userProfile.avatar} alt={userProfile.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-lg font-black font-display text-white pr-2 border-r border-white/20">
                    {userProfile.name}
                  </h3>
                  <div className="flex items-center gap-0.5 bg-amber-400 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full">
                    <Flame className="w-3 h-3 fill-amber-700 text-amber-900" />
                    <span>12 Days</span>
                  </div>
                </div>
                <p className="text-xs text-white/95 mt-1 font-medium">{userProfile.tagline}</p>
              </div>
            </div>

            {/* Streak & Stats Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <Award className="w-8 h-8 text-amber-500 mb-1" />
                <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider font-mono">Total Logs</span>
                <span className="text-xl font-bold font-display text-slate-800">{snapshots.length} snapshots</span>
              </div>
              <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <Heart className="w-8 h-8 text-rose-500 mb-1 fill-rose-50" />
                <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider font-mono">Weekly Ratio</span>
                <span className="text-xl font-bold font-display text-slate-800">92% Consistency</span>
              </div>
            </div>

            {/* Question of the Day Interaction */}
            <div className="bg-blue-50/50 border border-blue-100/70 p-5 rounded-[26px]">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-600 rounded-full p-1 text-xs">
                  <Sparkles className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold text-blue-600 font-sans tracking-wide">REFLECTION ASSISTANT</span>
              </div>
              <h4 className="text-sm font-bold font-display text-slate-800 leading-snug">
                "What was the single happiest mini-moment you captured today?"
              </h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Take snapshotting a step further. Write a quick daily journal thought below to solidify this joy into persistent memory.
              </p>
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Today, laughing over card draw-four's..."
                  className="flex-1 text-xs bg-white border border-slate-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => alert("Reflective thought archived in your journal memory! \u2728")}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Categories Distribution */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-3">
              <h3 className="text-sm font-bold text-slate-700 font-display flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                Activity Proportions
              </h3>
              <div className="space-y-2.5 pt-1">
                {metrics.map(m => {
                  const percent = (m.value / 10) * 100;
                  return (
                    <div key={m.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-slate-500">
                        <span className="capitalize">{m.id === 'workout' ? 'Gym/Workout' : m.id === 'fun' ? 'Drinks & Fun' : m.name}</span>
                        <span className="font-mono">{m.value * 10}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${percent}%`,
                            backgroundColor: m.id === 'fun' ? '#f97316' : m.id === 'workout' ? '#3b82f6' : '#60a5fa'
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================
         FLOATING BOTTOM CONTROLLER NAVIGATION CAPSULE
         ===================================== */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[85%] bg-white/80 backdrop-blur-lg border border-slate-200/50 rounded-full py-2.5 px-3 flex items-center justify-between shadow-2xl z-40">
        {/* Toggle Pills */}
        <div className="flex gap-1.5">
          {/* Activity Tab Toggle */}
          <button
            onClick={() => setActiveTab('activity')}
            id="tab-toggle-activity"
            className={`py-2 px-6 rounded-full font-bold text-xs transition-all duration-300 uppercase tracking-wider cursor-pointer ${
              activeTab === 'activity'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-black scale-102'
                : 'text-slate-500 hover:text-slate-750'
            }`}
          >
            Activity
          </button>

          {/* Self Tab Toggle */}
          <button
            onClick={() => setActiveTab('self')}
            id="tab-toggle-self"
            className={`py-2 px-6 rounded-full font-bold text-xs transition-all duration-300 uppercase tracking-wider cursor-pointer ${
              activeTab === 'self'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-black scale-102'
                : 'text-slate-500 hover:text-slate-750'
            }`}
          >
            Self
          </button>
        </div>

        {/* FAB + Trigger Circle */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          id="fab-add-log-btn"
          className="w-12 h-12 bg-white hover:bg-blue-50 text-blue-600 rounded-full border border-blue-100 shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none cursor-pointer"
          title="Add Snapshot"
        >
          <Plus className="w-5 h-5 text-blue-600" />
        </button>
      </div>

      {/* =====================================
         IMAGE ZOOM DETAILED VIEW MODAL
         ===================================== */}
      <AnimatePresence>
        {selectedSnapshot && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6 text-slate-800">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="bg-white rounded-[32px] w-full max-w-sm overflow-hidden shadow-2xl relative border border-slate-100"
            >
              <div className="aspect-[4/3] w-full relative">
                <img
                  src={selectedSnapshot.image}
                  alt={selectedSnapshot.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full text-white shadow-md ${
                    selectedSnapshot.category === 'fun'
                      ? 'bg-orange-500'
                      : selectedSnapshot.category === 'workout'
                      ? 'bg-blue-600'
                      : 'bg-indigo-400'
                  }`}>
                    {selectedSnapshot.category === 'workout' ? 'gym' : selectedSnapshot.category}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 flex flex-col gap-3">
                <div>
                  <h3 className="text-xl font-bold font-display tracking-tight text-slate-900 leading-snug">
                    {selectedSnapshot.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {selectedSnapshot.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Logged Today</span>
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => handleDeleteSnapshot(selectedSnapshot.id, selectedSnapshot.category)}
                      className="text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 p-2 rounded-full cursor-pointer transition-colors"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedSnapshot(null)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2 rounded-full cursor-pointer transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =====================================
         ADD LOG MODAL SHEET
         ===================================== */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end justify-center">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="bg-white w-full rounded-t-3xl max-h-[90%] overflow-y-auto p-6 shadow-2xl pb-10 text-slate-800"
            >
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>

              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold font-display flex items-center gap-2 text-slate-800">
                  <CheckCircle className="text-blue-600 w-5 h-5" />
                  Capture New Snapshot
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleAddLogSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Highlight Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm transition-all"
                    placeholder="E.g., Delicious Matcha Morning"
                  />
                </div>

                {/* Category Picker */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Activity Meter Category
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'fun', label: 'Drinks & Fun', color: 'orange-500', icon: Wine },
                      { id: 'workout', label: 'Gym & Fitness', color: 'blue-600', icon: Dumbbell },
                      { id: 'hobby', label: 'Mind & Hobby', color: 'indigo-400', icon: Smile },
                    ].map((cat) => {
                      const CatIcon = cat.icon;
                      const isSelected = newCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setNewCategory(cat.id as any)}
                          className={`py-3 px-2 rounded-2xl flex flex-col items-center gap-1.5 border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/50 text-blue-600 font-bold scale-[102%] shadow-sm'
                              : 'border-slate-100 bg-slate-50/50 text-slate-500'
                          }`}
                        >
                          <CatIcon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                          <span className="text-[10px] capitalize tracking-tight font-semibold leading-none">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Short Story
                  </label>
                  <textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm transition-all resize-none"
                    placeholder="Tell us what made this snapshot memory beautiful..."
                  />
                </div>

                {/* Preset Snapshots */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Mock Image Preset
                  </label>
                  <div className="flex gap-2.5 overflow-x-auto py-1">
                    {PRESET_ADDITION_IMAGES.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setNewPresetImgIdx(idx)}
                        className={`w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden border-2 transition-all hover:scale-105 cursor-pointer ${
                          newPresetImgIdx === idx ? 'border-blue-600 scale-102 shadow-md' : 'border-slate-100'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`Preset ${idx + 1}`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit actions */}
                <div className="pt-4 flex gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="flex-1 py-3 bg-slate-50 text-slate-500 hover:bg-slate-100 font-bold rounded-xl text-center cursor-pointer transition-all"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl text-center shadow-lg hover:bg-blue-700 transition-all cursor-pointer"
                  >
                    Confirm Log
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
