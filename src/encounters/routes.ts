import {
    Router,
    Request,
    Response,
} from 'express';
import { daily } from './daily';
import {Encounter} from './encounter';
import DayEncounter from './dayEncounter';
import NightEncounter from './nightEncounter';
import getDistance from './distance';
import getReaction from './reaction';
import countryEncounter from './country/encounter';
import { DangerClass } from './country/dangerClass';

const router = Router();

const sortEncounters = (encounters: Encounter[]): Encounter[] => encounters
    .sort((e1: Encounter, e2: Encounter): number => {
        if (e1.time > e2.time) {
            return 1;
        } else if (e1.time < e2.time) {
            return -1;
        } else {
            return 0;
        }
    });

const listEncounters = (count: number, encounterFactory: () => Encounter): Encounter[] => {
    const result: Encounter[] = [];
    for(let id = 0; id < count; id += 1) {
        result.push(encounterFactory());
    }
    return result;
}

router.get('/', (req: Request, res: Response) => res.redirect('/encounters/random'));

router.get(
    '/random',
    (req: Request, res: Response) => {
        const dailyEncounters = daily({
            day: Number(req.query.day) || 1,
            night: Number(req.query.night) || 1,
            savage: !!req.query.savage,
        });
        return res.json({
            day: sortEncounters(listEncounters(
                dailyEncounters.day,
                () => new DayEncounter(),
            )),
            night: sortEncounters(listEncounters(
                dailyEncounters.night,
                () => new NightEncounter(),
            )),
        })
    },
);

router.get(
    '/day',
    (req: Request, res: Response) => res.json({ encounter: new DayEncounter() }),
);

router.get(
    '/night',
    (req: Request, res: Response) => res.json({ encounter: new NightEncounter() }),
);

router.get(
    '/distance/:id',
    (req: Request, res: Response) => res.json({ distance: getDistance(Number(req.params.id)) }),
);

router.get(
    '/reaction/:id',
    (req: Request, res: Response) => res.json({ reaction: getReaction(Number(req.params.id)) }),
);

router.get(
    '/country/:dangerClass',
    (req: Request, res: Response) => res.json({
        encounter: countryEncounter(Number(req.params.dangerClass) as DangerClass),
    }),
);

export default router;
