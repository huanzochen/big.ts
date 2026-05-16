import { d, add, mul, calc, toNumber, format } from "./math";

console.log("=== Chart System Math Wrapper Demo ===\n");

function test() {

// 1. 同事最習慣的寫法：直接傳入 number 或 string
const price = 0.1;
const tax = 0.2;
const total = add(price, tax); // 不用 new Big()
console.log(`[基本加法] 0.1 + 0.2 = ${total.toString()} (精確！)`);

// 2. 處理科學記號 (1e-15 ~ 1e15)
const small = "1e-15";
const large = "1e15";
const result = mul(small, large);
console.log(`[科學記號] ${small} * ${large} = ${result.toFixed()}`);

// 3. 鏈式調用：適合複雜公式
// 公式：(base + offset) * scale
const base = "100.000000000000000001";
const offset = 50;
const scale = "0.5";

const finalVal = calc(base)
    .add(offset)
    .mul(scale)
    .val();

console.log(`[鏈式計算] 結果: ${finalVal.toFixed()}`);

// 4. 渲染層對接：轉回 number
const rawNumber = toNumber(finalVal);
console.log(`[渲染對接] 轉回原生 number: ${rawNumber} (Type: ${typeof rawNumber})`);

// 5. 格式化輸出
console.log(`[格式化] 保留兩位小數: ${format(finalVal, 2)}`);

// 6. 混合類型運算
const mixed = add("10.5", 20);
console.log(`[混合類型] "10.5" + 20 = ${mixed.toString()}`);
}

test();
