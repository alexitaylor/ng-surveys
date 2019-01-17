import {IPage} from '../../models';

export interface IPageLinkedListNode {
  page?: IPage;
  next?: IPageLinkedListNode;
  previous?: IPageLinkedListNode;
}

export class PageLinkedListNode implements IPageLinkedListNode {
  constructor(
    public page?: IPage,
    public next?: IPageLinkedListNode,
    public previous?: IPageLinkedListNode,
  ) {
    this.page = page;
    this.next = next;
    this.previous = previous;
  }
}

export type Prepend = (page: IPage) => IPageLinkedList;
export type Append = (page: IPage) => IPageLinkedList;
export type Delete = (page: IPage) => IPageLinkedList;
export type FindByPageId = (pageId: string) => IPageLinkedListNode;
export type Find = (page: IPage, callback?: Function) => IPageLinkedListNode;
export type DeleteHead = () => IPageLinkedListNode;
export type DeleteTail = () => IPageLinkedListNode;
export type ToArray = () => PageLinkedListNode[];
export type FromArray = (values: PageLinkedListNode[]) => IPageLinkedList;
export type Reverse = () => IPageLinkedList;


export interface IPageLinkedList {
  head: IPageLinkedListNode | null;
  tail: IPageLinkedListNode | null;

  prepend: Prepend;
  append: Append;
  delete: Delete;
  findByPageId: FindByPageId;
  find: Find;
  deleteHead: DeleteHead;
  deleteTail: DeleteTail;
  toArray: ToArray;
  fromArray: FromArray;
  reverse: Reverse;
}

export class PageLinkedList implements IPageLinkedList {
  public head:  IPageLinkedListNode | null;
  public tail: IPageLinkedListNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  prepend(page: IPage): IPageLinkedList {
    // Make new node to be a head.
    const newNode = new PageLinkedListNode(page, this.head);

    // If there is head, then it won't be head anymore.
    // Therefore, make its previous reference to be new node (new head).
    // Then mark the new node as head.
    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    // If there is no tail yet let's make new node a tail.
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(page: IPage): IPageLinkedList {
    const newNode = new PageLinkedListNode(page);

    // If there is no head yet let's make new node a head.
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail.next = newNode;

    // Attach current tail to the new node's previous reference.
    newNode.previous = this.tail;

    // Set new node to be the tail of linked list.
    this.tail = newNode;

    return this;
  }

  delete(page: IPage): IPageLinkedList {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.page.id === page.id) {
        deletedNode = currentNode;

        if (deletedNode === this.head) {
          // If HEAD is going to be deleted...

          // Set head to second node, which will become new head.
          this.head = deletedNode.next;

          // Set new head's previous to null.
          if (this.head) {
            this.head.previous = null;
          }

          // If all the nodes in list has same value that is passed as argument
          // then all nodes will get deleted, therefore tail needs to be updated.
          if (deletedNode === this.tail) {
            this.tail = null;
          }
        } else if (deletedNode === this.tail) {
          // If TAIL is going to be deleted...

          // Set tail to second last node, which will become new tail.
          this.tail = deletedNode.previous;
          this.tail.next = null;
        } else {
          // If MIDDLE node is going to be deleted...
          const previousNode = deletedNode.previous;
          const nextNode = deletedNode.next;

          previousNode.next = nextNode;
          nextNode.previous = previousNode;
        }
      }

      currentNode = currentNode.next;
    }

    return deletedNode;
  }

  find(page: IPage, callback?: Function): IPageLinkedListNode {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.page)) {
        return currentNode;
      }

      // If value is specified then try to compare by value's ID
      if (page !== undefined && currentNode.page.id === page.id) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  findByPageId(pageId: string): IPageLinkedListNode {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      if (pageId !== undefined && currentNode.page.id === pageId) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  deleteTail(): IPageLinkedListNode {
    let deletedTail;
    if (!this.tail) {
      // No tail to delete.
      return null;
    }

    if (this.head === this.tail) {
      // There is only one node in linked list.
      deletedTail = this.tail;
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...
    deletedTail = this.tail;

    this.tail = this.tail.previous;
    this.tail.next = null;

    return deletedTail;
  }

  deleteHead(): IPageLinkedListNode {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  toArray(): PageLinkedListNode[] {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  fromArray(values: PageLinkedListNode[]): IPageLinkedList {
    values.forEach(value => this.append(value.page));

    return this;
  }

  reverse(): IPageLinkedList {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      // Store next node.
      nextNode = currNode.next;
      prevNode = currNode.previous;

      // Change next node of the current node so it would link to previous node.
      currNode.next = prevNode;
      currNode.previous = nextNode;

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode;
      currNode = nextNode;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = prevNode;

    return this;
  }
}
