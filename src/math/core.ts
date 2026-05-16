import { d } from "./factory";
import { Numeric, Decimal } from "./types";

/**
 * 核心運算封裝。
 * 讓同事用 add(a, b) 而不是 a.plus(b)。
 * 接受混和類型 (number, string, Decimal)，極大化易用性。
 */

export const add = (a: Numeric, b: Numeric): Decimal => d(a).plus(d(b));
export const sub = (a: Numeric, b: Numeric): Decimal => d(a).minus(d(b));
export const mul = (a: Numeric, b: Numeric): Decimal => d(a).times(d(b));
export const div = (a: Numeric, b: Numeric): Decimal => d(a).div(d(b));

/**
 * 比較運算。
 */
export const gt = (a: Numeric, b: Numeric): boolean => d(a).gt(d(b));
export const gte = (a: Numeric, b: Numeric): boolean => d(a).gte(d(b));
export const lt = (a: Numeric, b: Numeric): boolean => d(a).lt(d(b));
export const lte = (a: Numeric, b: Numeric): boolean => d(a).lte(d(b));
export const eq = (a: Numeric, b: Numeric): boolean => d(a).eq(d(b));

/**
 * 鏈式計算輔助 (Fluency API)。
 * 同事如果覺得 add(add(a, b), c) 太醜，可以用 calc(a).add(b).add(c).val()。
 */
class Calculator {
    private result: Decimal;

    constructor(initialValue: Numeric) {
        this.result = d(initialValue);
    }

    add(val: Numeric) {
        this.result = this.result.plus(d(val));
        return this;
    }

    sub(val: Numeric) {
        this.result = this.result.minus(d(val));
        return this;
    }

    mul(val: Numeric) {
        this.result = this.result.times(d(val));
        return this;
    }

    div(val: Numeric) {
        this.result = this.result.div(d(val));
        return this;
    }

    val(): Decimal {
        return this.result;
    }

    toNumber(): number {
        return Number(this.result.toFixed());
    }
}

export const calc = (initialValue: Numeric) => new Calculator(initialValue);
