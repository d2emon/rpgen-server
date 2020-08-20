import TRAITS from './racialTraits';
import { Race } from '../race';

const RACES: Race[] = [
    {
        raceId: 'ATLANTEAN',
        name: 'Atlantean',
        traits: [
            TRAITS.AQUATIC,
            TRAITS.TOUGH,
        ],
    },
    {
        raceId: 'AVION',
        name: 'Avion',
        traits: [
            TRAITS.FLIGHT,
        ],
    },
    {
        raceId: 'DWARF',
        name: 'Dwarf',
        traits: [
            TRAITS.LOW_LIGHT_VISION,
            TRAITS.SLOW,
            TRAITS.TOUGH,
        ],
    },
    {
        raceId: 'ELF',
        name: 'Elf',
        traits: [
            TRAITS.AGILE,
            TRAITS.ALL_THUMBS,
            TRAITS.LOW_LIGHT_VISION,
        ],
    },
    {
        raceId: 'HALF_ELVES',
        name: 'Half-Elf',
        traits: [
            TRAITS.HERITAGE,
            TRAITS.LOW_LIGHT_VISION,
            TRAITS.NO_HARD_ROUTE,
        ],
    },
    {
        raceId: 'HALF_FOLK',
        name: 'Half-Folk',
        traits: [
            TRAITS.LUCK,
            TRAITS.SMALL,
            TRAITS.SPIRITED,
        ],
    },
    {
        raceId: 'HALF_ORC',
        name: 'Half-Orc',
        traits: [
            TRAITS.INFRAVISION,
            TRAITS.OUTSIDER,
            TRAITS.STRONG,
        ],
    },
    {
        raceId: 'HUMAN',
        name: 'Human',
        traits: [
            TRAITS.BONUS_EDGE,
        ],
    },
    {
        raceId: 'MANTID',
        name: 'Mantid',
        traits: [
            TRAITS.CARAPACE,
            TRAITS.LEAPING,
            TRAITS.NO_HARD_ROUTE,
        ],
    },
    {
        raceId: 'RAKASHAN',
        name: 'Rakashan',
        traits: [
            TRAITS.AGILE,
            TRAITS.BLOODTHIRSTY,
            TRAITS.CLAWS,
            TRAITS.LOW_LIGHT_VISION,
            TRAITS.POUNCE,
        ],
    },
    {
        raceId: 'SAURIAN',
        name: 'Saurian',
        traits: [
            TRAITS.OUTSIDER,
            TRAITS.NATURAL_WEAPON,
            TRAITS.NATURAL_SWIMMER,
            TRAITS.SAURIAN_SENSES,
        ],
    },
];

export default RACES.reduce(
    (items: { [id: string]: Race }, item: Race) => ({
        ...items,
        [item.raceId]: item,
    }),
    {},
);
