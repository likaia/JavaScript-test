import { Graph, breadthFirstSearch, BFS } from "./lib/Graph.ts";
import Stack from "../StackTest/lib/Stack.ts";

const graph = new Graph();
const vertices = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
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
