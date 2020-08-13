import { d100 } from '../../lib/dice';

export interface Ambush {
    ambushType: string;
}

export default (value?: number): Ambush => {
    const v: number = value || d100.next().value;

    if (v <= 30) { return {
        ambushType: 'Бандиты',
    }; }
    if (v <= 40) { return {
        ambushType: 'Военный патруль',
    }; }
    if (v <= 50) { return {
        ambushType: 'Преступники',
    }; }
    if (v <= 60) { return {
        ambushType: 'Головорезы',
    }; }
    if (v <= 70) { return {
        ambushType: 'Городская стража',
    }; }
    if (v <= 75) { return {
        ambushType: 'Цыгане',
    }; }
    if (v <= 80) { return {
        ambushType: 'Пираты',
    }; }
    if (v <= 85) { return {
        ambushType: 'Снайпер',
    }; }
    if (v <= 90) { return {
        ambushType: 'Охотник за головами',
    }; }
    if (v <= 95) { return {
        ambushType: 'Убийца',
    }; }
    if (v <= 100) { return {
        ambushType: 'Мастер убийца',
    }; }
    return undefined;
}
