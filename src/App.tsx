/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Layout from './app/layout';
import Page from './app/page';
import { Snapshot, Metric } from './types';

export default function App() {
  // Preset Default Mock Profile
  const [userProfile, setUserProfile] = useState({
    name: 'Natpakal',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    tagline: 'Living my best life in BKK 🌸 @Lumpini park',
  });

  // Preset Default Mock Snapshots matching the detailed screenshot items
  const DEFAULT_SNAPSHOTS: Snapshot[] = [
    {
      id: 'snap_1',
      image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&q=80',
      category: 'fun',
      title: 'Uno Table Showdown',
      description: 'Intense Uno battle with friends at our local spot after work. Double draw-four cards were played resulting in hilarious laughter!',
      angle: '-rotate-6',
    },
    {
      id: 'snap_2',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
      category: 'hobby',
      title: 'Cozy Mosaic Tiling Workshop',
      description: 'Spent Saturday morning learning to compose lovely ceramic tiling designs. Extremely therapeutic and satisfying.',
      angle: 'rotate-2',
    },
    {
      id: 'snap_3',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
      category: 'workout',
      title: 'Pushing Personal Muscle Lift Record',
      description: 'Our favorite little cute lucky barbell weight assistant sitting on the safety bench press to cheer me on! Pushed some personal record sets today.',
      angle: 'rotate-6',
    },
    {
      id: 'snap_4',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
      category: 'fun',
      title: 'Fancy Sunday Brunch Decor',
      description: 'Sumptuous visual aesthetics paired with mouthwatering sourdough benedict dishes. Decisive way to welcome the weekend.',
      angle: '-rotate-3',
    }
  ];

  // Preset Default Mock Metrics matching the Red/Cyan/Blue tag coordinates in screen mockup
  const DEFAULT_METRICS: Metric[] = [
    {
      id: 'fun',
      name: 'Drinks & Fun',
      value: 4,
      max: 10,
      color: '#f97316',
      icon: '🍷',
    },
    {
      id: 'workout',
      name: 'Gym & Fitness',
      value: 3,
      max: 10,
      color: '#3b82f6',
      icon: '🏋️',
    },
    {
      id: 'hobby',
      name: 'Mind & Hobby',
      value: 2,
      max: 10,
      color: '#60a5fa',
      icon: '🎭',
    },
  ];

  const [snapshots, setSnapshots] = useState<Snapshot[]>(DEFAULT_SNAPSHOTS);
  const [metrics, setMetrics] = useState<Metric[]>(DEFAULT_METRICS);

  // Administrative layout handle reset controller
  const handleResetData = () => {
    setSnapshots(DEFAULT_SNAPSHOTS);
    setMetrics(DEFAULT_METRICS);
    setUserProfile({
      name: 'Natpakal',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      tagline: 'Living my best life in BKK 🌸 @Lumpini park',
    });
  };

  return (
    <Layout
      userProfile={userProfile}
      onUpdateProfile={setUserProfile}
      onResetData={handleResetData}
    >
      <Page
        userProfile={userProfile}
        snapshots={snapshots}
        setSnapshots={setSnapshots}
        metrics={metrics}
        setMetrics={setMetrics}
      />
    </Layout>
  );
}

