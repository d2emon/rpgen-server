import logger from '../log';

export function* diceGenerator(dice: number, count?: number): Generator<number, number, boolean> {
    let result: number = 0;
    let rolled: number = 0;
    while (true) {
        const current: number = Math.floor(Math.random() * dice) + 1;
        rolled += 1;
        result += current;
        logger.debug(`rolled: ${current}`);
        yield current;
        if (count && (rolled >= count)) {
            return result;
        }
    }
}

export const d4 = diceGenerator(4);
export const d6 = diceGenerator(6);
export const d8 = diceGenerator(8);
export const d10 = diceGenerator(10);
export const d12 = diceGenerator(12);
export const d20 = diceGenerator(20);
export const d100 = diceGenerator(100);

const roll = (count: number, dice: number, modifier: number = 0): number => {
    const iter = diceGenerator(dice, count);
    let current = iter.next();
    while (!current.done) {
        current = iter.next();
    }
    return current.value + modifier;
}

export default roll;
