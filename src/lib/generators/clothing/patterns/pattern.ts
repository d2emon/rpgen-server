export interface BasicPattern {
    name: string;
}

class PatternGenerator {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    generate(): BasicPattern {
        return {
            name: this.name,
        };
    }
}

export default PatternGenerator;
