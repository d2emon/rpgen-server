import { d100 } from '../../lib/dice';

export interface Bounty {
    bountyType: string;
}

export default (value?: number): Bounty => {
    const v: number = value || d100.next().value;

    if (v <= 25) { return {
        bountyType: 'Еда',
    }; }
    if (v <= 40) { return {
        bountyType: 'Обычная добыча',
    }; }
    if (v <= 55) { return {
        bountyType: 'Улика / указатель',
    }; }
    if (v <= 70) { return {
        bountyType: 'Кошелек',
    }; }
    if (v <= 85) { return {
        bountyType: 'Мертвое тело',
    }; }
    if (v <= 92) { return {
        bountyType: 'Природное ископаемое',
    }; }
    if (v <= 97) { return {
        bountyType: 'Яд',
    }; }
    if (v <= 98) { return {
        bountyType: 'Вход в подземелье',
    }; }
    if (v <= 99) { return {
        bountyType: 'Именно то, что нужно!',
    }; }
    if (v <= 100) { return {
        bountyType: 'Необычная добыча',
    }; }
    return undefined;
}
