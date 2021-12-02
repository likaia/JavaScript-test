import Lottery from "./lib/Lottery.ts";

const peoples: string[] = [
    "huqy",
    "一只鱼呀",
    "套路",
    "NeverSettle",
    "no badly",
    "你是年少的欢喜",
    "^",
    "gzg",
    "最好的我们",
    "江凉皮",
    "刘坤",
    "琦",
    "西柚",
    "wzx°",
    "犹豫就会败北",
    "伴",
    "星星会发光",
    "。",
    "栀子花开",
    "",
    "Space.",
    "南笙",
    "Music-Man",
    "SS",
    "夜色之深。",
    "余生勿思量",
    "go fun()",
    "Crayon",
    "寅",
    "J1nvey",
    "龑",
    "我脸红了",
    "zhbzhb",
    "流小枫",
    "有趣",
    "欢乐马",
    "神经蛙",
    "三无肥宅",
    "皮卡胖",
    " pccilpp",
    "莫凡",
    "PotaTo",
    "W",
    "Die Job Death Car?",
    "鱼翔涌底",
    "嘎嘎",
    "wi",
    "褚俊"
];

console.log("开始抽奖，参与人数: ", peoples.length);
const lottery = new Lottery(peoples, 1);
lottery.start();
console.log(lottery.getResult());
console.log("抽奖结束");
