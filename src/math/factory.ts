import { Big } from "big.js";
import { Decimal, Numeric } from "./types";

// 全域精度設定
Big.RM = 1; // Rounding Mode: Half-Up
Big.DP = 20; // Decimal Places for division

/**
 * 將各種輸入安全轉化為 Decimal。
 * 處理了 big.js 原生不支援科學記號 (1e-15) 的限制。
 */
export function d(input: Numeric): Decimal {
    if (input instanceof Big) {
        return input;
    }

    try {
        // 如果是 number 且帶有科學記號，Big(number) 是 OK 的
        // 如果是 string 且帶有科學記號，Big(string) 會報錯，
        // 所以我們先將其轉為 number 再轉為 Big，或者統一轉為 string。
        if (typeof input === "string" && (input.includes("e") || input.includes("E"))) {
            const num = Number(input);
            if (isNaN(num)) throw new Error(`Invalid numeric string: ${input}`);
            return new Big(num);
        }
        
        return new Big(input);
    } catch (error) {
        console.error(`[Math] Failed to parse value: ${input}`, error);
        return new Big(0); // 降級處理
    }
}

/**
 * 將 Decimal 轉回原生 number，供渲染引擎使用。
 */
export function toNumber(val: Numeric): number {
    if (typeof val === "number") return val;
    const decimal = d(val);
    return Number(decimal.toFixed());
}

/**
 * 格式化輸出。
 */
export function format(val: Numeric, dp?: number): string {
    const decimal = d(val);
    return dp !== undefined ? decimal.toFixed(dp) : decimal.toFixed();
}
