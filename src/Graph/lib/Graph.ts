import Dictionary from "../../DictionaryTest/lib/Dictionary.ts";

export default class Graph {
    // 存储图的顶点
    private vertices: (number | string)[] = [];
    // 存储临接表
    private adjList: Dictionary<string | number, (string | number)[]> = new Dictionary();
    constructor(private isDirected: boolean = false) {}

    // 添加顶点
    addVertex(v: string | number): void {
        if (!this.vertices) {
            this.vertices.push(v);
            this.adjList.set(v, []);
        }

        if (this.isDirected) {
            console.log("aa");
        }
    }
}
