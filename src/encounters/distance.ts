import roll from '../lib/dice';

export interface Distance {
    description: string,
    distance: number;
}

export default (value: number): Distance => {
    if (value === 1) {
        return {
            description: 'Нос к носу (ближний бой возможен с ходу)',
            distance: 0,
        };
    } else if (value === 2) {
        return {
            description: 'На расстоянии нескольких шагов (минимальный предел дистанционного боя без штрафов)',
            distance: 10,
        };
    } else if (value === 3) {
        return {
            description: 'Среднее (на дистанции прямого выстрела)',
            distance: roll(1, 6) * 10,
        };
    } else if (value === 4) {
        return {
            description: 'Дальнее (вне прямой видимости)',
            distance: roll(2, 6, 6) * 10,
        };
    } else if (value === 5) {
        return {
            description: 'Сверхдальнее (вне прямой видимости)',
            distance: roll(2, 6, 12) * 10,
        };
    } else if (value === 6) {
        return {
            description: 'На пределе видимости (10 минут бодрым шагом, вне прямой видимости)',
            distance: 1000,
        };
    }
    return undefined;
};
