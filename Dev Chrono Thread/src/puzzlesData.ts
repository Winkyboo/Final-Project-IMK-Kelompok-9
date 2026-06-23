/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SequencePuzzle, CoordinatePuzzle, Badge } from './types';

export const SEQUENCES: SequencePuzzle[] = [
  {
    id: 'seq-1',
    title: 'Binary Search Sequence',
    algorithmName: 'Binary Search (Logarithmic Lookup)',
    description: 'Arrange the core steps of Binary Search to locate an item in a sorted collection.',
    difficulty: 'easy',
    academicArea: 'computer_science',
    xpValue: 150,
    realWorldImpact: 'Binary search runs in O(log N) time instead of linear O(N) lookup. It is the core algorithm behind database indexes and dictionary structures.',
    steps: [
      { id: '1a', text: 'Ensure the entire list/array is strictly sorted in ascending order.', correctOffset: 0, explanation: 'Binary search only functions correctly on pre-sorted arrays.' },
      { id: '1b', text: 'Establish boundary pointers: set Left to index 0, and Right to index N-1.', correctOffset: 1, explanation: 'Boundary pointers restrict the active search partition.' },
      { id: '1c', text: 'Find the middle point by computing Mid = Math.floor((Left + Right) / 2).', correctOffset: 2, explanation: 'The middle index divides the search space into halves.' },
      { id: '1d', text: 'If Value[Mid] matches target, return Mid index immediately as a hit.', correctOffset: 3, explanation: 'Direct matching is the optimal stop-case condition.' },
      { id: '1e', text: 'If target is smaller, adjust Right = Mid - 1; if larger, Left = Mid + 1.', correctOffset: 4, explanation: 'Halving the search range based on magnitude reduces time complexity.' },
      { id: '1f', text: 'Repeat the partition step recursively until target is reached or Left > Right.', correctOffset: 5, explanation: 'If Left exceeds Right, the element is confirmed missing from the collection.' }
    ]
  },
  {
    id: 'seq-2',
    title: 'Bubble Sort Pass Loop',
    algorithmName: 'Single Bubble Sort Pass (O(N²) Sorting)',
    description: 'Organize the logical steps of a single sorting pass using comparison bubbles.',
    difficulty: 'medium',
    academicArea: 'computer_science',
    xpValue: 200,
    realWorldImpact: 'While inefficient for large arrays, Bubble Sort is highly valuable for understanding iterative pointers and swap states.',
    steps: [
      { id: '2a', text: 'Begin at index 0 and inspect the first adjacent pair: index 0 and index 1.', correctOffset: 0, explanation: 'Bubble comparison always starts from the beginning of the collection.' },
      { id: '2b', text: 'Run a conditional check: is the left element strictly greater than the right?', correctOffset: 1, explanation: 'This comparison identifies whether items are out of sorted order.' },
      { id: '2c', text: 'If true, swap their positions in memory; swap state is flagged as modified.', correctOffset: 2, explanation: 'Swapping corrects the local order of the adjacent pair.' },
      { id: '2d', text: 'Increment the pointer index by 1 to proceed to the next adjacent pair.', correctOffset: 3, explanation: 'Moving the pointer maintains consecutive sliding check bubbles.' },
      { id: '2e', text: 'Repeat comparison checks until the pointer reaches the final unsorted element in index N - 1 - Iteration.', correctOffset: 4, explanation: 'Each full iteration guarantees the largest remaining value bubbles to its correct absolute position in the end.' }
    ]
  },
  {
    id: 'seq-3',
    title: 'Machine Learning Classification Pipeline',
    algorithmName: 'ML Model Fitting & Validation',
    description: 'Arrange the sequential lifecycle of preparing, fitting, and testing a logistics regression model.',
    difficulty: 'hard',
    academicArea: 'statistics',
    xpValue: 350,
    realWorldImpact: 'Ensures machine learning models generalize well to real-world data and avoids overfitting or silent data leakage.',
    steps: [
      { id: '3a', text: 'Ingest raw dataset, clean columns, and perform exploratory data analysis.', correctOffset: 0, explanation: 'You must inspect your features and clear anomalies before training.' },
      { id: '3b', text: 'Scale continuous numerical parameters and convert category indexes using one-hot encoders.', correctOffset: 1, explanation: 'Pre-processing maps diverse domains into matching numeric scales.' },
      { id: '3c', text: 'Perform a Split operation: partition rows into 80% Training and 20% Testing subsets.', correctOffset: 2, explanation: 'Separating train/test data prevents data leakage during optimization.' },
      { id: '3d', text: 'Fit the mathematical model weight parameters strictly using the Training split records.', correctOffset: 3, explanation: 'Fitting weights adjusts model coefficients using training cues.' },
      { id: '3e', text: 'Compute validation predictions on the isolated Testing split.', correctOffset: 4, explanation: 'Inference on unseen records proves actual model generalizability.' },
      { id: '3f', text: 'Analyze and compile final confusion matrices: F1, precision, and recall scores.', correctOffset: 5, explanation: 'Calculating performance metrics determines real-world readiness.' }
    ]
  },
  {
    id: 'seq-4',
    title: 'B-Tree Node Division Splitting',
    algorithmName: 'B-Tree Insertion & Balancing',
    description: 'How a Relational Database node deals with overflow space saturation.',
    difficulty: 'hard',
    academicArea: 'logic_analysis',
    xpValue: 400,
    realWorldImpact: 'Allows filesystems and major databases (Postgres, SQL Server) to query millions of rows in constant speeds.',
    steps: [
      { id: '4a', text: 'Locate relevant leaf node by traversing down search tree pivot boundaries.', correctOffset: 0, explanation: 'Finds the correct leaf to host the new record key.' },
      { id: '4b', text: 'Insert the key in sorted order directly into the Leaf node.', correctOffset: 1, explanation: 'Keeps leaf elements strictly ordered.' },
      { id: '4c', text: 'Detect state: check if node keys count exceeds the maximum limit (Saturation).', correctOffset: 2, explanation: 'Triggers balancing mechanism when page size overflows.' },
      { id: '4d', text: 'Identify the exact median value in the saturated leaf keys list.', correctOffset: 3, explanation: 'The median divides the keys equally for splitting.' },
      { id: '4e', text: 'Split remaining keys into two new sibling nodes (Left & Right halves).', correctOffset: 4, explanation: 'Partitions elements into two sub-nodes of proper sizes.' },
      { id: '4f', text: 'Push the selected median key upward to inject into the parent pivot node.', correctOffset: 5, explanation: 'Maintains search pathway link connecting branches recursively.' }
    ]
  }
];

export const PRESET_HP_PUZZLES: CoordinatePuzzle[] = [
  {
    id: 'coord-1',
    title: 'Beacon Synchronization',
    difficulty: 'easy',
    gridSize: 4,
    targetRow: 'B',
    targetCol: 3,
    radarMode: false,
    hint: 'Calibrate frequency. Locate coordinate coordinates (Row B, Column 3).',
    xpValue: 100
  },
  {
    id: 'coord-2',
    title: 'Sonar Core Extraction',
    difficulty: 'medium',
    gridSize: 5,
    targetRow: 'D',
    targetCol: 4,
    radarMode: true,
    hint: 'Use the Sonar ping sensor feedback! When you click incorrect coordinates, the sensor will report the distance to the target core.',
    xpValue: 250
  },
  {
    id: 'coord-3',
    title: 'Hyperloop Cluster Routing',
    difficulty: 'hard',
    gridSize: 6,
    targetRow: 'E',
    targetCol: 2,
    radarMode: true,
    hint: 'An underground signal hub, hidden in a massive 6x6 grid. Grid coordinates range from Row A-F and Column 1-6. Watch for Sonar Proximity Pings to narrow down from E2.',
    xpValue: 400
  }
];

export const BADGES: Badge[] = [
  { id: 'badge-1', title: 'Binary Scout', description: 'Solved first coordinate visual alignment.', icon: 'Compass', unlockedAtXp: 50 },
  { id: 'badge-2', title: 'Algorithm Artisan', description: 'Arranged sequence puzzle flawlessly.', icon: 'Binary', unlockedAtXp: 150 },
  { id: 'badge-3', title: 'Hyper-focused', description: 'Reached total cumulative 400 XP.', icon: 'Zap', unlockedAtXp: 400 },
  { id: 'badge-4', title: 'Chrono Champion', description: 'Unlocked elite 800 XP mark.', icon: 'Award', unlockedAtXp: 800 },
];

export const INITIAL_LEADERBOARD: { username: string; xp: number; level: number; schoolTag: string; avatarColor: string }[] = [
  { username: 'albert_kurnia', xp: 1250, level: 7, schoolTag: 'BINUS', avatarColor: 'bg-emerald-500' },
  { username: 'sarah_m', xp: 980, level: 5, schoolTag: 'UI', avatarColor: 'bg-pink-500' },
  { username: 'dean_hacker', xp: 820, level: 4, schoolTag: 'ITB', avatarColor: 'bg-cyan-500' },
  { username: 'rizky_algo', xp: 600, level: 3, schoolTag: 'UGM', avatarColor: 'bg-orange-500' },
  { username: 'dev_gita', xp: 480, level: 2, schoolTag: 'ITS', avatarColor: 'bg-indigo-500' },
  { username: 'charlie_code', xp: 320, level: 2, schoolTag: 'BINUS', avatarColor: 'bg-purple-500' },
  { username: 'nadia_stat', xp: 180, level: 1, schoolTag: 'UI', avatarColor: 'bg-red-500' },
];
