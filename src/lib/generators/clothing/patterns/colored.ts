import {Color, generateColor} from '../colors';
import PatternGenerator, { BasicPattern } from './pattern';

export interface ColoredPattern extends BasicPattern {
    name: string;
    color: Color;
}

class ColoredPatternGenerator extends PatternGenerator {
    constructor() {
        super('')
    }

    generate(): ColoredPattern {
        const color: Color = generateColor();
        return {
            name: `color ${color.name}`,
            color,
        };
    }
}

export default ColoredPatternGenerator;
