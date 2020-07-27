import Dictionary from "../../DictionaryTest/lib/Dictionary.ts";
import Queue from "../../QueueTest/lib/Queue.ts";

/**
 * 声明枚举，用于描述顶点的访问状态
 * 1 顶点没有被访问
 * 2 顶点被访问过，但并未被探索过
 * 3 顶点已经被访问且被完全探索过
 */
export enum Colors {
    WHITE = 1,
    GERY = 2,
    BLACK = 3
}

/**
 * 顶点初始化
 * @param vertices 顶点列表
 */
const initializeColor = (vertices: (number | string)[]) => {
    const color: { [key: string]: number } = {};
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
};

/**
 * 广度优先搜索
 * @param graph 需要进行搜索的图
 * @param startVertex 开始顶点
 * @param callback 得到每个节点后的回调函数
 */
export const breadthFirstSearch = (graph: Graph, startVertex: string | number, callback: (val: string | number) => void): void => {
    // 获取图的所有顶点
    const vertices = graph.getVertices();
    // 获取图的临接表
    const adjList = graph.getAdjList();
    // 将顶点进行初始化
    const color = initializeColor(vertices);
    // 实例化一个队列
    const queue = new Queue();
    // 将开始顶点入队
    queue.enqueue(startVertex);
    // 如果队列不为空就继续执行
    while (!queue.isEmpty()) {
        // 取出队列里存储的顶点u
        const u = queue.dequeue();
        // 获取取出顶点的临接表
        const neighbors = <(string | number)[]>adjList.get(u);
        // 将顶点列表里的u标识为已被访问但未被探索
        color[u] = Colors.GERY;
        // 遍历当前取出顶点的临接表
        for (let i = 0; i < neighbors.length; i++) {
            // 获取临接表中的每个顶点w
            const w = neighbors[i];
            // 如果w没被访问过
            if (color[w] === Colors.WHITE) {
                // 标识w为已被访问但未被探索
                color[w] = Colors.GERY;
                // 将w加入队列
                queue.enqueue(w);
            }
        }
        // 此时u顶点与其相邻顶点已经被探索，将u标识为已被访问且被完全探索
        color[u] = Colors.BLACK;
        // 执行回调函数
        if (callback) {
            callback(u);
        }
    }
};

/**
 * 广度优先搜索优化
 * @param graph 要进行遍历的图
 * @param startVertex 开始顶点
 * @constructor
 */
export const BFS = (
    graph: Graph,
    startVertex: string | number
): { distances: { [key: string]: string | number }; predecessors: { [key: string]: string | number | null } } => {
    // 获取图的所有顶点
    const vertices = <(string | number)[]>graph.getVertices();
    // 获取图的临接表
    const adjList = graph.getAdjList();
    // 初始化顶点颜色
    const color = initializeColor(vertices);
    // 创建一个队列
    const queue = new Queue();
    // 存储每个顶点的距离
    const distances: { [key: string]: string | number } = {};
    // 存储前溯点
    const predecessors: { [key: string]: string | null | number } = {};
    // 顶点入队
    queue.enqueue(startVertex);

    // 遍历所有顶点
    for (let i = 0; i < vertices.length; i++) {
        // 用0来初始化每个顶点的距离
        distances[vertices[i]] = 0;
        // 用null来初始化每个顶点的前溯点
        predecessors[vertices[i]] = null;
    }

    while (!queue.isEmpty()) {
        // 获取队首顶点u
        const u = queue.dequeue();
        // 获取u的临接表
        const neighbors = <(string | number)[]>adjList.get(u);
        // u标识为已访问但未被探索状态
        color[u] = Colors.GERY;
        // 遍历u的临接表
        for (let i = 0; i < neighbors.length; i++) {
            // 获取临接表中遍历到的顶点w
            const w = neighbors[i];
            // 如果顶点w未被访问
            if (color[w] === Colors.WHITE) {
                // 标识顶点w为已访问但为被探索
                color[w] = Colors.GERY;
                // 给u顶点加1来增加v和w之间的距离（u是w的前溯点）
                distances[w] = <number>distances[u] + 1;
                // 发现顶点u的邻点w时，则设置w的前溯点值为u
                predecessors[w] = u;
                // w入栈
                queue.enqueue(w);
            }
        }
    }
    return {
        distances,
        predecessors
    };
};

/**
 * 深度优先搜索
 * @param graph 要进行遍历的图
 * @param callback 回调函数
 */
export const depthFirstSearch = (graph: Graph, callback: (val: string | number) => void): void => {
    // 获取图的顶点
    const vertices = graph.getVertices();
    // 获取图的临接表
    const adjList = graph.getAdjList();
    // 初始化顶点
    const color = initializeColor(vertices);

    for (let i = 0; i < vertices.length; i++) {
        // 如果当前顶点未被访问
        if (color[vertices[i]] === Colors.WHITE) {
            // 调用递归函数进行递归访问
            depthFirstSearchVisit(vertices[i], color, adjList, callback);
        }
    }
};

/**
 * 递归访问顶点
 * @param u 要访问的顶点
 * @param color 颜色对象
 * @param adjList 图的临接表
 * @param callback 回调函数
 */
const depthFirstSearchVisit = (
    u: string | number,
    color: { [p: string]: number },
    adjList: Dictionary<string | number, (string | number)[]>,
    callback: (val: string | number) => void
) => {
    // 顶点u访问后，标识为已访问但未被探索状态
    color[u] = Colors.GERY;
    // 执行回调函数
    if (callback) {
        callback(u);
    }
    // 获取当前顶点的临接表
    const neighbors = <string | number[]>adjList.get(u);
    // 遍历临接表
    for (let i = 0; i < neighbors.length; i++) {
        // 获取临接表的每个顶点w
        const w = neighbors[i];
        // 如果w未被访问则以w为顶点进行递归访问
        if (color[w] === Colors.WHITE) {
            depthFirstSearchVisit(w, color, adjList, callback);
        }
    }
    // u标识为已被完全探索
    color[u] = Colors.BLACK;
};

/**
 * 优化后的深度优先搜索
 * @param graph 要进行搜索的图
 * @constructor
 */
export const DFS = (
    graph: Graph
): { predecessors: { [key: string]: string | number | null }; discovery: { [key: string]: string | number }; finished: { [key: string]: string | number } } => {
    const vertices = <(number | string)[]>graph.getVertices();
    const adjList = graph.getAdjList();
    const color = initializeColor(vertices);
    const d: { [key: string]: string | number } = {};
    const f: { [key: string]: string | number } = {};
    const p: { [key: string]: string | number | null } = {};
    const time: { [key: string]: number } = { count: 0 };
    for (let i = 0; i < vertices.length; i++) {
        f[vertices[i]] = 0;
        d[vertices[i]] = 0;
        p[vertices[i]] = null;
    }
    for (let i = 0; i < vertices.length; i++) {
        if (color[vertices[i]] === Colors.WHITE) {
            // 从i顶点开始递归访问
            DFSVisit(vertices[i], color, d, f, p, time, adjList);
        }
    }

    return {
        discovery: d,
        finished: f,
        predecessors: p
    };
};

/**
 * 递归访问顶点
 * @param u 要访问的顶点
 * @param color 颜色对象
 * @param d 顶点初次发现时间
 * @param f 顶点完成访问时间
 * @param p 前溯点
 * @param time 初始时间
 * @param adjList 临接表
 * @constructor
 */
const DFSVisit = (
    u: string | number,
    color: { [p: string]: number },
    d: { [key: string]: string | number },
    f: { [key: string]: string | number },
    p: { [key: string]: string | number | null },
    time: { [key: string]: number },
    adjList: Dictionary<string | number, (string | number)[]>
) => {
    // 顶点u被发现但未被探索
    color[u] = Colors.GERY;
    // 记录顶点u的初次发现时间
    d[u] = ++time["count"];
    // 获取顶点u的临接表
    const neighbors = <(string | number)[]>adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
        // 获取w临接点
        const w = neighbors[i];
        // 如果w未被访问，存储w的前溯点，以w未顶点继续递归访问
        if (color[w] === Colors.WHITE) {
            p[w] = u;
            DFSVisit(w, color, d, f, p, time, adjList);
        }
    }
    // 顶点被完全访问
    color[u] = Colors.BLACK;
    // 记录顶点完成访问时间
    f[u] = ++time["count"];
};

export class Graph {
    // 存储图的顶点
    private vertices: (number | string)[] = [];
    // 存储临接表
    private adjList: Dictionary<string | number, (string | number)[]> = new Dictionary();

    constructor(private isDirected: boolean = false) {}

    // 添加顶点
    addVertex(v: string | number): void {
        // 顶点不存在于图中
        if (!this.vertices.includes(v)) {
            // 将该顶点添加到顶点列表中
            this.vertices.push(v);
            // 在临接表中设置顶点v作为键，对应的字典值为一个空数组
            this.adjList.set(v, []);
        }
    }

    // 添加线，连接顶点
    addEdge(v: string | number, w: string | number): void {
        // 添加顶点之前需要验证顶点v和w是否在图中，不存在就追加
        if (!this.adjList.get(v)) {
            this.addVertex(v);
        }
        if (!this.adjList.get(w)) {
            this.addVertex(w);
        }

        // 将w加入到v的临接表中，我们就得到了一条来自顶点v到顶点w的边
        this.adjList.get(v)?.push(w);
        if (!this.isDirected) {
            // 如果是无向图则需要添加一条自w到v的边
            this.adjList.get(w)?.push(v);
        }
    }

    // 获取顶点列表
    getVertices(): (string | number)[] {
        return this.vertices;
    }

    // 获取临接表
    getAdjList(): Dictionary<string | number, (string | number)[]> {
        return this.adjList;
    }

    // 将图转为字符串
    toString(): string {
        let s = "";
        for (let i = 0; i < this.vertices.length; i++) {
            s += `${this.vertices[i]} -> `;
            const neighbors = <Array<string | number>>this.adjList.get(this.vertices[i]);
            for (let j = 0; j < neighbors.length; j++) {
                s += `${neighbors[j]} `;
            }
            s += "\n";
        }
        return s;
    }
}
