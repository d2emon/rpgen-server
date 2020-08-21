export const generateItemId = (items: any[]): number => Math.floor(Math.random() * items.length);
export const generate = (items: any[]): any => items[generateItemId(items)];
export const randomGender = (): number => generate([1, 2]);

export class DataLoader {
    private readonly path: string;

    items: any[];

    constructor(path: string) {
        this.path = path;
        this.items = this.reload();
    }

    reload(): any[] {
        // tslint:disable-next-line
        return require(this.path);
    }

    generate() {
        return generate(this.items);
    }

    item(id: number) {
        return this.items[id];
    }
}