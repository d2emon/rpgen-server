import * as generators from './generators';

interface World {
    id: number;
    title: string;
    subtitle: string;
    src: string;
}

const images = [
    'house.jpg',
    'road.jpg',
    'plane.jpg',
    'sunshine.jpg'
];

const dataLoader = new generators.DataLoader('/app/data/worlds.json');

export const generate = (): World => ({
    id: 0,
    title: dataLoader.generate(),
    subtitle: '1,000 miles of wonder',
    src: `/static/images/${generators.generate(images)}`,
});

export const worlds = (): World[] => {
    const res: World[] = [];
    for (let id: number = 0; id < dataLoader.items.length; id++) {
        res.push({
            id,
            title: dataLoader.item(id),
            subtitle: '1,000 miles of wonder',
            src: `/static/images/${generators.generate(images)}`,
        });
    }
    return res
};
