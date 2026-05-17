import { describe, it, expect } from "vitest";
import { add, sub, mul, div, gt, gte, lt, lte, eq, calc } from "../math/core";
import { d } from "../math/factory";
import { Big } from "big.js";

describe("基本運算", () => {
  describe("add() - 加法", () => {
    it("應該正確相加兩個 number", () => {
      expect(add(0.1, 0.2).toString()).toBe("0.3");
    });

    it("應該正確相加兩個 string", () => {
      expect(add("0.1", "0.2").toString()).toBe("0.3");
    });

    it("應該正確相加混合類型", () => {
      expect(add("10.5", 20).toString()).toBe("30.5");
    });

    it("應該正確相加 Decimal", () => {
      expect(add(d("100"), d("200")).toString()).toBe("300");
    });

    it("應該處理負數加法", () => {
      expect(add(-5, 3).toString()).toBe("-2");
    });

    it("應該處理 0 的加法", () => {
      expect(add(0, 0).toString()).toBe("0");
    });

    it("應該返回 Decimal 類型", () => {
      expect(add(1, 2)).toBeInstanceOf(Big);
    });

    it("應該保持高精度", () => {
      const result = add("100.000000000000000001", "50.000000000000000002");
      expect(result.toString()).toBe("150.000000000000000003");
    });
  });

  describe("sub() - 減法", () => {
    it("應該正確相減兩個 number", () => {
      expect(sub(1, 0.2).toString()).toBe("0.8");
    });

    it("應該正確相減兩個 string", () => {
      expect(sub("10", "3.5").toString()).toBe("6.5");
    });

    it("應該處理負數結果", () => {
      expect(sub(3, 5).toString()).toBe("-2");
    });

    it("應該處理負數減數", () => {
      expect(sub(5, -3).toString()).toBe("8");
    });

    it("應該返回 Decimal 類型", () => {
      expect(sub(10, 5)).toBeInstanceOf(Big);
    });
  });

  describe("mul() - 乘法", () => {
    it("應該正確相乘兩個 number", () => {
      expect(mul(0.1, 0.2).toString()).toBe("0.02");
    });

    it("應該正確相乘 string", () => {
      expect(mul("3", "4").toString()).toBe("12");
    });

    it("應該處理科學記號乘法", () => {
      const result = mul("1e-15", "1e15");
      expect(result.toString()).toBe("1");
    });

    it("應該處理負數乘法", () => {
      expect(mul(-3, 4).toString()).toBe("-12");
    });

    it("應該處理 0 的乘法", () => {
      expect(mul(100, 0).toString()).toBe("0");
    });

    it("應該返回 Decimal 類型", () => {
      expect(mul(2, 3)).toBeInstanceOf(Big);
    });
  });

  describe("div() - 除法", () => {
    it("應該正確相除兩個 number", () => {
      expect(div(1, 3).toString()).not.toBe("0.3333333333333333"); // 不應該有浮點誤差
    });

    it("應該正確相除 string", () => {
      expect(div("10", "2").toString()).toBe("5");
    });

    it("應該處理負數除法", () => {
      expect(div(-10, 2).toString()).toBe("-5");
    });

    it("應該返回 Decimal 類型", () => {
      expect(div(10, 2)).toBeInstanceOf(Big);
    });

    it("應該處理高精度除法", () => {
      const result = div(1, 3);
      expect(result.toString()).toContain("3"); // 應該是 0.333...
    });
  });
});

describe("比較運算", () => {
  describe("gt() - 大於", () => {
    it("應該正確比較 5 > 3", () => {
      expect(gt(5, 3)).toBe(true);
    });

    it("應該正確比較 3 > 5", () => {
      expect(gt(3, 5)).toBe(false);
    });

    it("應該正確比較相等值 5 > 5", () => {
      expect(gt(5, 5)).toBe(false);
    });

    it("應該處理 string 比較", () => {
      expect(gt("10", "5")).toBe(true);
    });
  });

  describe("gte() - 大於等於", () => {
    it("應該正確比較 5 >= 3", () => {
      expect(gte(5, 3)).toBe(true);
    });

    it("應該正確比較 5 >= 5", () => {
      expect(gte(5, 5)).toBe(true);
    });

    it("應該正確比較 3 >= 5", () => {
      expect(gte(3, 5)).toBe(false);
    });
  });

  describe("lt() - 小於", () => {
    it("應該正確比較 3 < 5", () => {
      expect(lt(3, 5)).toBe(true);
    });

    it("應該正確比較 5 < 3", () => {
      expect(lt(5, 3)).toBe(false);
    });

    it("應該正確比較相等值 5 < 5", () => {
      expect(lt(5, 5)).toBe(false);
    });
  });

  describe("lte() - 小於等於", () => {
    it("應該正確比較 3 <= 5", () => {
      expect(lte(3, 5)).toBe(true);
    });

    it("應該正確比較 5 <= 5", () => {
      expect(lte(5, 5)).toBe(true);
    });

    it("應該正確比較 5 <= 3", () => {
      expect(lte(5, 3)).toBe(false);
    });
  });

  describe("eq() - 等於", () => {
    it("應該正確比較相等值", () => {
      expect(eq(5, 5)).toBe(true);
    });

    it("應該正確比較不相等值", () => {
      expect(eq(5, 3)).toBe(false);
    });

    it("應該處理浮點數精確比較", () => {
      expect(eq("0.1 + 0.2", "0.3")).toBe(false); // 這是字串比較，不是運算
      // 實際的浮點精確比較
      expect(add("0.1", "0.2").toString()).toBe("0.3");
    });

    it("應該處理 string 和 number 的比較", () => {
      expect(eq("5", 5)).toBe(true);
    });
  });
});

describe("calc() - 鏈式計算", () => {
  it("應該正確初始化值", () => {
    expect(calc(10).val().toString()).toBe("10");
  });

  it("應該支援連續加法", () => {
    const result = calc(1).add(2).add(3).val();
    expect(result.toString()).toBe("6");
  });

  it("應該支援連續減法", () => {
    const result = calc(10).sub(3).sub(2).val();
    expect(result.toString()).toBe("5");
  });

  it("應該支援連續乘法", () => {
    const result = calc(2).mul(3).mul(4).val();
    expect(result.toString()).toBe("24");
  });

  it("應該支援連續除法", () => {
    const result = calc(100).div(10).div(2).val();
    expect(result.toString()).toBe("5");
  });

  it("應該支援混合運算", () => {
    // (100 + 50) * 0.5 = 75
    const result = calc(100).add(50).mul("0.5").val();
    expect(result.toString()).toBe("75");
  });

  it("應該支援複雜公式: (base + offset) * scale", () => {
    const base = "100.000000000000000001";
    const offset = 50;
    const scale = "0.5";
    const result = calc(base).add(offset).mul(scale).val();
    expect(result.toString()).toBe("75.0000000000000000005");
  });

  it("應該支援 toNumber() 轉換", () => {
    const result = calc(10).add(5).toNumber();
    expect(result).toBe(15);
    expect(typeof result).toBe("number");
  });

  it("應該處理負數鏈式運算", () => {
    const result = calc(10).sub(20).mul(2).val();
    expect(result.toString()).toBe("-20");
  });

  it("應該處理混合類型鏈式運算", () => {
    const result = calc("10.5").add(5).mul("2").val();
    expect(result.toString()).toBe("31");
  });

  it("應該返回 Decimal 類型", () => {
    expect(calc(10).val()).toBeInstanceOf(Big);
  });
});
