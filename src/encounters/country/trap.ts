import { d100 } from '../../lib/dice';

export interface Trap {
    trapType: string;
}

export default (value?: number): Trap => {
    const v: number = value || d100.next().value;

    if (v <= 25) { return undefined; }
    if (v <= 50) { return {
        trapType: 'Путь заблокирован',
    }; }
    if (v <= 65) { return {
        trapType: 'Стратегическая точка',
    }; }
    if (v <= 75) { return {
        trapType: 'Нельзя пользоваться транспортом',
    }; }
    if (v <= 80) { return {
        trapType: 'Маскировка',
    }; }
    if (v <= 85) { return {
        trapType: 'Засланный казачок',
    }; }
    if (v <= 90) { return {
        trapType: 'Ранение/болезнь',
    }; }
    if (v <= 95) { return {
        trapType: 'Заманить в глушь',
    }; }
    if (v <= 99) { return {
        trapType: 'Стихийное бедствие',
    }; }
    if (v <= 100) { return {
        trapType: 'Яма-ловушка',
    }; }
    return undefined;
}
