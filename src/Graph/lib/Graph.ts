import Dictionary from "../../DictionaryTest/lib/Dictionary.ts";

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

const initializeColor = (vertices: (number | string)[]) => {
    const color: { [key: string]: number } = {};
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE;
    }
    return color;
};

export default class Graph {
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
