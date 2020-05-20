import Stack from "./lib/Stack.ts";

const stack = new Stack();
stack.push("aa");
stack.push("bb");
stack.push("cc");
stack.pop();
console.log(stack.peek())
console.log(stack.size());
console.log(stack.isEmpty());