import { generateColor } from './colors';
import { choice } from './utils';
import { generatePattern } from './patterns';
import { Clothing } from './types';
import underwear from './underwear';
import swimwear from './swimwear';
import nightwear from './nightwear';

export const clothingGenerators = {
    underwear,
    socks: (): Clothing => ({
        clothingType: '[sock type]',
        item: choice([
            'If socks are chosen, they are [sock style].\n',
            'If stockings are chosen, it\'s [stocking type] [stocking style].\n',
        ]),
        color: generateColor(),
        pattern: generatePattern(),
        name: '',
    }),
    swimwear,
    nightwear,
    footwear: (): Clothing => ({
        clothingType: '[footwear]',
        item: choice([
            'If boots are chosen, they\'re [boot height] height [boot type] boots that are [boot style] with [boot toe] toe, [boot heel] heel, and has [boot pattern].\n',
            'If sandals are chosen, they are [sandal type] sandals with [sandal heel] heel and is [sandal style].\n',
            'If shoes are chosen, they are [shoe style] [shoe type], with [shoe heel] heel (unless they are flats or are a shoe with a flat heel), [shoe toe] toe, and has a [shoe pattern], unless they are flats or clogs.\n',
            'If trainers are chosen, they are [trainer style] shoes with a [trainer heel] heel.\n',
        ]),
        color: generateColor(),
        // pattern: generatePattern(),
        name: '',
    }),
    top: (): Clothing => ({
        clothingType: '[tops]',
        item: choice([
            'If blouse was chosen, it is a [blouse style] blouse with a [blouse collar] collar and [blouse sleeve length] [blouse sleeves] sleeves with [blouse pattern].\n',
            'If cheongsam is chosen, it\'s a [cheongsam sleeve length] sleeved shirt with the fastenings on the [cheongsam style] side, and has a [cheongsam pattern] pattern.\n',
            'If jumper was chosen, it\'s a [jumper fit] [jumper style] with a [jumper neckline] neckline and [jumper sleeves] sleeves.\n',
            'If shirt was chosen, it\'s [shirt style], with [shirt sleeve length] sleeves, [shirt collar] collar, and is [shirt pattern].\n',
            'If sweatshirt was chosen, it has a [sweatshirt neckline] neckline with [sweatshirt sleeves] sleeves.\n',
            'If T-shirt was chosen, it\'s a [tshirt fit] [tshirt type] shirt with [tshirt neckline] neckline.\n',
            'If tunic was chosen, it\'s [tunic style], with [tunic sleeve length] sleeves, and [tunic collar] collar.\n',
            'If turtleneck is chosen, it has [turtleneck] collar.\n',
            'If vest was chosen, it\'s [vest fit] [vest style] with [vest neckline] neckline and a [vest collar] collar, and is [vest pattern].\n',
        ]),
        color: generateColor(),
        // pattern: generatePattern(),
        name: '',
    }),
    jacket: (): Clothing => ({
        clothingType: '[jacket type 1]',
        item: choice([
            'If blazer is chosen, it is a [blazer type] with a [blazer collar] collar, [blazer vents], and is in a [blazer pattern] pattern.\n',
            'If cardigan is chosen, it is a [cardigan style] with [cardigan pattern].\n',
            'If coat was chosen, it\'s a [coat style] with a [coat collar] collar.\n',
            'If jacket was chosen, it\'s a [jacket style] jacket with a [jacket collar] collar.\n',
        ]),
        color: generateColor(),
        // pattern: generatePattern(),
        name: '',
    }),
    bottom: (): Clothing => ({
        clothingType: '[bottoms]',
        item: choice([
            'If cargos were chosen, it\'s [cargos style].\n',
            'If jeans were chosen, it\'s [jeans fit] [jeans length] [jeans legs] that\'s [jeans style].\n',
            'If kilt is chosen, you\'re character\'s favorite way to wear it is in the [kilt style] style.\n',
            'If shorts were chosen, they are [short style] [short type] [short length] shorts with [shorts pattern] pattern.\n',
            'If skirt was chosen, it is a [skirt style] [skirt length] [skirt shape] skirt that\'s [skirt pattern].\n',
            'If trousers were chosen, it\'s [trouser fit] [trouser length] [trouser leg] trousers that\'s [trouser style] and is/has [trouser pattern].\n',
        ]),
        color: generateColor(),
        // pattern: generatePattern(),
        name: '',
    }),
    fullBodyOutfit: (): Clothing => ({
        clothingType: '[full body]',
        item: choice([
            'If ball gown was chosen, it is a [ball gown sleeves] [ball gown neckline] neck dress that\'s [ball gown pattern].\n',
            'If cheongsam is chosen, it\'s a [cheongsam length] length dress, [cheongsam sleeve length] sleeves with the fastenings on the [cheongsam style] and has a [cheongsam pattern] pattern.\n',
            'If dress is chosen, it is a[n] [dress style] [dress type] dress with [dress sleeve length] [dress sleeves] sleeves, a [dress neckline] neckline, with a [dress collar] collar, and a[n] [dress length] [dress skirt type] skirt that is/has a[n] [dress pattern].\n',
            'If tracksuit was chosen, it\'s [tracksuit fit].\n',
        ]),
        color: generateColor(),
        // pattern: generatePattern(),
        name: '',
    }),
    accessory: (): Clothing => ({
        clothingType: '[accessories]',
        item: choice([
            'If bag is chosen, it is a [bag type] with [bag style] fastenings, and is/has a[n] [bag pattern].\n',
            'If belt is chosen, it is a [belt type] type that\'s [belt pattern].\n',
            'If gloves were chosen, they\'re [glove length] [glove fingers] that\'s [glove pattern].\n',
            'If hat was chosen, it\'s a [hat type] that\'s [hat pattern].\n',
            'If jewelry is chosen, it\'s a [jewelry material] [jewelry type].\n',
            'If neckwear is chosen, it\'s [neckwear].\n',
            'If a tie or skinny tie was chosen, it\'s usually in a [tie knots] knot.\n',
            'If scarf was chosen, it\'s [scarf pattern] in a [scarf knots] knot.\n',
        ]),
        color: generateColor(),
        // pattern: generatePattern(),
        name: '',
    }),
};
