import { Graph, breadthFirstSearch, BFS, depthFirstSearch, DFS } from "./lib/Graph.ts";
import Stack from "../StackTest/lib/Stack.ts";

let graph = new Graph();
let vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
for (let i = 0; i < vertices.length; i++) {
    graph.addVertex(vertices[i]);
}
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("C", "D");
graph.addEdge("C", "G");
graph.addEdge("D", "G");
graph.addEdge("D", "H");
graph.addEdge("B", "E");
graph.addEdge("B", "F");
graph.addEdge("E", "I");
console.log("图的关系对应如下");
console.log(graph.toString());
// 测试广度优先搜索
const printVertices = (val) => {
    console.log(val);
};
console.log("广度优先搜索访问顺序");
breadthFirstSearch(graph, vertices[0], printVertices);
// 用bfs求最短路径
const shortestPaths = BFS(graph, vertices[0]);
console.log(shortestPaths);
/**
 通过前溯点列表获取顶点A到其他顶点的路径
 */
// 用顶点A作为源顶点
const fromVertex = vertices[0];
// 遍历除过源顶点外的顶点
for (let i = 1; i < vertices.length; i++) {
    // 获取A抵达的顶点
    const toVertex = vertices[i];
    // 创建一个栈来存储路径值
    const path = new Stack();
    // 追溯toVertex到fromVertex的路径，变量v赋值为其前溯点的值
    for (let v = toVertex; v !== fromVertex; v = shortestPaths.predecessors[v]) {
        // v入栈
        path.push(v);
    }
    // 源顶点入栈
    path.push(fromVertex);
    let s = path.pop();
    while (!path.isEmpty()) {
        s += " - " + path.pop();
    }
    console.log(s);
}

// 测试深度优先搜索
console.log("深度优先搜索节点访问顺序");
depthFirstSearch(graph, printVertices);
// 测试优化后的深度优先搜索
console.log(DFS(graph));

// 实现拓扑排序
graph = new Graph(true);
vertices = ["A", "B", "C", "D", "E", "F"];
for (let i = 0; i < vertices.length; i++) {
    graph.addVertex(vertices[i]);
}
graph.addEdge("A", "C");
graph.addEdge("A", "D");
graph.addEdge("B", "D");
graph.addEdge("B", "E");
graph.addEdge("C", "F");
graph.addEdge("F", "E");
const result = DFS(graph);
console.log("拓扑排序");
console.log(result);
const fTimes = result.finished;
let s = "";
for (let count = 0; count < vertices.length; count++) {
    let max = 0;
    let maxName = null;
    for (let i = 0; i < vertices.length; i++) {
        if (fTimes[vertices[i]] > max) {
            max = fTimes[vertices[i]];
            maxName = vertices[i];
        }
    }
    s += maxName + " - ";
    delete fTimes[maxName];
}
console.log(s);
