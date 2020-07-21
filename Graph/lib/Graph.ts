import Dictionary from "../../DictionaryTest/lib/Dictionary.ts";

export default class Graph<T> {
    // 存储图的顶点
    private vertices: T[];
    // 存储临接表
    private adjList: Dictionary<string, T>;
    constructor(private isDirected: boolean = false) {
        this.isDirected = isDirected;
        this.vertices = [];
        this.adjList = new Dictionary<string, T>();
    }
}
