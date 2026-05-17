import { describe, it, expect } from "vitest";
import { add, sub, mul, div, gt, gte, lt, lte, eq, calc } from "../math/core";
import { d, toNumber, format } from "../math/factory";

describe("整合測試 - 圖表運算場景", () => {
  describe("圖表數據運算", () => {
    it("應該正確計算價格加稅", () => {
      const price = 99.99;
      const taxRate = 0.05;
      const tax = mul(price, taxRate);
      const total = add(price, tax);
      expect(total.toString()).toBe("104.9895");
    });

    it("應該正確計算百分比變化", () => {
      const oldValue = 100;
      const newValue = 150;
      const change = sub(newValue, oldValue);
      const percentChange = div(mul(change, 100), oldValue);
      expect(percentChange.toString()).toBe("50");
    });

    it("應該正確計算加權平均", () => {
      // (value1 * weight1 + value2 * weight2) / (weight1 + weight2)
      const value1 = 80;
      const weight1 = 3;
      const value2 = 90;
      const weight2 = 2;

      const weightedSum = add(mul(value1, weight1), mul(value2, weight2));
      const totalWeight = add(weight1, weight2);
      const weightedAvg = div(weightedSum, totalWeight);

      expect(weightedAvg.toString()).toBe("84");
    });

    it("應該處理圖表座標轉換", () => {
      const dataValue = 75;
      const minVal = 0;
      const maxVal = 100;
      const pixelHeight = 500;

      // normalized = (value - min) / (max - min)
      // pixel = normalized * height
      const normalized = div(sub(dataValue, minVal), sub(maxVal, minVal));
      const pixel = mul(normalized, pixelHeight);

      expect(pixel.toString()).toBe("375");
    });
  });

  describe("混合類型運算", () => {
    it("應該處理 number + string", () => {
      expect(add(10, "20.5").toString()).toBe("30.5");
    });

    it("應該處理 string + number", () => {
      expect(add("10.5", 20).toString()).toBe("30.5");
    });

    it("應該處理 Decimal + number", () => {
      expect(add(d("10"), 5).toString()).toBe("15");
    });

    it("應該處理 Decimal + string", () => {
      expect(add(d("10"), "5.5").toString()).toBe("15.5");
    });

    it("應該處理所有運算的混合類型", () => {
      expect(sub("10", 3).toString()).toBe("7");
      expect(mul("4", 5).toString()).toBe("20");
      expect(div("10", 2).toString()).toBe("5");
    });

    it("應該處理比較運算的混合類型", () => {
      expect(gt("10", 5)).toBe(true);
      expect(lte(5, "5")).toBe(true);
      expect(eq("3.14", 3.14)).toBe(true);
    });
  });

  describe("邊界值測試", () => {
    it("應該處理極大數值", () => {
      const result = add("1e15", "1e15");
      expect(result.toString()).toBe("2000000000000000");
    });

    it("應該處理極小數值", () => {
      const result = add("1e-15", "1e-15");
      expect(result.toString()).toBe("2e-15");
    });

    it("應該處理極長小數", () => {
      const a = "0.12345678901234567890";
      const b = "0.09876543210987654321";
      const result = add(a, b);
      expect(result.toString()).not.toBe("0");
    });

    it("應該處理負零", () => {
      const result = sub(0, 0);
      expect(result.toString()).toBe("0");
    });

    it("應該處理非常大的整數", () => {
      const result = mul("999999999999", "999999999999");
      // big.js 對大數使用科學記號，用 toFixed() 取得完整表示
      expect(result.toFixed()).toBe("999999999998000000000001");
    });
  });

  describe("錯誤處理與降級", () => {
    it("應該對無效輸入降級為 0", () => {
      const result = d("invalid");
      expect(result.toString()).toBe("0");
    });

    it("應該在運算中使用降級值", () => {
      const result = add("invalid", "5");
      expect(result.toString()).toBe("5");
    });

    it("應該處理空字串", () => {
      const result = d("");
      expect(result.toString()).toBe("0");
    });
  });

  describe("完整工作流: 圖表數據處理", () => {
    it("應該完成從數據到渲染的完整流程", () => {
      // 1. 原始數據 (可能來自 API)
      const rawData = ["100.123456789", "200.987654321", "150.555555555"];

      // 2. 計算總和
      const sum = calc(rawData[0])
        .add(rawData[1])
        .add(rawData[2])
        .val();
      expect(sum.toString()).toBe("451.666666665");

      // 3. 計算平均值
      const avg = div(sum, 3);
      expect(avg.toString()).toContain("150");

      // 4. 格式化顯示 (150.555... 四捨五入為 150.56)
      const formatted = format(avg, 2);
      expect(formatted).toBe("150.56");

      // 5. 轉為 number 供渲染引擎使用
      const renderValue = toNumber(avg);
      expect(typeof renderValue).toBe("number");
    });

    it("應該處理圖表數據範圍計算", () => {
      const data = [10, 25, 8, 42, 19, 37];

      // 找最大值和最小值
      let max = d(data[0]);
      let min = d(data[0]);
      for (let i = 1; i < data.length; i++) {
        if (gt(data[i], max)) max = d(data[i]);
        if (lt(data[i], min)) min = d(data[i]);
      }

      expect(max.toString()).toBe("42");
      expect(min.toString()).toBe("8");

      // 計算範圍
      const range = sub(max, min);
      expect(range.toString()).toBe("34");
    });

    it("應該處理移動平均計算", () => {
      const data = [10, 15, 20, 25, 30];
      const windowSize = 3;

      // 計算第一個移動平均: (10 + 15 + 20) / 3
      const firstMA = div(add(add(data[0], data[1]), data[2]), windowSize);
      expect(firstMA.toString()).toBe("15");

      // 計算第二個移動平均: (15 + 20 + 25) / 3
      const secondMA = div(add(add(data[1], data[2]), data[3]), windowSize);
      expect(secondMA.toString()).toBe("20");
    });
  });

  describe("精度驗證", () => {
    it("應該避免 JavaScript 浮點數經典問題", () => {
      // JavaScript: 0.1 + 0.2 = 0.30000000000000004
      expect(add(0.1, 0.2).toString()).toBe("0.3");
    });

    it("應該保持多位小數的精度", () => {
      const result = add("1.00000000000000000001", "2.00000000000000000002");
      expect(result.toString()).toBe("3.00000000000000000003");
    });

    it("應該在乘法中保持精度", () => {
      // JavaScript: 0.7 * 100 = 70.00000000000001
      expect(mul(0.7, 100).toString()).toBe("70");
    });

    it("應該在除法中保持精度", () => {
      const result = div(0.3, 0.1);
      // 應該是 3，不是 2.9999999999999996
      expect(result.toString()).toBe("3");
    });
  });
});
