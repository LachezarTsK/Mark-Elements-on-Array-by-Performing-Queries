
using System;
using System.Collections.Generic;

public class Solution
{
    private sealed record ElementData(int value, int index) { }

    private bool[]? markedElements;
    private long sumOfUnmarkedElements;

    public long[] UnmarkedSumArray(int[] input, int[][] queries)
    {
        Comparer<ElementData> comparator = Comparer<ElementData>
            .Create((x, y) => x.value == y.value
                          ? x.index.CompareTo(y.index)
                          : x.value.CompareTo(y.value));

        PriorityQueue<ElementData, ElementData> minHeapForValue = new PriorityQueue<ElementData, ElementData>(comparator);
        InitializeMinHeapForValue(input, minHeapForValue);

        markedElements = new bool[input.Length];
        sumOfUnmarkedElements = 0;
        foreach (int n in input)
        {
            sumOfUnmarkedElements += n;
        }


        long[] sumOfUnmarkedElementsAfterEachQuery = new long[queries.Length];
        int indexAnswer = 0;

        for (int i = 0; i < queries.Length && minHeapForValue.Count > 0; ++i)
        {
            MarkElementsInQuery(queries[i], input, minHeapForValue);
            sumOfUnmarkedElementsAfterEachQuery[indexAnswer++] = sumOfUnmarkedElements;
        }

        return sumOfUnmarkedElementsAfterEachQuery;
    }

    private void MarkElementsInQuery(int[] query, int[] input, PriorityQueue<ElementData, ElementData> minHeapForValue)
    {
        int index = query[0];
        int numberOfSmallestValuesToMark = query[1];

        if (!markedElements[index])
        {
            sumOfUnmarkedElements -= input[index];
            markedElements[index] = true;
        }

        while (minHeapForValue.Count > 0 && numberOfSmallestValuesToMark > 0)
        {
            ElementData element = minHeapForValue.Dequeue();
            if (!markedElements[element.index])
            {
                sumOfUnmarkedElements -= input[element.index];
                markedElements[element.index] = true;
                --numberOfSmallestValuesToMark;
            }
        }
    }

    private void InitializeMinHeapForValue(int[] input, PriorityQueue<ElementData, ElementData> minHeapForValue)
    {
        for (int i = 0; i < input.Length; ++i)
        {
            minHeapForValue.Enqueue(new ElementData(input[i], i), new ElementData(input[i], i));
        }
    }

}
