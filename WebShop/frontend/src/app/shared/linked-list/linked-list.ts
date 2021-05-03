export class LinkedList {
    head: ListNode;

    constructor(head: ListNode) {
        this.head = head;
    }
}

export class ListNode {
    value: any;
    next: ListNode | null;

    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
