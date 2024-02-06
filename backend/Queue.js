class Queue {
  constructor() {
    this.queue = [];
  }

  /**
   * Adds the specified string e to the queue.
   * @param {string} e
   */
  enqueue(e) {
    this.queue.push(e);
  }

  /**
   * Removes the tail element from the queue (FIFO).
   */
  dequeue() {
    if (this.isEmpty) {
      console.error("Queue has no elements!");
    }

    this.queue.shift();
  }

  /**
   * Returns the tail element to the user but does not remove it.
   */
  peek() {
    if (this.isEmpty) {
      console.error("Queue has no elements!");
    }
  }

  /**
   * Returns true if the queue contains no elements, false otherwise.
   * @returns {boolean}
   */
  isEmpty() {
    if (this.queue.length === 0) {
      return true;
    }
    return false;
  }

  /**
   * Returns the size of the queue.
   * @returns {number}
   */
  size() {
    return this.queue.length;
  }

  /**
   * Prints the queue to the console.
   */
  print() {
    console.log(this.queue);
  }
}
