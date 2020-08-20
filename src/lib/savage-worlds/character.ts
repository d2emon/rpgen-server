export interface NeedSpend {
    environment: string;
    period: number;
    spend: number;
}

export interface Paces {
    normal: number;
    swimming: number;
    flying: number;
    flyDiveVertical: number;
    flyDiveHorizontal: number;
    climb: number;
    leap: number;
}

export interface Weapon {
    strengthBonus: number;
}

export interface Character {
    raceId: string;

    agilityId: number;
    spiritId: number;
    strengthId: number;
    vigorId: number;

    pace: Paces;
    toughness: number;
    charisma: number;

    initialBennies: number;
    initialEdges: number;

    surviveInDepth: boolean;
    swimming: number;
    needSpend: NeedSpend[];
    wingSpan: number;
    ignoreDark: string[];
    allThumbs: boolean;
    outsider: boolean;
    height: number;
    infravision: boolean;
    armor: number;
    bloodthirsty: boolean;
    naturalWeapons: Weapon[];
    climbBonus: number;
    pounceBonus: number;
    notice: number;
    isActive: boolean;

    isFatigued: boolean;
    isExhausted: boolean;
    isDead: boolean;

    weightPenalty: number;
}

class SavageWorldsCharacter implements Character {
    raceId: string;

    agilityId: number;
    spiritId: number;
    strengthId: number;
    vigorId: number;

    pace: Paces;
    toughness: number;
    charisma: number;

    initialBennies: number;
    initialEdges: number;

    surviveInDepth: boolean;
    swimming: number;
    needSpend: NeedSpend[];
    wingSpan: number;
    ignoreDark: string[];
    allThumbs: boolean;
    outsider: boolean;
    height: number;
    infravision: boolean;
    armor: number;
    bloodthirsty: boolean;
    naturalWeapons: Weapon[];
    climbBonus: number;
    pounceBonus: number;
    notice: number;
    isActive: boolean;

    isFatigued: boolean;
    isExhausted: boolean;
    isDead: boolean;

    weightPenalty: number;

    constructor() {
        this.agilityId = 1;
        this.spiritId = 1;
        this.vigorId = 1;

        this.surviveInDepth = true;
        // this.swimming
        // this.waterPace
        this.needSpend = [];
        this.wingSpan = 0;
    }

    rollVigor(): boolean {
        return true;
    }

    wrongEnvironment(time: number): boolean {
        if (time < 8) {
            return true;
        }
        if (this.rollVigor()) {
            return true;
        }

        if (this.isExhausted) {
            this.isDead = true;
        } else if (this.isFatigued) {
            this.isExhausted = true;
        } else {
            this.isFatigued = true;
        }

        return false;
    }
}
