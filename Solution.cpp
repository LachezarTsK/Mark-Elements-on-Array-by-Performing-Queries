
#include <span>
#include <queue>
#include <vector>
#include <numeric>
using namespace std;

class Solution {

    struct ElementData {
        int value;
        size_t index;
        ElementData(int value, size_t index) :value {value}, index {index} {}
    };

    struct Comparator {
        auto operator()(const ElementData& x, const ElementData& y) const {
            return (x.value == y.value) ? (x.index > y.index) : (x.value > y.value);
        }
    };

    using MinHeapForValue = priority_queue<ElementData, vector<ElementData>, Comparator>;

    vector<bool> markedElements;
    long long sumOfUnmarkedElements = 0;

public:
    vector<long long> unmarkedSumArray(const vector<int>& input, const vector<vector<int>>& queries) {

            MinHeapForValue minHeapForValue;
            initializeMinHeapForValue(input, minHeapForValue);

            markedElements.resize(input.size());
            sumOfUnmarkedElements = accumulate(input.begin(), input.end(), static_cast<long long>(0));

            vector<long long> sumOfUnmarkedElementsAfterEachQuery(queries.size());
            int indexAnswer = 0;

            for (size_t i = 0; i < queries.size() && !minHeapForValue.empty(); ++i) {
                markElementsInQuery(queries[i], input, minHeapForValue);
                sumOfUnmarkedElementsAfterEachQuery[indexAnswer++] = sumOfUnmarkedElements;
            }

            return sumOfUnmarkedElementsAfterEachQuery;
    }

private:
    void markElementsInQuery(span<const int> query, span<const int> input, MinHeapForValue& minHeapForValue) {
        int index = query[0];
        int numberOfSmallestValuesToMark = query[1];

        if (!markedElements[index]) {
            sumOfUnmarkedElements -= input[index];
            markedElements[index] = true;
        }

        while (!minHeapForValue.empty() && numberOfSmallestValuesToMark > 0) {
            ElementData element = minHeapForValue.top();
            minHeapForValue.pop();

            if (!markedElements[element.index]) {
                sumOfUnmarkedElements -= input[element.index];
                markedElements[element.index] = true;
                --numberOfSmallestValuesToMark;
            }
        }
    }

    void initializeMinHeapForValue(span<const int> input, MinHeapForValue& minHeapForValue) const {
        for (size_t i = 0; i < input.size(); ++i) {
            minHeapForValue.emplace(input[i], i);
        }
    }
};
