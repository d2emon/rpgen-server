import { Skill } from '../skill';

const SKILLS: Skill[] = [
    {
        skillId: 'BOATING',
        name: 'Boating',
        trait: 'agility',
    },
    {
        skillId: 'CLIMBING',
        name: 'Climbing',
        trait: 'strength',
    },
    {
        skillId: 'DRIVING',
        name: 'Driving',
        trait: 'agility',
    },
    {
        skillId: 'FIGHTING',
        name: 'Fighting',
        trait: 'agility',
    },
    {
        skillId: 'GAMBLING',
        name: 'Gambling',
        trait: 'smarts',
    },
    {
        skillId: 'GUTS',
        name: 'Guts',
        trait: 'spirit',
    },
    {
        skillId: 'HEALING',
        name: 'Healing',
        trait: 'smarts',
    },
    {
        skillId: 'INTIMIDATION',
        name: 'Intimidation',
        trait: 'spirit',
    },
    {
        skillId: 'INVESTIGATION',
        name: 'Investigation',
        trait: 'smarts',
    },
    {
        skillId: 'KNOWLEDGE',
        name: 'Knowledge',
        trait: 'smarts',
    },
    {
        skillId: 'LOCKPICKING',
        name: 'Lockpicking',
        trait: 'agility',
    },
    {
        skillId: 'NOTICE',
        name: 'Notice',
        trait: 'smarts',
    },
    {
        skillId: 'PERSUASION',
        name: 'Persuasion',
        trait: 'spirit',
    },
    {
        skillId: 'PILOTING',
        name: 'Piloting',
        trait: 'agility',
    },
    {
        skillId: 'REPAIR',
        name: 'Repair',
        trait: 'smarts',
    },
    {
        skillId: 'RIDING',
        name: 'Riding',
        trait: 'agility',
    },
    {
        skillId: 'SHOOTING',
        name: 'Shooting',
        trait: 'agility',
    },
    {
        skillId: 'STEALTH',
        name: 'Stealth',
        trait: 'agility',
    },
    {
        skillId: 'STREETWISE',
        name: 'Streetwise',
        trait: 'smarts',
    },
    {
        skillId: 'SURVIVAL',
        name: 'Survival',
        trait: 'smarts',
    },
    {
        skillId: 'SWIMMING',
        name: 'Swimming',
        trait: 'agility',
    },
    {
        skillId: 'TAUNT',
        name: 'Taunt',
        trait: 'smarts',
    },
    {
        skillId: 'THROWING',
        name: 'Throwing',
        trait: 'agility',
    },
    {
        skillId: 'TRACKING',
        name: 'Gambling',
        trait: 'smarts',
    },
];

export default SKILLS.reduce(
    (items: { [id: string]: Skill }, item: Skill) => ({
        ...items,
        [item.skillId]: item,
    }),
    {},
);
