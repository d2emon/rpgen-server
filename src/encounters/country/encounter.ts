import people, { People } from './people';
import action, { Action } from './actions';
import bounty, { Bounty } from './bounty';
import ambush, { Ambush } from './ambush';
import trap, { Trap } from './trap';
import strategy, { Strategy } from './strategy';
import animal, { Animal } from './animals';
import danger, { Danger } from './danger';
import {d100} from '../../lib/dice';
import { DangerClass } from './dangerClass';

/*
Таблица 1: тип встречи

Уровень опасности 1 Уровень опасности 2 Уровень опасности 3 Результат
1-30	            1-35                1-25                [ЛЮДИ] [ДЕЙСТВИЯ] [НАГРАДА]
31-35	            36-45               26-40               [ЗАСАДА] [ХИТРОСТЬ] [СТРАТЕГИЯ] [НАГРАДА]
36-45	            46-60               41-60               [ЖИВОТНОЕ] [РАЗМЕР] [НАГРАДА]
46-55	            61-75               61-80               [ОПАСНОСТЬ]
56-65	            76-90               81-99               [ЛЮДИ] [ОПАСНОСТЬ]
66-100	            91-100              100                 [ПРЕДОСТЕРЕЖЕНИЕ]

 */

export interface BaseCountryEncounter {
    bounty?: Bounty;
}

export interface PeopleEncounter extends BaseCountryEncounter {
    people: People;
    action: Action;
}

export interface AmbushEncounter extends BaseCountryEncounter {
    ambush: Ambush;
    trap: Trap;
    strategy: Strategy;
}

export interface AnimalEncounter extends BaseCountryEncounter {
    animal: Animal;
}

export interface DangerEncounter extends BaseCountryEncounter {
    danger: Danger;
    bounty: undefined;
}

export interface DangerPeopleEncounter extends BaseCountryEncounter {
    people: People;
    danger: Danger;
    bounty: undefined;
}

export interface WarningEncounter extends BaseCountryEncounter {
    warning: string;
    bounty: undefined;
}

export type CountryEncounter = PeopleEncounter
    | AmbushEncounter
    | AnimalEncounter
    | DangerEncounter
    | DangerPeopleEncounter
    | WarningEncounter;

const peopleEncounter = (): PeopleEncounter => ({
    people: people(),
    action: action(),
    bounty: bounty(),
});

const ambushEncounter = (): AmbushEncounter => ({
    ambush: ambush(),
    trap: trap(),
    strategy: strategy(),
    bounty: bounty(),
});

const animalEncounter = (dangerClass: DangerClass): AnimalEncounter => ({
    animal: animal(dangerClass),
    bounty: bounty(),
});

const dangerEncounter = (): DangerEncounter => ({
    danger: danger(),
    bounty: undefined,
});

const dangerPeopleEncounter = (): DangerPeopleEncounter => ({
    people: people(),
    danger: danger(),
    bounty: undefined,
});

const warning = (): WarningEncounter => ({
    warning: '',
    bounty: undefined,
});

export default (dangerClass: DangerClass, value?: number): CountryEncounter => {
    const v: number = value || d100.next().value;

    if (dangerClass === 1) {
        if (v <= 30 ) { return peopleEncounter(); }
        if (v <= 35 ) { return ambushEncounter(); }
        if (v <= 45 ) { return animalEncounter(dangerClass); }
        if (v <= 55 ) { return dangerEncounter(); }
        if (v <= 65 ) { return dangerPeopleEncounter(); }
        if (v <= 100 ) { return warning(); }
    }
    if (dangerClass === 2) {
        if (v <= 35 ) { return peopleEncounter(); }
        if (v <= 45 ) { return ambushEncounter(); }
        if (v <= 60 ) { return animalEncounter(dangerClass); }
        if (v <= 75 ) { return dangerEncounter(); }
        if (v <= 90 ) { return dangerPeopleEncounter(); }
        if (v <= 100 ) { return warning(); }
    }
    if (dangerClass === 3) {
        if (v <= 25 ) { return peopleEncounter(); }
        if (v <= 40 ) { return ambushEncounter(); }
        if (v <= 60 ) { return animalEncounter(dangerClass); }
        if (v <= 80 ) { return dangerEncounter(); }
        if (v <= 99 ) { return dangerPeopleEncounter(); }
        if (v <= 100 ) { return warning(); }
    }
    return undefined;
}
