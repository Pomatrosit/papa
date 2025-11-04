import type { CSSProperties } from "react";
import type { BetType } from "../types";

export const getBetPayment = (bet: BetType) => {
  switch (bet.result) {
    case "unknown": {
      return 0;
    }

    case "lose": {
      return 0;
    }

    case "win": {
      return +bet.betAmount * +bet.coef;
    }
  }
};

export const getBetIncome = (bet: BetType) => {
  switch (bet.result) {
    case "unknown": {
      return 0;
    }

    case "lose": {
      return -bet.betAmount;
    }

    case "win": {
      return +bet.betAmount * +bet.coef - +bet.betAmount;
    }
  }
};

export const formatCurrency = (number: number) => {
  return new Intl.NumberFormat("ru-RU").format(number);
};

export const getRowStyle = (bet: BetType): CSSProperties => {
  return {
    backgroundColor:
      bet.result === "unknown"
        ? "transparent"
        : bet.result === "lose"
        ? "#fa2d56"
        : "#68cf25",
  };
};
