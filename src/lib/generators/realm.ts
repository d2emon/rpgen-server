import { generate as generateItem } from './generators';

interface BaseDataItem {
    id: number;
    text: string;
}
interface WorldType extends BaseDataItem{
    negative: boolean;
}
interface WorldDescription extends BaseDataItem{
    negative: boolean;
}

type DataItem = BaseDataItem | WorldType | WorldDescription;
type ItemChecker = (item: DataItem) => boolean;
type ItemGenerator = (itemChecker?: ItemChecker) => DataItem;

const textData: { [key: string]: string[] } = {
    nm1: [
        "advance", "cautiously venture", "force", "go", "move",
        "pass", "progress", "push", "step", "stride",
        "travel", "venture", "walk",
    ],
    nm2: [
        "alluring", "animated", "beckoning", "brilliant", "broad",
        "dark", "delicate", "eerie", "enticing", "faded",
        "faint", "familiar", "florid", "glistening", "grand",
        "grim", "hefty", "impressive", "light", "lively",
        "menacing", "narrow", "newly created", "ominous", "pleasing",
        "prismatic", "strange", "temporary", "tempting", "unfamiliar",
        "untried", "vibrant", "vigorous", "vivid", "weak",
    ],
    nm3: [
        "hidden among the trees", "locked in a forgotten basement", "in this sacred temple",
        "in this desolate fortress", "in this secured room",

        "part of a greater altar", "that once looked like a regular door", "hidden behind a waterfall",
        "at the end of a long cave system", "at the top of a dormant volcano",

        "hidden in plain sight in an alley", "formed by two bended trees", "that looked like a small pond before",
        "at the top of a pyramid", "resembling a star gate",

        "resembling a campfire", "at the end of a hallway", "seemingly disguised as a cave entrance",
        "hidden high atop a mountain among a layer of clouds", "part of long forgotten ruins",

        "revealed only by fire", "revealed only during a full moon", "revealed only with the right elements",
        "previously locked behind intricate locks and traps", "hidden in plain sight in a public park",
    ],
    nm4: [
        "a depressing", "a disconcerting", "a disturbing", "a foreboding", "a frightening",
        "a gloomy", "a hostile", "a most upsetting", "a sinister", "a taxing",
        "a vexing", "a worrisome", "an alarming", "an inhospitable", "an ominous",
        //
        "a bustling", "a captivating", "a charming", "a dynamic", "a fascinating",
        "a marvelous", "a pleasant", "a surprising", "a vibrant", "a vigorous",
        "a vivid", "a wonderful", "an enchanting", "an energetic", "an engaging",
    ],
    nm5: [
        "The air is thick with smoke, obstructing your vision beyond a few meters",
        "A thick fog hangs in the air and obstructs your vision beyond a few yards",
        "The air stings your eyes and skin and you cough as each breath burns your lungs",
        "Thick, dark clouds block out any light from above and cover the lands in gloomy shadows",
        "The air is dry and hot, bright light blinds you and you can feel your lungs burn with every breath",

        "The air is uncomfortable humid and hot, causing you to burst out in sweat immediately",
        "Gravity is far stronger here and you can feel its pull with every step you take. It's exhausting",
        "The first thing you see is your breath in the air, but freezing air soon chills you to your core",
        "Clouds of dust fill the air, it stings your eyes and lungs with every breath and obstructs your vision",
        "The ground is covered in small holes and marks caused by acid rains, fortunately it's not raining yet",

        "A powerful wind nearly lifts you off of the ground and rain barrages down, freezing you within minutes",
        "You're up to your knees in warm, murky water. The air is hot and humid, causing you to sweat almost immediately",
        "You find yourself in almost complete darkness, were it not for the echoes you wouldn't even know you were underground",
        "Light as a feather you gently float above the surface, hanging gently in the thick smog that fills the air",
        "With each step you take you slide forward a little more. Ice covers everything, soon it might even cover you",

        "Smoke bellows out of openings in the ground, creating a thick layer of clouds that shrouds the land in shadows",
        "The land is burning, literally. Fires wreak havoc to everything that's even remotely alive, which by now is very little",
        "The ground beneath your feet is cracked and dry and the air is hot and dusty. You can feel your skin begin to sweat and your lungs burn with each breath",
        "Rocks cover virtually every surface you can see, which makes traversing this landscape tricky and dangerous",
        "Lightning strikes close to you and then again and again. The sky roars as an eternal thunder storm dominates this realm",
        //
        "A lush landscape full of color meets your eyes. The air is warm and humid, but pleasantly so",
        "You gently float above the surface, gravity is not strong here at all. The landscape too tries to reach for the sky",
        "Snowflakes gently glide by, they cover the entire landscape in a thick layer of snow and a silence has taken hold of the air",
        "A luminous world meets your eyes. Everything's glowing in some shape or form, the animals, the plants, even some of the rocks",
        "The first thing you notice is a barrage of scents. Pleasant and calming, this world of scents is unlike any other",

        "You can hear water, lots and lots of water. Rivers roar and waterfalls tumble down towering mountain sides",
        "Lush flower petals drift down the wind and the sounds of unseen animals fills the air",
        "A dark world meets you, but as your eyes adjust you begin to see a world of bio-luminescence. Animals and plants glowing in the dark",
        "A gentle breeze caresses your face as the rays of a blueish sun warm your skin. It's occasionally blocked by a floating island, drifting by",
        "The light of a giant moon illuminates this world and bathes the lush landscape in a blueish light",

        "You find yourself face to face with enormous statues carved out of the mountains themselves. Carvings of beings you've never seen before",
        "Waterfalls pour into the lagoon you're standing in from high above. Light from the orange sun peeks over and warms you gently",
        "A tranquil world welcomes you. Calm, warm and gentle. The lush ground is all the more enticing thanks to the stronger gravity pulling you down",
        "You feel yourself able to lift off of the ground thanks to this world's gravity. Ready to explore the many islands drifting in the sky",
        "A soothing world welcomes you. Warm air touches you gently from the lush and thick forests in front of you",

        "Wet, grassy ground squishes beneath your feet. This world is rich in life, though nothing is like anything you've seen before",
        "You find yourself atop a mountain, watching over a vast jungle-like forest full of never before seen plants. Some giant, some luminescent and some even floating in the air",
        "You look upon a vast landscape of huge mountains, many of them have waterfalls that flow down and meet in a giant river flowing gently in your direction",
        "A massive, oddly colored lake reflects the even more peculiarly colored mountains in the distance. It's peaceful and quiet here",
        "A world of lights and colors meets your eye. Thousands of flowers and other lifeforms seem to glow in the greenish sun of this world"
    ],
    nm6: [
        "A foul smell fills your nostrils, and you immediately begin to feel nauseous",
        "It's certainly not a pleasant world to live in, though some beings seem to manage",
        "The terrain's treacherous to walk on. Who knows what dangers await to those who fall",
        "A world of potential awaits, but in this case it seems like a potential for danger and death",
        "Who knows how long you could last in this world, probably not for long",

        "A strange energy hangs in the air and makes the hairs on your arms rise",
        "Low, ominous sounds can be heard in the distance or at least you hope it's in the distance",
        "Shrieks and yelps are heard all around you, but it's impossible to find their sources",
        "The sound of thick bubbles escaping some form of mud or viscous liquid can be heard all around you",
        "You could've sworn something touched your leg just now, perhaps to inspect you or to get a taste",

        "Uncertainty surrounds you and it's not the thrilling uncertainty of exploration, but a dreadful fear","You feel watched even though you can't see anything watching you","The light plays tricks on your eyes as shadows from a new landscape make your imagination go wild","Something in the air is altering your mind, but at least it makes this world seem more pleasant","It's hard to take everything in in such a harsh environment, but there's so much to see","Yet there's something strangely beautiful about this isolated world of dismay","Strange sounds erupt from behind you, perhaps two beings fighting each other or a collapsing landscape","Your immediate instinct is to seek shelter, to find some form of relief from this atmosphere","You feel nauseous, there must be something in the air, but who knows what it is","Each step you take is a burden on your very being, this world is clearly not meant for you","A wave of nostalgia hits you, somehow you feel at home in this strange world","Any fears you had before you entered the portal are now washed away by this tranquil world","A sense of calm takes over as you take in the gorgeous sights before your very eyes","A sense of adventure take hold of you. This world is rich with opportunities","Immediately your mind begins to wonder what's behind that hill or what lives atop that twisty tree","You can't help but wonder who or what inhabits this world and you can't wait to find out","You feel free, free to explore what lives in that river, what hides in that cave or where that forest ends","This world erupts with life as sounds of all sorts of beings or perhaps the land itself fills the air","Life here looks nothing like what you're used to. Different colors, different scents, but all very pleasing","A new world has literally opened up to you, vast expanses of new life ready to be explored. You can't wait","A barrage of the senses takes over as you begin to take in every element of this world you can","This world seems to calm. Whether this is true or just appearances remains to be seen, but for now you're hopeful","This world is different from your own, incredibly different. But despite the differences it feels familiar","A sense of relief takes over as you realize this world might be safe to venture into further","You know it's only been a short while, but this world feels very promising. Pleasant and seemingly non-hostile","It's still best to tread cautiously, it is a new world after all, but so far so good","A sense of calm takes hold of you. Perhaps this world is what you were looking for or maybe something in the air is affecting your mind","You have to keep reminding yourself to not let this astonishing world lull you into a false sense of security","It's a world beyond anything you had imagined. There's beauty in every corner, calm in every moment","You wonder if you can trust your senses, surely a world couldn't be as seemingly pleasant as this one"
    ],
    nm7: [
        "Despite the uncomfortable atmosphere", "Even though this world's harsh", "Even with these rough conditions",
        "Regardless of the horrible conditions", "In spite of the treacherous landscape",
        //
        "Largely due to these conditions", "Because of this rough environment", "Due to these dreadful surroundings",
        "Because of these horrible conditions", "It's because of this awful landscape",
        //
        "The conditions in this world are excellent", "The landscape is astonishing",
        "A seemingly pristine landscape awaits you", "A spectacular world welcomes you",
        "Perfect conditions in a perfect world",
        //
        "Much remains to be discovered here", "It's a world of hidden mysteries",
        "Who knows what secrets this world holds", "Uncharted territory as far as the eye can see",
        "There's so much to learn in this world",
    ],
    nm8: [
        " you don't feel like you're in danger", " you feel relatively safe at the moment",
        " you get the feeling you're not in immediate danger", " you're at ease and you feel secure in this world",
        //
        " you don't feel a sense of dread or danger",

        " you feel like you're constantly in danger", " you can't help but feel danger lurks around every corner",
        " you feel slightly panicked as danger hides everywhere",
        " you can't escape the feeling of dread that your life is in danger", " you feel exposed and in jeopardy",
        //
        " and you can't wait to explore it all", " and a sense of excitement takes hold of you",
        " and a childish curiosity takes over your mind", " and it is all yours to explore",
        " and a sea of time to explore it in",
        //
        ", but not everything that's hidden may be as pleasant as this world",
        ", but now is not the time to get complacent and reckless",
        ", but safety still comes first, it is a strange new world after all",
        ", but it's important to remember that danger can lurk anywhere", ", but some things may be best left a secret",
    ],
    nm9: ["definitely inhospitable","no picnic","no walk in the park","no easy undertaking","undeniably hostile","certainly unwelcoming","indubitably threatening","precarious beyond a doubt","clearly treacherous","unmistakably menacing","definitely gentle","undeniably pleasant","certainly benign","indubitably pleasing","clearly manageable","peaceful beyond a doubt","kind to you for sure","smooth sailing all across","an easy undertaking","a paradise"],
    nm10: [", but for now you should be able to handle it",", but there are no direct threats you have to deal with",", but it's a danger you can handle",", but at the very least you should be able to survive for a week",", but if you're cautious it should be manageable",", but with so much to discover you can't help but explore",", but with great risks come great rewards",", but even so you still fancy your chances in this world",", but you reckon you'll be fine as long as you're cautious",", so all you need is a healthy dose of caution and you should be fine",", you should be perfectly safe as long as you use common sense",", as long as you avoid accidents your journey should be amazing"," and the only real obstructions are your own abilities"," and there's nothing that could ruin this experience",", with an optimistic sense of curiosity and a healthy dose of common sense you'll be good to go",", but looks can be deceiving at times",", but your own world has plenty of pitfalls, there's no reason this one won't either",", but now is not the moment to throw caution in the wind",", but you've caught but a glimpse of what this world has to offer",", but time will tell how true this is"],

    nm11: ["In the distance","Nearby","In the far-off distance","Close around you","Around you","All around","All around you","Not far into the distance","Far away","Fairly nearby","Close to your proximity","In the nearby proximity","Far behind you","Off to the side","Far off to the right","Far off to the left"],
    nm12: ["hear the sounds","hear screams","hear whistles and sounds","hear songs and growls","hear growls and grunts","hear songs and shrieks","feel the presence","feel air vibrations","smell what must be the scents","smell the sweet scents","smell the pungent odors","smell traces ","see the silhouettes","see countless colors","see parts","vaguely see silhouettes","see strange shapes","see bits and pieces"],
    nm13: ["creatures you've never seen before","beings you could've only dreamed of","creatures never before seen by anyone of your kind","beings beyond any of your own world","the most bizarre looking creatures","the strangest creatures you could've imagined","creatures not too different from the ones you know","odd looking creatures to say the least","the most peculiar beings you've ever encountered","somehow somewhat familiar creatures","eerily familiar beings","creatures of a literally and figuratively different world","creatures myths and legends are made of","the type of creatures they write stories about","creatures stranger even than those of legends of old","creatures almost disappointingly similar to those you know","creatures nobody could've ever imagined","beings literally and figuratively beyond your world","beings so strange you almost feel like you're dreaming","beings you thought only existed in the minds of dreamers"],
    nm14: ["While they seem docile enough","Although they seem perfectly friendly","While they seem curious and amicable","Even though they seem harmless and curious","While they show you little interest","Despite barely giving you any attention","Despite looking friendly and docile","Even though they seem good natured","While they appear to be docile and safe","Even though they don't seem to be bothered by your presence","They seem to have taken notice of your presence","Some have noticed you, and their interest has peaked","Some eye you up in a way that makes you uncomfortable","They keep an eye on you in a predatory manner","Some keep an eye on you, possibly with the intent to respond to whatever you do","Not all the creatures seem content with your presence","Instinctively, some creatures treat you with fear or ferocity","Many of them keep their distance from you","Some see you as a strange and thus hostile being","There's definitely some hostility going on"],
    nm15: ["you realise it's probably best to keep your distance","you keep your distance just to be safe","you try to avoid getting too close","better safe than sorry, so you keep a good distance","you realise it's best not to get too close","you keep your guard up just to be safe","the cautious path would be the best one","now would be the time to be very cautious","the time to take risks is definitely not now","you keep an eye out for them just to be sure","you keep your distance and an eye on them","you make sure they don't get any closer","for now you simply keep your distance"],
    nm16: ["It's clear there are","You can make out","You manage to find traces of","You see traces of","There are traces of","You easily spot","It's obvious there are","There are definitely","You manage to spot","You can see"],
    nm17: [
        "aquatic", "bulky", "chunky", "crawling", "enormous",
        "feathered", "fluffy", "flying", "gliding", "hairy",

        "huge", "lean", "muscular", "scaly", "sliding",
        "slithering", "small", "thin", "tiny",
    ],
    nm18: ["You'll have to gather some supplies from the world around you","You're glad you brought plenty of supplies","With some rationing your supplies should last for a while","This world seems to offer plenty to replenish most supplies","You decide to make some final preparations around the portal entrance","You decide to create a makeshift back-up camp around the portal","You create an easy to spot landmark so you can find your way back more easily","Strange as this world may be, you feel confident enough your supplies will last","You can feel your excitement rising","You make sure to check all your gear and supplies one last time","With a final check of your supplies you ready yourself","With everything sorted you look around one more time","You know you've got everything sorted and prepared","You look at the sky as if to try and figure out the time","With your eyes on the horizon you move forward"],
    nm19: ["you're about to set upon the adventure of a lifetime","discovery after discovery is waiting to be made","a whole new world will unfold before your very eyes","you're about to set foot upon uncharted terrain","a realm of mysteries awaits you, for better or worse","there's a world of wonders at your finger tips","you set upon a world beyond your imagination","you take your first steps into a world unknown","you begin your life as a wanderer, explorer, and adventurer in this new world","you begin a journey unlike any other"],
    nm20: [
        "some solid planning", "a few back-up plans", "a good amount of courage", "a great sense of adventure",
        "a curious mind",

        "some resourcefulness", "a bit of tenacity", "perseverance", "a little creative thinking", "a bag of tricks",

        "a good sense of direction", "an eye for details", "some scouting experience", "self-defense skills",
        "a cautious nature",

        "a bit of luck",
    ],

    nm21: ["you should be able to explore this realm for all it has to offer","you know you'll be able to make the most of this adventure","you know this is a chance you won't let slip by","you might actually end up being able to call this place home","you know you can fulfill this opportunity with everything you have","you'll be able to make the most of this most wonderful opportunity","you know you can charter this uncharted land","you'll be able to make the most of this once in a lifetime opportunity","you'll be able to create the first foothold in this world","you'll be able to register this world for those in your own"],
};
const itemMapper = (key: string) => (text: string, id: number): DataItem => {
    if (key === 'nm4') {
        return {
            id,
            text,
            negative: id < 15,
        };
    }
    if (key === 'nm5') {
        return {
            id,
            text,
            negative: id <= 19,
        };
    }
    if (key === 'nm7') {
        return {
            id,
            text,
            // negative: id < 15,
        };
    }
    if (key === 'nm8') {
        return {
            id,
            text,
            // negative: id < 15,
        };
    }
    return {
        id,
        text,
    };
};
const data: { [key: string]: DataItem[] } = Object.keys(textData).reduce(
    (result, key) => ({
        ...result,
        [key]: textData[key].map(itemMapper(key)),
    }),
    {},
);

const createItemGenerator = (items: any[]): ItemGenerator => (itemChecker?: ItemChecker) => {
    let generated = generateItem(items);
    while (itemChecker && !itemChecker(generated)) {
        generated = generateItem(items);
    }
    return generated;
};

export const generate = (): string => {
    const itemGenerators: { [key: string]: ItemGenerator} = {
        rnd1: createItemGenerator(data.nm1),
        rnd2: createItemGenerator(data.nm2),
        rnd3: createItemGenerator(data.nm3),
        rnd4: createItemGenerator(data.nm4),
        rnd5: createItemGenerator(data.nm5),
        rnd6: createItemGenerator(data.nm6),
        rnd7: createItemGenerator(data.nm7),
        rnd8: createItemGenerator(data.nm8),
        rnd9: createItemGenerator(data.nm9),
        rnd10: createItemGenerator(data.nm10),

        rnd11: createItemGenerator(data.nm11),
        rnd12: createItemGenerator(data.nm12),
        rnd13: createItemGenerator(data.nm13),
        rnd14: createItemGenerator(data.nm14),
        rnd15: createItemGenerator(data.nm15),
        rnd16: createItemGenerator(data.nm16),
        rnd17: createItemGenerator(data.nm17),
        rnd18: createItemGenerator(data.nm18),
        rnd19: createItemGenerator(data.nm19),
        rnd20: createItemGenerator(data.nm20),

        rnd21: createItemGenerator(data.nm21),
    };

    const items: { [key: string]: DataItem } = Object.keys(itemGenerators).reduce(
        (result, key) => ({
            ...result,
            [key]: itemGenerators[key](),
        }),
        {},
    );

    items.rnd5 = itemGenerators
        .rnd5((i: WorldDescription) => (i.negative === (items.rnd4 as WorldType).negative))

    if (items.rnd7.id < 5) {
        items.rnd8 = itemGenerators.rnd8((i: DataItem) => (i.id <= 4));
    } else if (items.rnd7.id > 4 && items.rnd7.id < 10) {
        items.rnd8 = itemGenerators.rnd8((i: DataItem) => ((i.id >= 5) && (i.id <= 9)));
    } else if (items.rnd7.id > 9 && items.rnd7.id < 15) {
        items.rnd8 = itemGenerators.rnd8((i: DataItem) => ((i.id >= 10) && (i.id <= 14)));
    } else if (items.rnd7.id > 14) {
        items.rnd8 = itemGenerators.rnd8((i: DataItem) => (i.id >= 15));
    }

    items.rnd17b = itemGenerators.rnd17((i: DataItem) => (i.id != items.rnd17.id));
    items.rnd17c = itemGenerators.rnd17(
        (i: DataItem) => ([items.rnd17.id, items.rnd17b.id].indexOf(i.id) < 0)
    );

    items.rnd20b = itemGenerators.rnd20((i: DataItem) => (i.id != items.rnd20.id));
    items.rnd20c = itemGenerators.rnd20(
        (i: DataItem) => ([items.rnd20.id, items.rnd20b.id].indexOf(i.id) < 0)
    );

    const names = {
        name1: `Вы ${items.rnd1.text} вперед сквозь ${items.rnd2.text} портал ${items.rnd3.text}. `
            + `За ним вас ожидает ${items.rnd4.text} мир. `
            + `${items.rnd5.text}. `
            + `${items.rnd6.text}. `,
        name2: `${items.rnd7.text}${items.rnd8.text}. `
            + `Этот мир ${items.rnd9.text}${items.rnd10.text}.`,
        name3: `${items.rnd11.text} вы ${items.rnd12.text} ${items.rnd13.text}. `
            + `${items.rnd14.text}, ${items.rnd15.text}. `
            + `${items.rnd16.text} ${items.rnd17.text} существ, ${items.rnd17b.text} существ, и нечто вроде каких-то ${items.rnd17c.text} существ.`,
        name4: `${items.rnd18.text}, так как ${items.rnd19.text}. `
            + `Но, с ${items.rnd20.text}, ${items.rnd20b.text}, и ${items.rnd20c.text}, ${items.rnd21.text}.`,
    }

    return [
        names.name1,
        names.name2,
        '',
        names.name3,
        '',
        names.name4,
        '',
    ].join('\n');
}