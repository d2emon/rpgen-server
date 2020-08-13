import {
    Router,
    Request,
    Response,
} from 'express';

const router = Router();

router.get(
    '/',
    (req: Request, res: Response) => res.json({
        encounters: {
            index: '/encounters',
        },
    }),
);

export default router;
