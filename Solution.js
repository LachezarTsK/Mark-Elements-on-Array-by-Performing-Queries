
/**
 * @param {number[]} input
 * @param {number[][]} queries
 * @return {number[]}
 */
var unmarkedSumArray = function (input, queries) {
    this.markedElements = new Array(input.length).fill(false);
    this.sumOfUnmarkedElements = input.reduce((x, y) => x + y);

    // const {MinPriorityQueue} = require('@datastructures-js/priority-queue') 
    // MinPriorityQueue<ElementData>
    const minHeapForValue = new MinPriorityQueue(
            {compare: (x, y) => (x.value === y.value) ? (x.index - y.index) : (x.value - y.value)});
    initializeMinHeapForValue(input, minHeapForValue);

    const sumOfUnmarkedElementsAfterEachQuery = new Array(queries.length).fill(0);
    let indexAnswer = 0;

    for (let i = 0; i < queries.length && !minHeapForValue.isEmpty(); ++i) {
        markElementsInQuery(queries[i], input, minHeapForValue);
        sumOfUnmarkedElementsAfterEachQuery[indexAnswer++] = this.sumOfUnmarkedElements;
    }

    return sumOfUnmarkedElementsAfterEachQuery;
};

/**
 * @param {number} value
 * @param {number} index
 */
function ElementData(value, index) {
    this.value = value;
    this.index = index;
}

/**
 * @param {number[]} query
 * @param {number[]} input
 * @param {MinPriorityQueue<ElementData>} minHeapForValue
 * @return {void}
 */
function markElementsInQuery(query, input, minHeapForValue) {
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

/**
 * @param {number[]} input
 * @param {MinPriorityQueue<ElementData>} minHeapForValue
 * @return {void}
 */
function initializeMinHeapForValue(input, minHeapForValue) {
    for (let i = 0; i < input.length; ++i) {
        minHeapForValue.enqueue(new ElementData(input[i], i));
    }
}
