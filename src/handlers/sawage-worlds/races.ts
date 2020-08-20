import {
    Request,
    Response,
} from 'express';
import RACES from '../../lib/savage-worlds/data/races';

export const listRaces = async (req: Request, res: Response) => res.json({
    races: Object.values(RACES).map(race => ({
        raceId: race.raceId,
        name: race.name,
        description: race.description,
        traits: race.traits.map(trait => ({
            traitId: trait.traitId,
            name: trait.name,
            description: trait.description,
        })),
    })),
});
