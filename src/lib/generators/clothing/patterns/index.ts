import { choice } from '../utils';
import PatternGenerator , { BasicPattern } from './pattern';
import ColoredPatternGenerator, { ColoredPattern } from './colored';

export type Pattern = BasicPattern | ColoredPattern;

const patterns: PatternGenerator[] = [
    new ColoredPatternGenerator(),
    ...[
        'dots',
        'floral',
        'stripes',
        'animal print',
    ].map((name) => new PatternGenerator(name)),
];

export const generatePattern = (): Pattern => choice(patterns).generate();

export default patterns;