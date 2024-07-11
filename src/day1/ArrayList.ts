export default class ArrayList<T> {
    public length: number;
    private array: Array<T>;
    constructor(private capacity: number) {
        this.array = new Array<T>(capacity);
        this.length = 0;
    }

    prepend(item: T): void {
        if (this.length >= this.capacity) {
            this.grow();
        }

        for (let i = this.length; i > 0; --i) {
            this.array[i] = this.array[i - 1];
        }

        this.length++;
        this.array[0] = item;
    }
    insertAt(item: T, idx: number): void {}
    append(item: T): void {
        if (this.length >= this.capacity) {
            this.grow();
        }

        this.array[this.length] = item;
        this.length++;
    }
    remove(item: T): T | undefined {
        for (let i = 0; i < this.length; i++) {
            if (this.array[i] === item) return this.removeAt(i);
        }

        return undefined;
    }
    get(idx: number): T | undefined {
        if (idx < 0 && idx >= this.length) return undefined;
        return this.array[idx];
    }
    removeAt(idx: number): T | undefined {
        if (idx < 0 && idx >= this.length) return undefined;

        const value = this.array[idx];
        for (let i = idx; i < this.length - 1; ++i) {
            this.array[i] = this.array[i + 1];
        }
        this.length--;

        return value;
    }

    private grow() {
        try {
            const array = this.array;
            this.array = new Array(this.capacity + 1);
            for (let i = 0; i < this.length; ++i) {
                this.array[i] = array[i];
            }
        } catch (err) {
            throw new Error("Failed to grow");
        }
    }
}

