import { d100 } from '../../lib/dice';

export interface Danger {
    dangerType: string;
}

export default (value?: number): Danger => {
    const v: number = value || d100.next().value;

    if (v <= 20) { return {
        dangerType: 'Ловушка',
    }; }
    if (v <= 35) { return {
        dangerType: 'Плохая вода',
    }; }
    if (v <= 50) { return {
        dangerType: 'Расселина в леднике',
    }; }
    if (v <= 65) { return {
        dangerType: 'Страшная буря',
    }; }
    if (v <= 75) { return {
        dangerType: 'Тепловой удар',
    }; }
    if (v <= 80) { return {
        dangerType: 'Землетрясение',
    }; }
    if (v <= 85) { return {
        dangerType: 'Лесной пожар',
    }; }
    if (v <= 90) { return {
        dangerType: 'Ядовитые испарения',
    }; }
    if (v <= 95) { return {
        dangerType: 'Плывун',
    }; }
    if (v <= 100) { return {
        dangerType: 'Камнепад',
    }; }
    return undefined;
}
