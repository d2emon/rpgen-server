import { Clothing, ClothingGenerator } from '../types';
import { choice } from '../utils';

import { Bikini } from './bikini';
import { Sarong } from './sarong';
import { SwimmingCostume } from './swimmingCostume';
import { Tankini } from './tankini';

const items: ClothingGenerator[] = [
    new Bikini('bikini'),
    new Sarong('sarong'),
    new SwimmingCostume('costume'),
    new Bikini('shorts'),
    new Tankini('tankini'),
    new Bikini('trunks'),
]

export default (): Clothing => choice(items).generate();
