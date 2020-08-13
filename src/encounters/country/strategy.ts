import { d100 } from '../../lib/dice';

export interface Strategy {
    strategyType: string;
}

export default (value?: number): Strategy => {
    const v: number = value || d100.next().value;

    if (v <= 25) { return {
        strategyType: 'Яростная атака',
    }; }
    if (v <= 45) { return {
        strategyType: 'Дистанционный бой',
    }; }
    if (v <= 65) { return {
        strategyType: 'Атака из укрытия',
    }; }
    if (v <= 80) { return {
        strategyType: 'Ловушки',
    }; }
    if (v <= 85) { return {
        strategyType: 'Падающая сверху сеть',
    }; }
    if (v <= 90) { return {
        strategyType: 'Падающие сверху камни и т.п.',
    }; }
    if (v <= 95) { return {
        strategyType: 'Гранаты и взрывы',
    }; }
    if (v <= 100) { return {
        strategyType: 'Яд',
    }; }
    return undefined;
}
