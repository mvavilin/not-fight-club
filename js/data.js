import { getUser } from './user.js';
export const AVATAR_PATH = '../assets/images/avatars/';

export const avatars = [
  { id: 1, name: 'default_user_avatar', ext: '.webp' },
  { id: 2, name: 'blueberry_guardian_avatar', ext: '.webp' },
  { id: 3, name: 'neon_jumper_avatar', ext: '.webp' },
  { id: 4, name: 'glitch_hacker_avatar', ext: '.webp' },
  { id: 5, name: 'rust_crusher_avatar', ext: '.webp' },
  { id: 6, name: 'void_trickster_avatar', ext: '.webp' },
];


export const player = {
  name: getUser().username,
  avatar: getUser().avatar,
  attackZone: 1,
  defenceZones: 2,
  currentHealth: 100,
  totalHealth: 100,
  attackPower: 12,
  critChance: 0.5,
  critMultiplier: 1.5,
  attackedZones: [],
  blockedZones: [],
}

export const enemies = [
  {
    name: "Glitch hacker",
    avatar: avatars[3].name + avatars[3].ext,
    attackZone: 1,
    defenceZones: 2,
    currentHealth: 80,
    totalHealth: 80,
    attackPower: 9,
    critChance: 0.7,
    critMultiplier: 1.6,
    attackedZones: [],
    blockedZones: [],
  },
  {
    name: "Rust crusher",
    avatar: avatars[4].name + avatars[4].ext,
    attackZone: 1,
    defenceZones: 3,
    currentHealth: 150,
    totalHealth: 150,
    attackPower: 6,
    critChance: 0.4,
    critMultiplier: 1.6,
    attackedZones: [],
    blockedZones: [],
  },
  {
    name: "Void trickster",
    avatar: avatars[5].name + avatars[5].ext,
    attackZone: 2,
    defenceZones: 2,
    currentHealth: 90,
    totalHealth: 90,
    attackPower: 8,
    critChance: 0.2,
    critMultiplier: 1.4,
    attackedZones: [],
    blockedZones: [],
  },
];

export const zones = ['head', 'neck', 'body', 'belly', 'legs'];
