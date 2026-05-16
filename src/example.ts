import { Big } from "big.js";

/**
 * big.js POC: 大數字運算範例
 *
 * 優點: 輕量 (約 3KB gzipped)、精度高、API 簡單
 * 限制: 僅支援十進位，不支援科學記號 (輸入)
 */

// 1. 全域設定 (Global Configuration)
// RM: Rounding Mode (0: Down, 1: Half-Up, 2: Half-Even, 3: Up)
Big.RM = 1; // 四捨五入
Big.DP = 10; // 預設除法精度 (Decimal Places)

console.log("=== Big.js TypeScript POC ===\n");

// 2. 基本運算 (Basic Arithmetic)
const val1 = new Big("0.1");
const val2 = new Big("0.2");

// JS 原生會得到 0.30000000000000004
console.log(`[精度測試] 0.1 + 0.2 = ${val1.plus(val2).toString()}`);
console.log(`[JS 原生] 0.1 + 0.2 = ${0.1 + 0.2}\n`);

// 3. 超大數字處理 (Handling Large Numbers)
// 超過 Number.MAX_SAFE_INTEGER (9007199254740991)
const large1 = new Big("900719925474099123456789.123456789");
const large2 = new Big("12345678901234567890.123456789");

console.log(`[大數加法] ${large1.plus(large2).toFixed()}`);
console.log(`[大數乘法] ${large1.times(large2).toFixed()}\n`);

// 4. 鏈式調用 (Chaining)
const result = new Big(10)
    .plus(20)
    .times(0.5)
    .minus(5)
    .div(2);
console.log(`[鏈式計算] (10 + 20) * 0.5 - 5 / 2 = ${result.toString()}\n`);

// 5. 比較運算 (Comparison)
const a = new Big("10.00000000000000000001");
const b = new Big("10");

console.log(`[比較測試] a = ${a.toFixed()}`);
console.log(`[比較測試] b = ${b.toFixed()}`);
console.log(`a > b: ${a.gt(b)}`);
console.log(`a < b: ${a.lt(b)}`);
console.log(`a == b: ${a.eq(b)}\n`);

// 6. 捨入與格式化 (Rounding & Formatting)
const pi = new Big("3.1415926535");
console.log(`[格式化] PI to 2 decimal places: ${pi.toFixed(2)}`);
console.log(`[格式化] PI to 5 decimal places: ${pi.toFixed(5)}`);
