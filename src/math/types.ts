import { Big } from "big.js";

/**
 * 我們系統中統一使用的數字類型。
 * 雖然底層是 Big，但透過別名 Decimal，未來若要更換底層庫（如 decimal.js），
 * 影響範圍將被最小化。
 */
export type Decimal = Big;

/**
 * 接受任何可以轉換為數字的輸入。
 */
export type Numeric = string | number | Big;
