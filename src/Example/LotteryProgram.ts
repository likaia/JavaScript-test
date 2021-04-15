import Lottery from "./lib/Lottery.ts";

const peoples: string[] = [
    "夜色之深。",
    "wi",
    "菜菜驴",
    "莫凡",
    "1",
    "🤨",
    "皮得很",
    "一个奕[哇]",
    "不辣",
    "New",
    "一只鱼呀",
    "西柚",
    "呆毛一哥",
    "已幕",
    "南笙",
    "李大侠🐽",
    "澜麟朢",
    "000",
    "W",
    "最好的我们",
    "Hey Judy",
    "挥剑决浮云",
    "🧨",
    "Z",
    "huqy",
    "墨小白",
    "临溪南烛",
    "SS",
    "破罐儿。",
    "🤯",
    "喵爷",
    "撇捺",
    "wzx°",
    "yvlin",
    "须臾",
    "彭忠艳🙊",
    "Sugar👑",
    "大风车",
    "故悯怜人",
    "泛舟",
    "套路",
    "周PatrickStar",
    "鱼骨头",
    "宏强",
    "gzg",
    "Battercake",
    "Jingle",
    "NeverSettle",
    "钱有点少",
    "no badly",
    "zhbzhb",
    "9",
    "鱼翔涌底"
];
const lottery = new Lottery(peoples, 1);
lottery.start();
console.log("开始抽奖，参与人数: ", peoples.length);
console.log(lottery.getResult());
console.log("抽奖结束");
