document.addEventListener('DOMContentLoaded', () => {
    // C++ program templates - you can replace these with your actual programs later
    const cppPrograms = {
        1: `#include <stdio.h>
#include <stdlib.h>

int comparator(const void* p1, const void* p2) {
    const int(*x)[3] = p1;
    const int(*y)[3] = p2;
    return (*x)[2] - (*y)[2];
}

void makeSet(int parent[], int rank[], int n) {
    for (int i = 0; i < n; i++) {
        parent[i] = i;
        rank[i] = 0;
    }
}

int findParent(int parent[], int component) {
    if (parent[component] == component)
        return component;
    return parent[component] = findParent(parent, parent[component]);
}

void unionSet(int u, int v, int parent[], int rank[], int n) {
    u = findParent(parent, u);
    v = findParent(parent, v);

    if (rank[u] < rank[v]) {
        parent[u] = v;
    } else if (rank[u] > rank[v]) {
        parent[v] = u;
    } else {
        parent[v] = u;
        rank[u]++;
    }
}

void kruskalAlgo(int n, int edge[n][3]) {
    qsort(edge, n, sizeof(edge[0]), comparator);

    int parent[n];
    int rank[n];
    makeSet(parent, rank, n);

    int minCost = 0;

    printf("Following are the edges in the constructed MST:\n");

    for (int i = 0; i < n; i++) {
        int v1 = findParent(parent, edge[i][0]);
        int v2 = findParent(parent, edge[i][1]);
        int wt = edge[i][2];

        if (v1 != v2) {
            unionSet(v1, v2, parent, rank, n);
            minCost += wt;
            printf("%d -- %d == %d\n", edge[i][0], edge[i][1], wt);
        }
    }

    printf("Minimum Cost Spanning Tree: %d\n", minCost);
}

int main() {
    int edge[5][3] = {
        {0, 1, 10},
        {0, 2, 6},
        {0, 3, 5},
        {1, 3, 15},
        {2, 3, 4}
    };

    kruskalAlgo(5, edge);
    return 0;
}
`,
        2: `#include <limits.h>
#include <stdbool.h>
#include <stdio.h>

#define V 5

int minKey(int key[], bool mstSet[]) {
    int min = INT_MAX, min_index;

    for (int v = 0; v < V; v++) {
        if (mstSet[v] == false && key[v] < min) {
            min = key[v];
            min_index = v;
        }
    }
    return min_index;
}

void printMST(int parent[], int graph[V][V]) {
    printf("Edge\tWeight\n");
    for (int i = 1; i < V; i++)
        printf("%d - %d\t%d\n", parent[i], i, graph[i][parent[i]]);
}

void primMST(int graph[V][V]) {
    int parent[V];
    int key[V];
    bool mstSet[V];

    for (int i = 0; i < V; i++) {
        key[i] = INT_MAX;
        mstSet[i] = false;
    }

    key[0] = 0;
    parent[0] = -1;

    for (int count = 0; count < V - 1; count++) {
        int u = minKey(key, mstSet);
        mstSet[u] = true;

        for (int v = 0; v < V; v++) {
            if (graph[u][v] && mstSet[v] == false && graph[u][v] < key[v]) {
                parent[v] = u;
                key[v] = graph[u][v];
            }
        }
    }

    printMST(parent, graph);
}

int main() {
    int graph[V][V] = {
        { 0, 2, 0, 6, 0 },
        { 2, 0, 3, 8, 5 },
        { 0, 3, 0, 0, 7 },
        { 6, 8, 0, 0, 9 },
        { 0, 5, 7, 9, 0 }
    };

    primMST(graph);

    return 0;
}
`,
        3: `#include <stdio.h>

#define V 4
#define INF 99999

void printSolution(int dist[][V]);

void floydWarshall(int dist[][V]) {
    int i, j, k;

    for (k = 0; k < V; k++) {
        for (i = 0; i < V; i++) {
            for (j = 0; j < V; j++) {
                if (dist[i][k] + dist[k][j] < dist[i][j])
                    dist[i][j] = dist[i][k] + dist[k][j];
            }
        }
    }

    printSolution(dist);
}

void printSolution(int dist[][V]) {
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (dist[i][j] == INF)
                printf("%7s", "INF");
            else
                printf("%7d", dist[i][j]);
        }
        printf("\n");
    }
}

int main() {
    int graph[V][V] = {
        { 0,   5,  INF, 10 },
        { INF, 0,   3,  INF },
        { INF, INF, 0,   1 },
        { INF, INF, INF, 0 }
    };

    floydWarshall(graph);
    return 0;
}
`,
        "3b": 4, // This will link Program 3b to Program 4's code
        4: `#include <stdio.h>

#define V 4

void printSolution(int reach[][V]);

void transitiveClosure(int graph[][V]) {
    int reach[V][V], i, j, k;

    for (i = 0; i < V; i++)
        for (j = 0; j < V; j++)
            reach[i][j] = graph[i][j];

    for (k = 0; k < V; k++) {
        for (i = 0; i < V; i++) {
            for (j = 0; j < V; j++) {
                reach[i][j] = reach[i][j] || (reach[i][k] && reach[k][j]);
            }
        }
    }

    printSolution(reach);
}

void printSolution(int reach[][V]) {
    for (int i = 0; i < V; i++) {
        for (int j = 0; j < V; j++) {
            if (i == j)
                printf("1 ");
            else
                printf("%d ", reach[i][j]);
        }
        printf("\n");
    }
}

int main() {
    int graph[V][V] = {
        {1, 1, 0, 1},
        {0, 1, 1, 0},
        {0, 0, 1, 1},
        {0, 0, 0, 1}
    };

    transitiveClosure(graph);
    return 0;
}

`,
        

        5: `#include <limits.h>
#include <stdbool.h>
#include <stdio.h>

#define V 9

int minDistance(int dist[], bool sptSet[]) {
    int min = INT_MAX, min_index;
    for (int v = 0; v < V; v++)
        if (sptSet[v] == false && dist[v] <= min)
            min = dist[v], min_index = v;
    return min_index;
}

void printSolution(int dist[]) {
    printf("Vertex \t\t Distance from Source\n");
    for (int i = 0; i < V; i++)
        printf("%d \t\t\t\t %d\n", i, dist[i]);
}

void dijkstra(int graph[V][V], int src) {
    int dist[V];
    bool sptSet[V];

    for (int i = 0; i < V; i++)
        dist[i] = INT_MAX, sptSet[i] = false;

    dist[src] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistance(dist, sptSet);
        sptSet[u] = true;

        for (int v = 0; v < V; v++)
            if (!sptSet[v] && graph[u][v] && dist[u] != INT_MAX && dist[u] + graph[u][v] < dist[v])
                dist[v] = dist[u] + graph[u][v];
    }

    printSolution(dist);
}

int main() {
    int graph[V][V] = {
        { 0, 4, 0, 0, 0, 0, 0, 8, 0 },
        { 4, 0, 8, 0, 0, 0, 0, 11, 0 },
        { 0, 8, 0, 7, 0, 4, 0, 0, 2 },
        { 0, 0, 7, 0, 9, 14, 0, 0, 0 },
        { 0, 0, 0, 9, 0, 10, 0, 0, 0 },
        { 0, 0, 4, 14, 10, 0, 2, 0, 0 },
        { 0, 0, 0, 0, 0, 2, 0, 1, 6 },
        { 8, 11, 0, 0, 0, 0, 1, 0, 7 },
        { 0, 0, 2, 0, 0, 0, 6, 7, 0 }
    };

    dijkstra(graph, 0);
    return 0;
}
 `,
        6: `#include<stdio.h>

void findindegree(int a[10][10], int indegree[10], int n);
void topological(int n, int a[10][10]);

void main() {
    int a[10][10], i, j, n;
    printf("Enter the number of nodes: ");
    scanf("%d", &n);

    printf("\nEnter the adjacency matrix:\n");
    for (i = 1; i <= n; i++)
        for (j = 1; j <= n; j++)
            scanf("%d", &a[i][j]);

    printf("\nThe adjacency matrix is:\n");
    for (i = 1; i <= n; i++) {
        for (j = 1; j <= n; j++) {
            printf("%d\t", a[i][j]);
        }
        printf("\n");
    }

    topological(n, a);
}

void findindegree(int a[10][10], int indegree[10], int n) {
    int i, j, sum;
    for (j = 1; j <= n; j++) {
        sum = 0;
        for (i = 1; i <= n; i++) {
            sum = sum + a[i][j];
        }
        indegree[j] = sum;
    }
}

void topological(int n, int a[10][10]) {
    int k, top, t[100], i, stack[20], u, v, indegree[20];
    k = 1;
    top = -1;

    findindegree(a, indegree, n);

    for (i = 1; i <= n; i++) {
        if (indegree[i] == 0) {
            stack[++top] = i;
        }
    }

    while (top != -1) {
        u = stack[top--];
        t[k++] = u;

        for (v = 1; v <= n; v++) {
            if (a[u][v] == 1) {
                indegree[v]--;
                if (indegree[v] == 0) {
                    stack[++top] = v;
                }
            }
        }
    }

    printf("\nTopological sequence is:\n");
    for (i = 1; i <= n; i++)
        printf("%d\t", t[i]);
}
`,
        7: `#include <stdio.h>

int knapsack(int W, int weights[], int values[], int n) {
    int dp[n+1][W+1];

    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0) {
                dp[i][w] = 0;
            } else if (weights[i-1] <= w) {
                dp[i][w] = (values[i-1] + dp[i-1][w - weights[i-1]]) > dp[i-1][w] ?
                            (values[i-1] + dp[i-1][w - weights[i-1]]) : dp[i-1][w];
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }

    return dp[n][W];
}

int main() {
    int n, W;
    printf("Enter number of items: ");
    scanf("%d", &n);
    printf("Enter the capacity of the knapsack: ");
    scanf("%d", &W);
    int weights[n], values[n];

    printf("Enter the weights of the items:\n");
    for (int i = 0; i < n; i++) {
        scanf("%d", &weights[i]);
    }

    printf("Enter the values of the items:\n");
    for (int i = 0; i < n; i++) {
        scanf("%d", &values[i]);
    }

    int maxValue = knapsack(W, weights, values, n);
    printf("The maximum value that can be obtained is: %d\n", maxValue);

    return 0;
}
`,
        8: `#include<stdio.h>

int w[10], p[10], n;

int max(int a, int b) {
    return a > b ? a : b;
}

int knap(int i, int m) {
    if (i == n) return w[i] > m ? 0 : p[i];
    if (w[i] > m) return knap(i + 1, m);
    return max(knap(i + 1, m), knap(i + 1, m - w[i]) + p[i]);
}

int main() {
    int m, i, max_profit;
    printf("\nEnter the number of objects: ");
    scanf("%d", &n);
    printf("\nEnter the knapsack capacity: ");
    scanf("%d", &m);
    printf("\nEnter profit followed by weight:\n");
    for (i = 1; i <= n; i++) {
        scanf("%d %d", &p[i], &w[i]);
    }
    max_profit = knap(1, m);
    printf("\nMax profit = %d", max_profit);
    return 0;
}
`,
        9: `#include<stdio.h>

void subset(int cs, int k, int r);

int x[10], w[10], d, count = 0;

void main() {
    int i, n, sum = 0;

    printf("Enter the number of elements: ");
    scanf("%d", &n);
    printf("\nEnter the elements in ascending order:\n");
    for (i = 0; i < n; i++)
        scanf("%d", &w[i]);

    printf("\nEnter the sum: ");
    scanf("%d", &d);

    for (i = 0; i < n; i++)
        sum += w[i];

    if (sum < d) {
        printf("No solution\n");
        return;
    }

    subset(0, 0, sum);

    if (count == 0) {
        printf("No solution\n");
        return;
    }
}

void subset(int cs, int k, int r) {
    int i;
    x[k] = 1;

    if (cs + w[k] == d) {
        printf("\nSubset %d\n", ++count);
        for (i = 0; i <= k; i++)
            if (x[i] == 1)
                printf("%d\t", w[i]);
    }
    else if (cs + w[k] + w[k + 1] <= d)
        subset(cs + w[k], k + 1, r - w[k]);

    if (cs + r - w[k] >= d && cs + w[k] <= d) {
        x[k] = 0;
        subset(cs, k + 1, r - w[k]);
    }
}
`,
        10: `#include <stdio.h>

void swap(int *xp, int *yp) {
    int temp = *xp;
    *xp = *yp;
    *yp = temp;
}

void selectionSort(int arr[], int n) {
    int i, j, min_idx;
    for (i = 0; i < n-1; i++) {
        min_idx = i;
        for (j = i+1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }
        if(min_idx != i)
            swap(&arr[min_idx], &arr[i]);
    }
}

void printArray(int arr[], int size) {
    int i;
    for (i = 0; i < size; i++)
        printf("%d ", arr[i]);
    printf("\n");
}

int main() {
    int arr[] = {64, 25, 12, 22, 11};
    int n = sizeof(arr) / sizeof(arr[0]);
    selectionSort(arr, n);
    printf("Sorted array: \n");
    printArray(arr, n);
    return 0;
}

`,
        11: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void swap(int* a, int* b)
{
    int t = *a;
    *a = *b;
    *b = t;
}

int partition(int arr[], int low, int high)
{
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++)
    {
        if (arr[j] < pivot)
        {
            i++;
            swap(&arr[i], &arr[j]);
        }
    }
    swap(&arr[i + 1], &arr[high]);
    return (i + 1);
}

void quickSort(int arr[], int low, int high)
{
    if (low < high)
    {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

void generateRandomNumbers(int arr[], int n)
{
    for (int i = 0; i < n; i++)
    {
        arr[i] = rand() % 100000;
    }
}

int main()
{
    int n;
    printf("Enter number of elements: ");
    scanf("%d", &n);
    if (n <= 5000)
    {
        printf("Please enter a value greater than 5000\n");
        return 1;
    }

    int *arr = (int *)malloc(n * sizeof(int));
    if (arr == NULL)
    {
        printf("Memory allocation failed\n");
        return 1;
    }

    generateRandomNumbers(arr, n);
    
    clock_t start = clock();
    quickSort(arr, 0, n - 1);
    clock_t end = clock();
    
    double time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Time taken to sort %d elements: %f seconds\n", n, time_taken);
    
    free(arr);
    return 0;
}
`,
        12: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void merge(int arr[], int left, int mid, int right)
{
    int i, j, k;
    int n1 = mid - left + 1;
    int n2 = right - mid;
    int *L = (int *)malloc(n1 * sizeof(int));
    int *R = (int *)malloc(n2 * sizeof(int));

    for (i = 0; i < n1; i++)
        L[i] = arr[left + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[mid + 1 + j];

    i = 0;
    j = 0;
    k = left;
    while (i < n1 && j < n2)
    {
        if (L[i] <= R[j])
        {
            arr[k] = L[i];
            i++;
        }
        else
        {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    while (i < n1)
    {
        arr[k] = L[i];
        i++;
        k++;
    }

    while (j < n2)
    {
        arr[k] = R[j];
        j++;
        k++;
    }

    free(L);
    free(R);
}

void mergeSort(int arr[], int left, int right)
{
    if (left < right)
    {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

void generateRandomArray(int arr[], int n)
{
    for (int i = 0; i < n; i++)
        arr[i] = rand() % 100000;
}

int main()
{
    int n;
    printf("Enter the number of elements: ");
    scanf("%d", &n);
    if (n <= 5000)
    {
        printf("Please enter a value greater than 5000\n");
        return 1;
    }

    int *arr = (int *)malloc(n * sizeof(int));
    if (arr == NULL)
    {
        printf("Memory allocation failed\n");
        return 1;
    }

    generateRandomArray(arr, n);

    clock_t start = clock();
    for (int i = 0; i < 1000; i++)
    {
        mergeSort(arr, 0, n - 1);
    }
    clock_t end = clock();

    double time_taken = ((double)(end - start)) / CLOCKS_PER_SEC / 1000.0;
    printf("Time taken to sort %d elements: %f seconds\n", n, time_taken);

    free(arr);
    return 0;
}
`,
        13: `#include <stdio.h>
#include <stdbool.h>
#define MAX 20
int board[MAX][MAX];

void printBoard(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (board[i][j] == 1)
                printf(" Q ");
            else
                printf(" . ");
        }
        printf("\n");
    }
}

bool isSafe(int row, int col, int n) {
    int i, j;
    for (i = 0; i < row; i++)
        if (board[i][col] == 1)
            return false;

    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j] == 1)
            return false;

    for (i = row, j = col; i >= 0 && j < n; i--, j++)
        if (board[i][j] == 1)
            return false;
    
    return true;
}

bool solveNQueens(int row, int n) {
    if (row == n)
        return true;
    
    for (int col = 0; col < n; col++) {
        if (isSafe(row, col, n)) {
            board[row][col] = 1;
            if (solveNQueens(row + 1, n))
                return true;
            board[row][col] = 0;
        }
    }
    return false;
}

int main() {
    int n;
    printf("Enter the value of N (for N x N board): ");
    scanf("%d", &n);
    
    if (solveNQueens(0, n)) {
        printBoard(n);
    } else {
        printf("Solution does not exist\n");
    }
    
    return 0;
}
`
    };

    // Add click event to all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const programId = card.getAttribute('data-program');
            let cppCode = cppPrograms[programId];
            
            // Handle special case for Program 3b which references Program 4
            if (programId === "3b" && typeof cppCode === "number") {
                cppCode = cppPrograms[cppCode];
            }
            
            // Copy to clipboard
            navigator.clipboard.writeText(cppCode)
                .then(() => {
                    // Show the "Copied!" message
                    const message = card.querySelector('.copied-message');
                    message.classList.add('show-message');
                    
                    // Update status bar subtly
                    const statusBar = document.querySelector('.status-bar span:first-child');
                    statusBar.textContent = 'file saved';
                    
                    // Hide the message after 1 second
                    setTimeout(() => {
                        message.classList.remove('show-message');
                    }, 1000);
                    
                    // Reset status bar after 2 seconds
                    setTimeout(() => {
                        statusBar.textContent = 'Ready';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    });
    
    // Menu bar interactions - keep subtle
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Do nothing visible
        });
    });
    
    // Window controls - keep subtle
    const closeBtn = document.querySelector('.control.close');
    const maximizeBtn = document.querySelector('.control.maximize');
    const minimizeBtn = document.querySelector('.control.minimize');
    
    closeBtn.addEventListener('click', () => {
        // Do nothing visible
    });
    
    maximizeBtn.addEventListener('click', () => {
        document.querySelector('.container').classList.toggle('maximized');
    });
    
    minimizeBtn.addEventListener('click', () => {
        // Do nothing visible
    });
}); 