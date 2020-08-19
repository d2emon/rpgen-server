import {
    Request,
    Response,
} from 'express';
import { OrtGenerator } from '../models/generator';
import { clothingGenerators } from '../lib/generators/clothing';
import { Clothing } from '../lib/generators/clothing/types'

interface BaseClothingSet {
    underwear: Clothing;
    socks: Clothing;
    footwear: Clothing;
    jacket: Clothing;
    accessory: Clothing;
}

interface SwimClothingSet {
    swimwear: Clothing;
}

interface NightClothingSet {
    nightwear: Clothing;
}

interface TopBottomClothingSet extends BaseClothingSet {
    top: Clothing;
    bottom: Clothing;
}

interface FullBodyClothingSet extends BaseClothingSet {
    fullBodyOutfit: Clothing;
}

export type ClothingSet = SwimClothingSet | NightClothingSet | TopBottomClothingSet | FullBodyClothingSet;

const generateSet = (): ClothingSet => {
    const setId = Math.floor(Math.random() * 4);
    if (setId === 0) {
        return {
            swimwear: clothingGenerators.swimwear(),
        };
    } else if (setId === 1) {
        return {
            nightwear: clothingGenerators.nightwear(),
        };
    } else if (setId === 2) {
        return {
            underwear: clothingGenerators.underwear(),
            socks: clothingGenerators.socks(),
            footwear: clothingGenerators.footwear(),
            top: clothingGenerators.top(),
            jacket: clothingGenerators.jacket(),
            bottom: clothingGenerators.bottom(),
            accessory: clothingGenerators.accessory(),
        };
    } else if (setId === 3) {
        return {
            underwear: clothingGenerators.underwear(),
            socks: clothingGenerators.socks(),
            footwear: clothingGenerators.footwear(),
            jacket: clothingGenerators.jacket(),
            fullBodyOutfit: clothingGenerators.fullBodyOutfit(),
            accessory: clothingGenerators.accessory(),
        };
    } else {
        return {
            underwear: clothingGenerators.underwear(),
            socks: clothingGenerators.socks(),
            swimwear: clothingGenerators.swimwear(),
            nightwear: clothingGenerators.nightwear(),
            footwear: clothingGenerators.footwear(),
            top: clothingGenerators.top(),
            jacket: clothingGenerators.jacket(),
            bottom: clothingGenerators.bottom(),
            fullBodyOutfit: clothingGenerators.fullBodyOutfit(),
            accessory: clothingGenerators.accessory(),
        };
    }
}

const clothingGenerator = (): OrtGenerator => {
    const generated: ClothingSet = generateSet();
    return {
        name: 'My Personal Clothing Generator',
        author: 'HatedLove6',
        picture: 'http://i.imgur.com/y784uLO.png',
        description: 'This is my personal go-to clothing generator that randomly generates a variety of articles of ' +
            'clothing.  If you’ve stumbled upon this, you’ll probably not understand what the traits mean unless ' +
            'you’ve done as extensive note-taking as I have, and even then it might still be confusing, but if you ' +
            'can understand it, then go right ahead and use this as much as you would like.  This is just to get me ' +
            'started, and I can change whatever doesn\'t make sense (including clothing items that doesn\'t match ' +
            'the character\'s gender or personality).',
        amount: 1,
        button: 'Shop!',
        phrase: '# CLOTHING:\n'
            + '\n'

            + (('underwear' in generated && generated.underwear)
                ? ('## Underwear:\n'
                    + `The underwear is ${generated.underwear.clothingType}.\n`
                    + `${generated.underwear.item}\n`
                    + `Their favorite decorative pattern is ${generated.underwear.color.name} with ${generated.underwear.pattern.name}.\n`
                    + '\n')
                : '')

            + (('socks' in generated && generated.socks)
                ? ('## Socks:\n'
                    + `The socks are ${generated.socks.clothingType}.\n`
                    + `${generated.socks.item}\n`
                    + `Whatever it is, it\'s primarily ${generated.socks.color.name} with ${generated.socks.pattern.name}.\n`
                    + '\n')
                : '')

            + (('swimwear' in generated && generated.swimwear)
                ? ('## Swimwear:\n'
                    + `The swimwear is ${generated.swimwear.clothingType}.\n`
                    + `${generated.swimwear.item}\n`
                    + `In any case, it\'s ${generated.swimwear.color.name} with ${generated.swimwear.pattern.name} pattern.\n`
                    + '\n')
                : '')

            + (('nightwear' in generated && generated.nightwear)
                ? ('## Nightwear:\n'
                    + `The nightwear is ${generated.nightwear.clothingType}.\n`
                    + `${generated.nightwear.item}\n`
                    + `Whatever it is, it\'s primarily ${generated.nightwear.color.name}, with ${generated.nightwear.pattern.name} pattern.\n`
                    + '\n')
                : '')

            + (('footwear' in generated && generated.footwear)
                ? ('## Footwear:\n'
                    + `The footwear are ${generated.footwear.clothingType}.\n`
                    + `${generated.footwear.item}\n`
                    + `In any case, they are primarily ${generated.footwear.color.name} in color.\n`
                    + '\n')
                : '')

            + (('top' in generated && generated.top)
                ? ('## Tops:\n'
                    + `The top is ${generated.top.clothingType}.\n`
                    + `${generated.top.item}\n`
                    + `Whatever it is, it\'s primarily ${generated.top.color.name}.\n`
                    + '\n')
                : '')

            + (('jacket' in generated && generated.jacket)
                ? ('## Jackets:\n'
                    + `The jacket is ${generated.jacket.clothingType}.\n`
                    + `${generated.jacket.item}\n`
                    + `It\'s primarily a ${generated.jacket.color.name}.\n`
                    + '\n')
                : '')

            + (('bottom' in generated && generated.bottom)
                ? ('## Bottoms:\n'
                    + `The bottoms are ${generated.bottom.clothingType}.\n`
                    + `${generated.bottom.item}\n`
                    + `Whatever it is, it\'s primarily ${generated.bottom.color.name}.\n`
                    + '\n')
                : '')

            + (('fullBodyOutfit' in generated && generated.fullBodyOutfit)
                ? ('## Full Body Outfits:\n'
                    + `The full body outfit is a ${generated.fullBodyOutfit.clothingType}.\n`
                    + `${generated.fullBodyOutfit.item}\n`
                    + `Whatever it is, it\'s primarily ${generated.fullBodyOutfit.color.name}\n`
                    + '\n')
                : '')

            + (('accessory' in generated && generated.accessory)
                ? ('## Accessories:\n'
                    + `The accessory is a ${generated.accessory.clothingType}.\n`
                    + `${generated.accessory.item}\n`
                    + `Whatever it is, it\'s ${generated.accessory.color.name}.`
                    + '')
                : '')
            + '',
    };
}

export const generateClothing = async (req: Request, res: Response) => res.json({
    clothing: clothingGenerator(),
});
