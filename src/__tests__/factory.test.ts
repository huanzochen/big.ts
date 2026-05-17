import { describe, it, expect } from "vitest";
import { d, toNumber, format } from "../math/factory";
import { Big } from "big.js";

describe("d() - Decimal 工廠函式", () => {
  describe("基本類型轉換", () => {
    it("應該將 number 轉為 Decimal", () => {
      const result = d(42);
      expect(result).toBeInstanceOf(Big);
      expect(result.toString()).toBe("42");
    });

    it("應該將 string 轉為 Decimal", () => {
      const result = d("3.14");
      expect(result).toBeInstanceOf(Big);
      expect(result.toString()).toBe("3.14");
    });

    it("應該將 Big 實例直接返回", () => {
      const big = new Big(100);
      const result = d(big);
      expect(result).toBe(big); // 同一個引用
    });

    it("應該處理 0 值", () => {
      expect(d(0).toString()).toBe("0");
      expect(d("0").toString()).toBe("0");
    });

    it("應該處理負數", () => {
      expect(d(-5).toString()).toBe("-5");
      expect(d("-3.14").toString()).toBe("-3.14");
    });
  });

  describe("科學記號處理", () => {
    it("應該處理小數科學記號 (1e-15)", () => {
      const result = d("1e-15");
      expect(result).toBeInstanceOf(Big);
      expect(result.eq(0)).toBe(false);
    });

    it("應該處理大數科學記號 (1e15)", () => {
      const result = d("1e15");
      expect(result).toBeInstanceOf(Big);
      expect(result.toString()).toBe("1000000000000000");
    });

    it("應該處理大寫 E 的科學記號", () => {
      const result = d("2.5E10");
      expect(result).toBeInstanceOf(Big);
      expect(result.toString()).toBe("25000000000");
    });

    it("應該處理 number 類型的科學記號", () => {
      const result = d(1e-10);
      expect(result).toBeInstanceOf(Big);
      expect(result.eq(0)).toBe(false);
    });
  });

  describe("錯誤處理", () => {
    it("應該對無效字串返回 0", () => {
      const result = d("not_a_number");
      expect(result.toString()).toBe("0");
    });

    it("應該對空字串返回 0", () => {
      const result = d("");
      expect(result.toString()).toBe("0");
    });
  });

  describe("高精度數值", () => {
    it("應該保持高精度字串的精度", () => {
      const result = d("100.000000000000000001");
      expect(result.toString()).toBe("100.000000000000000001");
    });

    it("應該處理極小數值", () => {
      const result = d("0.000000000000001");
      // big.js 對極小值使用科學記號表示
      expect(result.toString()).toBe("1e-15");
      expect(result.eq(0)).toBe(false);
    });
  });
});

describe("toNumber() - 轉回原生 number", () => {
  it("應該將 number 直接返回", () => {
    expect(toNumber(42)).toBe(42);
  });

  it("應該將 Decimal 轉為 number", () => {
    expect(toNumber(d("3.14"))).toBe(3.14);
  });

  it("應該將 string 轉為 number", () => {
    expect(toNumber("100")).toBe(100);
  });

  it("應該處理負數", () => {
    expect(toNumber(d("-2.5"))).toBe(-2.5);
  });

  it("應該處理 0", () => {
    expect(toNumber(d(0))).toBe(0);
  });

  it("返回的應該是 number 類型", () => {
    expect(typeof toNumber(d("123"))).toBe("number");
  });
});

describe("format() - 格式化輸出", () => {
  it("應該返回字串格式", () => {
    expect(typeof format(d("3.14"))).toBe("string");
  });

  it("應該正確格式化不指定小數位數", () => {
    expect(format(d("3.14159"))).toBe("3.14159");
  });

  it("應該保留指定小數位數", () => {
    expect(format(d("3.14159"), 2)).toBe("3.14");
  });

  it("應該保留 4 位小數", () => {
    expect(format(d("1.23"), 4)).toBe("1.2300");
  });

  it("應該處理整數格式化", () => {
    expect(format(d("100"), 2)).toBe("100.00");
  });

  it("應該處理負數格式化", () => {
    expect(format(d("-3.14159"), 3)).toBe("-3.142");
  });

  it("應該從 string 輸入格式化", () => {
    expect(format("2.71828", 3)).toBe("2.718");
  });

  it("應該從 number 輸入格式化", () => {
    expect(format(2.71828, 1)).toBe("2.7");
  });
});
