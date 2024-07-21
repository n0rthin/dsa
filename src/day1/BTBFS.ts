import Queue from "./Queue";

export default function bfs(head: BinaryNode<number>, needle: number): boolean {
    if (head.value === needle) return true;

    const queue = new Queue<BinaryNode<number>>();
    queue.enqueue(head);

    do {
        const curr = queue.deque()!;
        if (curr.value === needle) {
            // TODO: clean up queue
            return true;
        }

        if (curr.left) queue.enqueue(curr.left);
        if (curr.right) queue.enqueue(curr.right);
    } while (queue.length > 0);

    return false;
}

