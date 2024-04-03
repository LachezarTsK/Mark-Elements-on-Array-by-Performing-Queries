
function unmarkedSumArray(input: number[], queries: number[][]): number[] {
    this.markedElements = new Array(input.length).fill(false);
    this.sumOfUnmarkedElements = input.reduce((x, y) => x + y);

    //const {MinPriorityQueue} = require('@datastructures-js/priority-queue')  
    const minHeapForValue = new MinPriorityQueue(
        { compare: (x, y) => (x.value === y.value) ? (x.index - y.index) : (x.value - y.value) });
    initializeMinHeapForValue(input, minHeapForValue);

    const sumOfUnmarkedElementsAfterEachQuery = new Array(queries.length).fill(0);
    let indexAnswer = 0;

    for (let i = 0; i < queries.length && !minHeapForValue.isEmpty(); ++i) {
        markElementsInQuery(queries[i], input, minHeapForValue);
        sumOfUnmarkedElementsAfterEachQuery[indexAnswer++] = this.sumOfUnmarkedElements;
    }

    return sumOfUnmarkedElementsAfterEachQuery;
};

class ElementData {
    constructor(public value: number, public index: number) { }
}

function markElementsInQuery(query: number[], input: number[], minHeapForValue: typeof MinPriorityQueue): void {
    let index = query[0];
    let numberOfSmallestValuesToMark = query[1];

    if (!this.markedElements[index]) {
        this.sumOfUnmarkedElements -= input[index];
        this.markedElements[index] = true;
    }

    while (!minHeapForValue.isEmpty() && numberOfSmallestValuesToMark > 0) {
        const element = minHeapForValue.dequeue();
        if (!this.markedElements[element.index]) {
            this.sumOfUnmarkedElements -= input[element.index];
            this.markedElements[element.index] = true;
            --numberOfSmallestValuesToMark;
        }
    }
}

function initializeMinHeapForValue(input: number[], minHeapForValue: typeof MinPriorityQueue): void {
    for (let i = 0; i < input.length; ++i) {
        minHeapForValue.enqueue(new ElementData(input[i], i));
    }
}
