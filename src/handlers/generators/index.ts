import {
    Request,
    Response,
} from 'express';
import * as WORLDS from '../../lib/generators/worlds';
// import NAMES from '../../lib/generators/names/medieval';
// import ALIENS from '../../lib/generators/alien';
// import CLOTHING from '../../lib/generators/clothing/medieval';
import * as REALMS from '../../lib/generators/realm';

export const worldsHandler = async (req: Request, res: Response) => {
    const random = req.query.random
    if (!random) {
        return res.json({
            worlds: await WORLDS.worlds(),
        });
    }

    const count: number = Number(req.query.count) || 1;
    const worlds = []
    for (let i=0; i < count; i++) {
        worlds.push(await WORLDS.generate())
    }
    return res.json({
        worlds,
    });
};

export const aliensHandler = (req: Request, res: Response) => {
    const count: number = Number(req.query.count) || 1;
    const aliens = []
    for (let i=0; i < count; i++) {
        aliens.push({ /* ALIENS.generate() */ })
    }
    return res.json({
        aliens,
    });
};

export const namesHandler = (req: Request, res: Response) => {
    const count: number = Number(req.query.count) || 1;
    const sex: number = Number(req.query.sex);
    const names = [];
    for (let i=0; i < count; i++) {
        names.push({ /* NAMES.generate(sex) */ })
    }
    return res.json({
        names,
    });
};

export const clothingHandler = (req: Request, res: Response) => {
    const count: number = Number(req.query.count) || 1;
    const sex: number = Number(req.query.sex);
    const clothing = []
    for (let i=0; i < count; i++) {
        clothing.push({ /* CLOTHING.generate(sex) */ })
    }
    return res.json({
        count,
        sex,
        clothing,
    });
};

export const charactersHandler = (req: Request, res: Response) => {
    const count: number = Number(req.query.count) || 1;
    const sex: number = Number(req.query.sex);
    const characters = []
    for (let i=0; i < count; i++) {
        const charSex = sex || (Math.floor(Math.random() * 2) + 1);
        characters.push({
            count,
            sex: charSex,
            name: { /* NAMES.generate(charSex), */ },
            clothing: { /* CLOTHING.generate(charSex), */ },
        });
    }
    return res.json({
        characters,
    });
};

export const realmHandler = async (req: Request, res: Response) => res.send(REALMS.generate());
