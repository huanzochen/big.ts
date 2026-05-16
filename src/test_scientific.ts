import { Big } from "big.js";

console.log("=== big.js Scientific Notation Test ===\n");

// 1. Parsing Scientific Notation
try {
    const small = new Big("1e-15");
    const large = new Big("1e15");
    console.log(`Parsed 1e-15: ${small.toFixed()}`);
    console.log(`Parsed 1e15: ${large.toFixed()}`);
} catch (e) {
    console.log("Failed to parse scientific notation directly.");
}

// 2. Outputting Scientific Notation
const val = new Big("0.000000000000001");
console.log(`\nValue: ${val.toFixed()}`);
console.log(`toExponential(): ${val.toExponential()}`);
console.log(`toExponential(2): ${val.toExponential(2)}`);

// 3. Comparison with very small/large values
const v1 = new Big("1e-15");
const v2 = new Big("2e-15");
console.log(`\n1e-15 + 1e-15 = ${v1.plus(v1).toExponential()}`);
console.log(`1e-15 < 2e-15: ${v1.lt(v2)}`);

// 4. Limits
console.log(`\nBig.NE (Negative Exponent limit for toString): ${Big.NE}`);
console.log(`Big.PE (Positive Exponent limit for toString): ${Big.PE}`);
