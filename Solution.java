
import java.util.Arrays;
import java.util.PriorityQueue;

public class Solution {

    private record ElementData(int value, int index) {}

    private boolean[] markedElements;
    private long sumOfUnmarkedElements;

    public long[] unmarkedSumArray(int[] input, int[][] queries) {

        PriorityQueue<ElementData> minHeapForValue = new PriorityQueue<>(
                (x, y) -> (x.value == y.value) ? (x.index - y.index) : (x.value - y.value));
        initializeMinHeapForValue(input, minHeapForValue);

        markedElements = new boolean[input.length];
        sumOfUnmarkedElements = Arrays.stream(input).asLongStream().sum();

        long[] sumOfUnmarkedElementsAfterEachQuery = new long[queries.length];
        int indexAnswer = 0;

        for (int i = 0; i < queries.length && !minHeapForValue.isEmpty(); ++i) {
            markElementsInQuery(queries[i], input, minHeapForValue);
            sumOfUnmarkedElementsAfterEachQuery[indexAnswer++] = sumOfUnmarkedElements;
        }

        return sumOfUnmarkedElementsAfterEachQuery;
    }

    private void markElementsInQuery(int[] query, int[] input, PriorityQueue<ElementData> minHeapForValue) {
        int index = query[0];
        int numberOfSmallestValuesToMark = query[1];

        if (!markedElements[index]) {
            sumOfUnmarkedElements -= input[index];
            markedElements[index] = true;
        }

        while (!minHeapForValue.isEmpty() && numberOfSmallestValuesToMark > 0) {
            ElementData element = minHeapForValue.poll();
            if (!markedElements[element.index]) {
                sumOfUnmarkedElements -= input[element.index];
                markedElements[element.index] = true;
                --numberOfSmallestValuesToMark;
            }
        }
    }

    private void initializeMinHeapForValue(int[] input, PriorityQueue<ElementData> minHeapForValue) {
        for (int i = 0; i < input.length; ++i) {
            minHeapForValue.add(new ElementData(input[i], i));
        }
    }
}
