import { d100 } from '../../lib/dice';

export interface Action {
    actionType: string;
}

export default (value?: number): Action => {
    const v: number = value || d100.next().value;

    if (v <= 2 ) { return {
        actionType: 'Спор',
    }; }
    if (v <= 4) { return {
        actionType: 'Купание',
    }; }
    if (v <= 6 ) { return {
        actionType: 'Спасается от преследования',
    }; }
    if (v <= 8 ) { return {
        actionType: 'Связанный с кляпом во рту',
    }; }
    if (v <= 10 ) { return {
        actionType: 'Клеймит животное',
    }; }
    if (v <= 12 ) { return {
        actionType: 'Что-то зарывает, возможно хоронит',
    }; }
    if (v <= 14 ) { return {
        actionType: 'Гонится за кем-то',
    }; }
    if (v <= 16 ) { return {
        actionType: 'Плачет',
    }; }
    if (v <= 18 ) { return {
        actionType: 'Что-то яростно уничтожает',
    }; }
    if (v <= 20 ) { return {
        actionType: 'Роет',
    }; }
    if (v <= 22 ) { return {
        actionType: 'Рисует на земле',
    }; }
    if (v <= 24 ) { return {
        actionType: 'Скучает',
    }; }
    if (v <= 26 ) { return {
        actionType: 'Пьяный',
    }; }
    return undefined;
}

/*
Их действия в данный момент

1d100	Результат
1-2	    Спор
3-4	    Купание
5-6	    Спасается от преследования
7-8	    Связанный с кляпом во рту
9-10	Клеймит животное
11-12	Что-то зарывает, возможно хоронит
13-14	Гонится за кем-то
15-16	Плачет
17-18	Что-то яростно уничтожает
19-20	Роет
21-22	Рисует на земле
23-24	Скучает
25-26	Пьяный
27-28	Готовится к поединку
29-30	Ест
31-32	Устал
33-34	Возбужден
35-36	Сражается
37-38	Ловит рыбу
39-40	Что-то прячет
41-42	Охотится
43-44	Ранен
45-46	Убивает
47-48	Потерялся
49-50	Размышляет
51-52	Разбирает завал на пути
53-54	Нуждается в помощи
55-56	Ведет какие-то переговоры
57-58	Что-то ищет
59-60	Строит планы
61-62	Играет в игру
63-64	Играет на музыкальном инструменте
65-66	Молится
67-68	Что-то покупает
69-70	Спасается от бандитов
71-72	Кого-то расспрашивает
73-74	Кажется сидит в засаде
75-76	Кажется пережил ограбление
77-78	Ремонтирует повозку
79-80	Отдыхает
81-82	Кого-то ищет
83-84	Болен
85-86	Поет
87-88	Курит трубку
89-90	Выкуривает животное из норы
91-92	Свежует тушу
93-94	Что-то внимательно изучает
95-96	Следит
97-98	Тренируется
99-100	Угодил в ловушку

 */
