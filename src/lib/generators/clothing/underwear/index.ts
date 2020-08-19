import {Clothing, ClothingGenerator} from '../types';
import { choice } from '../utils';
import { Bra } from './bra';
import { Chemise } from './chemise';
import { DressingGown } from './dressingGown';

const items: ClothingGenerator[] = [
    new Bra('bikini panties'),
    new Bra('boxers'),
    new Bra('bra'),
    new Bra('briefs'),
    new Chemise('camisole'),
    new Chemise('chemise'),
    new DressingGown('dressing gown'),
    new Bra('knickers'),
    new Bra('lingerie'),
    new Bra('thong'),
    new Chemise('vest underwear'),
];

export default (): Clothing => choice(items).generate();
