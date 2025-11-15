import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { dateKey, formatDate } from "../helpers/date";
import type { Dayjs } from "dayjs";
import { type Dispatch, type SetStateAction } from "react";
import type { DaysType, DayType } from "../types";
import {
  formatCurrency,
  getBetIncome,
  getCashInProgress,
} from "../helpers/table";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

type Props = {
  date: Dayjs | null;
  setDate: Dispatch<SetStateAction<Dayjs | null>>;
  currentDay: DayType;
  setDays: Dispatch<SetStateAction<DaysType>>;
};

export const Header = ({ date, setDate, currentDay, setDays }: Props) => {
  const handleBalanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setDays((days) => {
      return {
        ...days,
        [dateKey(date)]: {
          ...currentDay,
          startBalance: value ? +value : "",
        },
      };
    });
  };

  const bets = currentDay?.bets ?? [];

  const balance = currentDay?.startBalance ? +currentDay.startBalance : 0;

  const totalIncome = Math.round(
    bets.reduce((acc, item) => {
      acc += getBetIncome(item);

      return acc;
    }, 0)
  );

  const currentCash = Math.round(
    balance + totalIncome - getCashInProgress(bets)
  );

  const averageCoef =
    bets.reduce((acc, bet) => {
      acc += +bet.coef;

      return acc;
    }, 0) / bets.length;

  return (
    <Box borderBottom="1px solid #ddd" pb={1}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        justifyContent="center"
        mb={2}
        borderBottom="1px solid #ddd"
        pb={1}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <DatePicker
            label="Дата"
            slotProps={{
              textField: {
                size: "small",
              },
            }}
            onChange={(newValue) => setDate(newValue)}
            value={date}
          />
        </Stack>

        <Typography fontWeight={500} fontSize={18}>
          {formatDate(date)}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        mb={2}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography fontSize={16} color="#676767">
            Начальный банк
          </Typography>
          <TextField
            size="small"
            type="number"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">₽</InputAdornment>
                ),
              },
            }}
            sx={{
              ".MuiInputBase-input": {
                padding: "5px",
              },
            }}
            value={currentDay.startBalance ?? ""}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleBalanceChange(event);
            }}
          />
        </Stack>
        <Typography>
          <Typography component="span" color="#676767" fontSize={16}>
            Баланс:{" "}
          </Typography>
          <Typography component="span" fontWeight={500}>
            {formatCurrency(currentCash)} ₽
          </Typography>
        </Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <Stack direction="row" alignItems="center" gap={0.5}>
          <Typography fontSize={16} color="#676767">
            Прибыль:
          </Typography>
          <Typography fontWeight={500}>
            {formatCurrency(totalIncome)} ₽
          </Typography>
          {totalIncome > 0 ? (
            <TrendingUpIcon
              sx={{
                path: {
                  fill: "#68cf25",
                },
              }}
            />
          ) : totalIncome < 0 ? (
            <TrendingDownIcon
              sx={{
                path: {
                  fill: "#fa2d56",
                },
              }}
            />
          ) : null}
        </Stack>
        <Typography fontSize={14}>
          <Typography component="span" color="#676767" fontSize={16}>
            Средний кэф:{" "}
          </Typography>
          <Typography component="span" fontWeight={500}>
            {formatCurrency(+averageCoef.toFixed(2))}
          </Typography>
        </Typography>
      </Stack>
    </Box>
  );
};
