export interface Reaction {
    npc: string,
    enemy: string,
    behavior: string;
}

export default (value: number): Reaction => {
    if (value === 2) {
        return {
            npc: 'Враждебная',
            enemy: 'Атака',
            behavior: 'Ни на что не соглашается, атакует при малейшей угрозе (с его точки зрения).',
        };
    } else if (value <= 5) {
        return {
            npc: 'Не дружественная',
            enemy: 'Готовность к атаке',
            behavior: 'Ни на что не соглашается, стоит на своем.',
        };
    } else if (value <= 8) {
        return {
            npc: 'Нейтральная',
            enemy: 'Нельзя сказать точно',
            behavior: 'Сомневается. Можно попробовать ещё раз, с лучшим предложением',
        };
    } else if (value <= 11) {
        return {
            npc: 'Безразличная',
            enemy: 'Вы не вызываете его интереса',
            behavior: 'Допускает возможность',
        };
    } else if (value === 20) {
        return {
            npc: 'Дружелюбная',
            enemy: 'Эй, давай дружить',
            behavior: 'Он согласен',
        };
    }
    return undefined;
};
