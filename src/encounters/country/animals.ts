import { DangerClass } from './dangerClass';
import { d20 } from '../../lib/dice';

export interface Animal {
    animalType: string;
    size: number;
}

const newAnimal = (dangerClass: DangerClass) => (animalType: string, value?: number): Animal => {
    const v: number = value || d20.next().value;

    let size: number = 1;
    if ((dangerClass === 1) && (v >= 18)) {
        size += 1;
    }
    if ((dangerClass === 2) && (v >= 14)) {
        size += 1;
    }
    if ((dangerClass === 3) && (v >= 10)) {
        size += 1;
    }

    return {
        animalType,
        size,
    };
}

export default (dangerClass: DangerClass, value?: number): Animal => {
    const v: number = value || d20.next().value;

    const animalFactory = newAnimal(dangerClass)

    if (v <= 1) { return animalFactory('Аллигатор'); }
    if (v <= 2) { return animalFactory('Россомаха'); }
    if (v <= 3) { return animalFactory('Большой паук'); }
    if (v <= 6) { return animalFactory('Медведь'); }
    if (v <= 7) { return animalFactory('Рысь'); }
    if (v <= 8) { return animalFactory('Удав'); }
    if (v <= 9) { return animalFactory('Гигантские крысы'); }
    if (v <= 10) { return animalFactory('Скорпион'); }
    if (v <= 11) { return animalFactory('Ядовитая змея'); }
    if (v <= 14) { return animalFactory('Дикий кабан'); }
    if (v <= 15) { return animalFactory('Дикий пёс'); }
    if (v <= 18) { return animalFactory('Волк'); }
    if (v <= 19) { return animalFactory('Большой слизень'); }
    if (v <= 20) { return animalFactory('Большая летучая мышь'); }
    return undefined;
}
