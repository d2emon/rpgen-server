import {
    Request,
    Response,
} from 'express';
import World, {
    IWorld,
    IWorldModel,
} from '../models/world';

interface ModelParams {
    count?: number;
    random?: boolean;
}

const listModels = async (model: IWorldModel, params: ModelParams = {}): Promise<IWorld[]> => {
    const {
        // count = null,
        random = false,
    } = params;

    if (random) {
        // query = query.orderBy(func.random());
    }

    // const pagination = query.paged(count);
    return model.find({});
};

// @world_api.route("/", methods=['GET'])
export const worldList = async (req: Request, res: Response) => {
    // const imgPath = `${req.baseUrl}static/images/world`;
    return res.json({
        worlds: await listModels(World),
    });
};

// @world_api.route("/aliens", methods=['GET'])
export const aliens = async (req: Request, res: Response) => {
    // const imgPath = `${req.baseUrl}static/images/world`;
    return res.json({
        aliens: await listModels(World),
    });
};
