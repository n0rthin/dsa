type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

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

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }
    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx === this.length) return;

        const node = { value: item } as Node<T>;
        const prev = this.getNode(idx);
        if (!prev) return;

        this.length++;

        node.next = prev.next;
        node.prev = prev;
        if (prev.next) prev.next.prev = node;
        prev.next = node;

        if (prev === this.head) this.head = node;
        if (prev === this.tail) this.tail = node;
    }
    append(item: T): void {
        const node = { value: item } as Node<T>;

        this.length++;
        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        if (!this.head || !this.tail) return undefined;

        let curr: Node<T> | undefined = this.head;
        while (curr && curr.value !== item) {
            curr = curr.next;
        }

        if (!curr) return undefined;
        return this.removeNode(curr).value;
    }
    get(idx: number): T | undefined {
        return this.getNode(idx)?.value;
    }
    removeAt(idx: number): T | undefined {
        const node = this.getNode(idx);
        if (!node) return undefined;

        return this.removeNode(node).value;
    }

    private removeNode(node: Node<T>): Node<T> {
        this.length--;

        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) this.head = node.next;
        if (node === this.tail) this.tail = node.prev;

        node.prev = node.next = undefined;

        return node;
    }

    private getNode(idx: number): Node<T> | undefined {
        if (idx < 0 || idx >= this.length) return undefined;

        let curr: Node<T> | undefined = this.head;
        for (let i = 0; i < idx; ++i) {
            curr = curr?.next;
        }

        return curr;
    }
}

