import {
    Request,
    Response,
} from 'express';
import { OrtGenerator } from '../models/generator';

const choice = (items: string[]) => items[Math.floor(Math.random() * items.length)];

const clothingGenerators = {
    underwear: () => choice([
        'If a bra is chosen, it is a [bra type] bra.\n',
        'If chemise is chosen, it\'s [length] length with [chemise neckline] neckline and [chemise collar] collar.\n',
        'If dressing gown is chosen, it\'s [length] length with [dressing gown sleeve length] length sleeves that\'s [dressing gown style] and has [dressing gown collar] collar.\n',
    ]),
    socks: () => choice([
        'If socks are chosen, they are [sock style].  \n',
        'If stockings are chosen, it\'s [stocking type] [stocking style].  \n',
    ]),
    swimwear: () => choice([
        'If bikini is chosen, it\'s a [fit] bikini, that is a [bikini style] with a [bikini neckline] neckline and is [bikini straps].  The bikini bottoms are [bottom style].  \n',
        'If sarong is chosen, it\'s [sarong style].  \n',
        'If swimming costume is chosen, its [fit] with a [swimming costume neckline] neckline and is/has [swimming costume straps].  \n',
        'If tankini is chosen, it has a [tankini neckline] neckline, and has [bottom style] bottoms.  \n',
    ]),
    nightwear: () => choice([
        'If nudity is chosen, then don\'t read any farther.  \n',
        'If underwear is chosen, look into the underwear section, and don\'t read any farther.  \n',
        'If nightgown is chosen, it\'s a [nightgown style] nightgown with a [nightgown neckline] neckline, and [sleeve length] sleeves.  \n',
        'If pajamas is chosen, it\'s [pajama style], and has a [pajama neckline] neckline.  \n',
        'If shirt and shorts are chosen, then the shirt or shorts are [s+s style].  \n',
    ]),
    footwear: () => choice([
        'If boots are chosen, they\'re [boot height] height [boot type] boots that are [boot style] with [boot toe] toe, [boot heel] heel, and has [boot pattern].  \n',
        'If sandals are chosen, they are [sandal type] sandals with [sandal heel] heel and is [sandal style].  \n',
        'If shoes are chosen, they are [shoe style] [shoe type], with [shoe heel] heel (unless they are flats or are a shoe with a flat heel), [shoe toe] toe, and has a [shoe pattern], unless they are flats or clogs.  \n',
        'If trainers are chosen, they are [trainer style] shoes with a [trainer heel] heel.  \n',
    ]),
    top: () => choice([
        'If blouse was chosen, it is a [blouse style] blouse with a [blouse collar] collar and [blouse sleeve length] [blouse sleeves] sleeves with [blouse pattern].  \n',
        'If cheongsam is chosen, it\'s a [cheongsam sleeve length] sleeved shirt with the fastenings on the [cheongsam style] side, and has a [cheongsam pattern] pattern.  \n',
        'If jumper was chosen, it\'s a [jumper fit] [jumper style] with a [jumper neckline] neckline and [jumper sleeves] sleeves.  \n',
        'If shirt was chosen, it\'s [shirt style], with [shirt sleeve length] sleeves, [shirt collar] collar, and is [shirt pattern].  \n',
        'If sweatshirt was chosen, it has a [sweatshirt neckline] neckline with [sweatshirt sleeves] sleeves.  \n',
        'If T-shirt was chosen, it\'s a [tshirt fit] [tshirt type] shirt with [tshirt neckline] neckline.  \n',
        'If tunic was chosen, it\'s [tunic style], with [tunic sleeve length] sleeves, and [tunic collar] collar.  \n',
        'If turtleneck is chosen, it has [turtleneck] collar.  \n',
        'If vest was chosen, it\'s [vest fit] [vest style] with [vest neckline] neckline and a [vest collar] collar, and is [vest pattern].  \n',
    ]),
    jacket: () => choice([
        'If blazer is chosen, it is a [blazer type] with a [blazer collar] collar, [blazer vents], and is in a [blazer pattern] pattern.  \n',
        'If cardigan is chosen, it is a [cardigan style] with [cardigan pattern].  \n',
        'If coat was chosen, it\'s a [coat style] with a [coat collar] collar.  \n',
        'If jacket was chosen, it\'s a [jacket style] jacket with a [jacket collar] collar.  \n',
    ]),
    bottom: () => choice([
        'If cargos were chosen, it\'s [cargos style].  \n',
        'If jeans were chosen, it\'s [jeans fit] [jeans length] [jeans legs] that\'s [jeans style].  \n',
        'If kilt is chosen, you\'re character\'s favorite way to wear it is in the [kilt style] style.  \n',
        'If shorts were chosen, they are [short style] [short type] [short length] shorts with [shorts pattern] pattern.  \n',
        'If skirt was chosen, it is a [skirt style] [skirt length] [skirt shape] skirt that\'s [skirt pattern].  \n',
        'If trousers were chosen, it\'s [trouser fit] [trouser length] [trouser leg] trousers that\'s [trouser style] and is/has [trouser pattern].  \n',
    ]),
    fullBodyOutfit: () => choice([
        'If ball gown was chosen, it is a [ball gown sleeves] [ball gown neckline] neck dress that\'s [ball gown pattern].  \n',
        'If cheongsam is chosen, it\'s a [cheongsam length] length dress, [cheongsam sleeve length] sleeves with the fastenings on the [cheongsam style] and has a [cheongsam pattern] pattern.  \n',
        'If dress is chosen, it is a[n] [dress style] [dress type] dress with [dress sleeve length] [dress sleeves] sleeves, a [dress neckline] neckline, with a [dress collar] collar, and a[n] [dress length] [dress skirt type] skirt that is/has a[n] [dress pattern].  \n',
        'If tracksuit was chosen, it\'s [tracksuit fit].  \n',
    ]),
    accessory: () => choice([
        'If bag is chosen, it is a [bag type] with [bag style] fastenings, and is/has a[n] [bag pattern].  \n',
        'If belt is chosen, it is a [belt type] type that\'s [belt pattern].  \n',
        'If gloves were chosen, they\'re [glove length] [glove fingers] that\'s [glove pattern].  \n',
        'If hat was chosen, it\'s a [hat type] that\'s [hat pattern].  \n',
        'If jewelry is chosen, it\'s a [jewelry material] [jewelry type].  \n',
        'If neckwear is chosen, it\'s [neckwear].  \n',
        'If a tie or skinny tie was chosen, it\'s usually in a [tie knots] knot.  \n',
        'If scarf was chosen, it\'s [scarf pattern] in a [scarf knots] knot.  \n',
    ]),
};

const clothingGenerator = (): OrtGenerator => ({
    name: 'My Personal Clothing Generator',
    author: 'HatedLove6',
    picture: 'http://i.imgur.com/y784uLO.png',
    description: 'This is my personal go-to clothing generator that randomly generates a variety of articles of clothing.  If you’ve stumbled upon this, you’ll probably not understand what the traits mean unless you’ve done as extensive note-taking as I have, and even then it might still be confusing, but if you can understand it, then go right ahead and use this as much as you would like.  This is just to get me started, and I can change whatever doesn\'t make sense (including clothing items that doesn\'t match the character\'s gender or personality).',
    amount: 1,
    button: 'Shop!',
    phrase: '# CLOTHING:\n'
        + '\n'
        + '## Underwear:\n'
        + 'The underwear is [underwear].\n'
        + clothingGenerators.underwear()
        + 'Their favorite decorative pattern is [color] with [clothing pattern].\n'
        + '\n'
        + '## Socks:\n'
        + 'The socks are [sock type].  \n'
        + clothingGenerators.socks()
        + 'Whatever it is, it\'s primarily [color] with [clothing pattern].\n'
        + '\n'
        + '## Swimwear:\n'
        + 'The swimwear is [swimwear].  \n'
        + clothingGenerators.swimwear()
        + 'In any case, it\'s [color] with a [clothing pattern] pattern.\n'
        + '\n'
        + '## Nightwear:\n'
        + 'The nightwear is [nightwear type].  \n'
        + clothingGenerators.nightwear()
        + 'Whatever it is, it\'s primarily [color], with a[n] [clothing pattern] pattern.\n'
        + '\n'
        + '## Footwear:\n'
        + 'The footwear are [footwear].  \n'
        + clothingGenerators.footwear()
        + 'In any case, they are primarily [color] in color.\n'
        + '\n'
        + '## Tops:\n'
        + 'The top is [tops].  \n'
        + clothingGenerators.top()
        + 'Whatever it is, it\'s primarily [color].\n'
        + '\n'
        + '## Jackets:\n'
        + 'The jacket is [jacket type 1].  \n'
        + clothingGenerators.jacket()
        + 'It\'s primarily a [color].\n'
        + '\n'
        + '## Bottoms:\n'
        + 'The bottoms are [bottoms].  \n'
        + clothingGenerators.bottom()
        + 'Whatever it is, it\'s primarily [color].\n'
        + '\n'
        + '## Full Body Outfits:\n'
        + 'The full body outfit is a [full body].  \n'
        + clothingGenerators.fullBodyOutfit()
        + 'Whatever it is, it\'s primarily [color]\n'
        + '\n'
        + '## Accessories:\n'
        + 'The accessory is a [accessories].  \n'
        + clothingGenerators.accessory()
        + 'Whatever it is, it\'s [color].',
});

export const generateClothing = async (req: Request, res: Response) => res.json({
    clothing: clothingGenerator(),
});
