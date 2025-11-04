export type BetResult = "unknown" | "win" | "lose";

export type BetType = {
  id: number;
  name: string;
  betAmount: string;
  coef: string;
  result: BetResult;
};

export type DayType = {
  startBalance?: number | string;
  bets?: BetType[];
};

export type DaysType = Record<string, DayType>;
