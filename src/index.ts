import big from "big.js";

// 设置精度
big.RM = big.roundHalfUp; // 四舍五入模式

// 基本运算
const a = new Big("100.12345678901234567890");
const b = new Big("99.98765432109876543210");

console.log("a =", a.toString());
console.log("b =", b.toString());
console.log("a + b =", a.plus(b).toString());
console.log("a - b =", a.minus(b).toString());
console.log("a * b =", a.times(b).toString());
console.log("a / b =", a.div(b).dp(10).toString());

// 大数运算
const huge1 = new Big("9007199254740992.123"); // 超过 Number.MAX_SAFE_INTEGER
const huge2 = new Big("9007199254740993.456");

console.log("\n--- 大数运算 ---");
console.log("huge1 =", huge1.toString());
console.log("huge2 =", huge2.toString());
console.log("huge1 + huge2 =", huge1.plus(huge2).toString());
console.log("huge1 * huge2 =", huge1.times(huge2).toString());

// 精度控制
console.log("\n--- 精度控制 ---");
const pi = new Big("3.141592653589793238462643383279");
console.log("pi (20dp) =", pi.dp(20).toString());
console.log("pi (10dp) =", pi.dp(10).toString());
console.log("pi (2dp)  =", pi.dp(2).toString());

// 比较
console.log("\n--- 比较 ---");
console.log("a > b:", a.gt(b));
console.log("a < b:", a.lt(b));
console.log("a == b:", a.eq(b));
