import {
    Request,
    Response,
} from 'express';
import World, {
    IWorld, IWorldModel,
} from '../models/world';
import GameCharacter, {generate, IGameCharacter, IGameCharacterModel} from '../models/npc';

interface ModelParams {
    count?: number;
    random?: boolean;
    sex?: number;
}

export const names = async (req: Request, res: Response) => {
    const { gender } = req.params;
    return res.json({
        names: await GameCharacter.find({ 'gender.id': gender }),
    });
};

export const clothing = async (req: Request, res: Response) => {
    // const imgPath = `${req.baseUrl}static/images/world`;
    const { gender } = req.params;
    return res.json({
        clothing: await World.find({ 'gender.id': gender }),
    });
};

export const getCharacters = async (req: Request, res: Response) => {
    const count = Number(req.query.count) || 1;
    const genderId = req.query.genderId && `${req.query.genderId}`;
    const characters = [];
    for (let i = 0; i < count; i += 1) {
        const npc = await generate({ genderId });
        characters.push({
            npc,
            clothing: `clothing.generate(${genderId})`,
        });
    }
    return res.json({ characters });
};
