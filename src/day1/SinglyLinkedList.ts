type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head: Node<T> | undefined;
    private tail: Node<T> | undefined;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {}
    append(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.tail) {
            this.head = this.tail = node;
        }

        this.tail.next = node;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let prev: Node<T> | undefined;
        let curr: Node<T> | undefined = this.head;
        while (curr) {
            if (curr.value === item) {
                if (!prev) {
                    this.head = curr.next;
                } else {
                    prev.next = curr.next;
                }
                this.length--;
                return curr.value;
            }

            prev = curr;
            curr = curr.next;
        }
        return undefined;
    }
    get(idx: number): T | undefined {
        const node = this.getNode(idx);
        return node?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx >= this.length) return undefined;

        let value;
        if (idx === 0 && this.head) {
            const tmp = this.head;
            this.head = this.head.next;
            tmp.next = undefined;

            value = tmp.value;
        } else {
            const prev = this.getNode(idx - 1);
            if (!prev) return undefined;

            const tmp = prev.next as Node<T>;
            prev.next = tmp.next;

            value = tmp.value;
        }

        this.length--;
        return value;
    }

    private getNode(idx: number): Node<T> | undefined {
        if (idx >= this.length || !this.head) return undefined;

        let curr = this.head;
        for (let i = 0; i < idx; ++i) {
            curr = curr.next as Node<T>;
        }

        return curr;
    }
}

