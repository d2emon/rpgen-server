import {choice} from './utils';

export interface Color {
    name: string;
}

class ColorGenerator {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    generate(): Color {
        return {
            name: this.name,
        };
    }
}

const colors: ColorGenerator[] = [
    'deep red',
    'brick red',
    'bright red',
    'bright pink',
    'dusty pink',
    'light pink',
    'peach',
    'coral',
    'vibrant orange',
    'ginger',
    'terra cotta',
    'chocolate brown',
    'coffee brown',
    'earth brown',
    'gold',
    'amber',
    'golden yellow',
    'bright yellow',
    'light yellow',
    'chartreuse',
    'light green',
    'olive green',
    'lime',
    'dark green',
    'foliage green',
    'bright green',
    'emerald',
    'aqua',
    'turquoise',
    'teal',
    'sky blue',
    'light blue',
    'periwinkle',
    'bright blue',
    'deep blue',
    'lavender',
    'mauve',
    'amethyst',
    'blue purples',
    'red purple',
    'neutral grey',
    'charcoal grey',
    'taupe',
    'ivory',
    'silver',
    'black',
    'white',
].map(name => new ColorGenerator(name));

export const generateColor = (): Color => choice(colors).generate();

export default colors;