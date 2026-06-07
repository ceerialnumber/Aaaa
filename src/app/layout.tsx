import React from 'react';
import { User, RefreshCw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  userProfile?: {
    name: string;
    avatar: string;
    tagline: string;
  };
  onUpdateProfile?: (profile: { name: string; avatar: string; tagline: string }) => void;
  onResetData?: () => void;
}

export default function Layout({
  children,
  userProfile = {
    name: 'Natpakal',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    tagline: 'Living my best life in BKK 🌸',
  },
  onUpdateProfile,
  onResetData,
}: LayoutProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);
  const [tempProfile, setTempProfile] = React.useState(userProfile);

  React.useEffect(() => {
    setTempProfile(userProfile);
  }, [userProfile]);

  const handleSave = () => {
    if (onUpdateProfile) {
      onUpdateProfile(tempProfile);
    }
    setIsProfileModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-0 md:p-6 font-sans antialiased text-slate-800">
      {/* Background ambient light decorations for desktop */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-75 hidden md:block"></div>

      {/* Main smartphone viewpoint shell */}
      <div className="w-full max-w-md h-screen md:h-[860px] bg-white rounded-none md:rounded-[40px] flex flex-col shadow-2xl relative border-0 md:border-8 border-slate-900 overflow-hidden">
        {/* Phone Speaker & Camera Notch Simulator (only on desktop) */}
        <div className="hidden md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 md:w-36 md:h-6 md:bg-slate-900 md:rounded-b-2xl md:z-50 md:flex md:items-center md:justify-center">
          <div className="w-12 h-1 bg-slate-800 rounded-full mr-2"></div>
          <div className="w-2.5 h-2.5 bg-slate-800 rounded-full"></div>
        </div>

        {/* Top Header */}
        <header className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-slate-100 bg-white/90 backdrop-blur-md z-40 sticky top-0 md:pt-8">
          {/* Logo container */}
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-100/50 hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer">
              {/* Clapping Hands SVG Styled icon in bright blue stroke */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2563eb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transform -rotate-12"
              >
                <path d="M12 2C11.5 2 11 2.5 11 3C11 4 10.5 5 9.5 5C8.5 5 8 4 8 3C8 2.5 7.5 2 7 2C6.5 2 6 2.5 6 3C6 4.5 5.5 5.5 4 6C3 6.3 2 6.5 2 7.5c0 1 .5 1.5 1.5 1.5c1.5 0 2 1 2 2c0 1-.5 2-2 2a1.5 1.5 0 0 0 0 3c1 0 1.5.5 1.5 1.5c0 1-.5 2-2 2A1 1 0 0 0 4 21c1.5 0 2.5-.5 3-1.5c.5-1 1-1.5 2-1.5s1.5.5 2 1.5c.5 1 1.5 1.5 3 1.5a1 1 0 0 0 1-1c-1.5 0-2-1-2-2c0-1 .5-1.5 1.5-1.5a1.5 1.5 0 0 0 0-3c-1.5 0-2-1-2-2c0-1 .5-2 2-2c1 0 1.5-.5 1.5-1.5s-1-1.2-2-1.5c-1.5-.5-2-1.5-2-3c0-.5-.5-1-1-1z" />
                <path d="M14 6c1-1 3-1 4 0s1 3 0 4" />
                <path d="M16 4c1.5-1.5 4.5-1.5 6 0s1.5 4.5 0 6" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono tracking-wider text-slate-400 font-medium uppercase">Log</span>
              <span className="text-sm font-bold text-slate-800 -mt-1 font-display">DailyLife</span>
            </div>
          </div>

          {/* User profile action */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            id="profile-trigger-btn"
            className="relative group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-full p-0.5 border-2 border-blue-500/80 shadow-md transform hover:rotate-6 active:scale-95 transition-all duration-300 overflow-hidden">
              <img
                src={userProfile.avatar}
                alt="Profile Avatar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
          </button>
        </header>

        {/* Content Portal */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 relative flex flex-col pb-24">
          {children}
        </main>

        {/* Edit Profile / Controls Modal */}
        <AnimatePresence>
          {isProfileModalOpen && (
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-end justify-center">
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                className="bg-white w-full rounded-t-3xl max-h-[85%] overflow-y-auto p-6 shadow-2xl pb-10"
              >
                <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>

                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold font-display flex items-center gap-2 text-slate-800">
                    <User className="text-blue-500 w-5 h-5" />
                    Customize Your Account
                  </h3>
                  <button
                    onClick={() => setIsProfileModalOpen(false)}
                    className="text-slate-400 hover:text-slate-600 font-semibold text-sm cursor-pointer"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Name input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Profile Name
                    </label>
                    <input
                      type="text"
                      value={tempProfile.name}
                      onChange={(e) => setTempProfile({ ...tempProfile, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm transition-all"
                      placeholder="My nickname"
                    />
                  </div>

                  {/* Tagline input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Tagline / Bio
                    </label>
                    <input
                      type="text"
                      value={tempProfile.tagline}
                      onChange={(e) => setTempProfile({ ...tempProfile, tagline: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm transition-all"
                      placeholder="Bio statement"
                    />
                  </div>

                  {/* Avatar Picker Preset */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                      Choose Avatar
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80',
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
                      ].map((presetUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setTempProfile({ ...tempProfile, avatar: presetUrl })}
                          className={`w-14 h-14 rounded-full overflow-hidden p-0.5 border-2 transition-all hover:scale-105 cursor-pointer ${
                            tempProfile.avatar === presetUrl ? 'border-blue-500 scale-105 shadow-md' : 'border-slate-100'
                          }`}
                        >
                          <img
                            src={presetUrl}
                            alt={`Avatar ${idx}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* App controls / Settings */}
                  <div className="pt-4 border-t border-slate-100">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" /> System administration
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        if (onResetData) onResetData();
                        setIsProfileModalOpen(false);
                      }}
                      className="w-full bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-medium py-3 px-4 rounded-xl text-left border border-slate-100 justify-between flex items-center transition-all text-xs cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        <RefreshCw className="w-4 h-4 animate-spin-slow" />
                        Reload sample entries & reset meters
                      </span>
                      <kbd className="bg-slate-200/50 text-[10px] px-1.5 py-0.5 rounded font-mono text-slate-500">Reset</kbd>
                    </button>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setIsProfileModalOpen(false)}
                      className="flex-1 py-3 text-slate-500 bg-slate-50 font-semibold rounded-xl text-sm justify-center flex hover:bg-slate-100 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex-1 py-3 text-white bg-blue-600 font-semibold rounded-xl text-sm justify-center flex shadow-lg hover:bg-blue-700 transition-all cursor-pointer"
                    >
                      Save Settings
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
