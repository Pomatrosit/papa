import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import type { DaysType, DayType } from "../types";
import type { Dispatch, SetStateAction } from "react";
import type { Dayjs } from "dayjs";

import { BetRow } from "./BetRow";
import { Typography } from "@mui/material";

type Props = {
  date: Dayjs | null;
  currentDay: DayType;
  setDays: Dispatch<SetStateAction<DaysType>>;
};

export default function BetsTable({ date, currentDay, setDays }: Props) {
  const bets = currentDay?.bets ?? [];

  if (!bets.length) return <Typography>За этот день нет ставочек</Typography>;

  return (
    <Paper elevation={3}>
      <Table
        sx={{
          minWidth: 650,
          ".MuiTableCell-root": {
            padding: "2px 16px",
          },
          ".MuiTableCell-head": {
            padding: "6px 16px",
          },
          ".MuiTableRow-root:nth-child(2n)": {
            backgroundColor: "#efefef",
          },
        }}
        size="small"
      >
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Исход</TableCell>
            <TableCell align="right">Ставка, ₽</TableCell>
            <TableCell align="right">Кэф</TableCell>
            <TableCell align="right">Выплата, ₽</TableCell>
            <TableCell align="right">Прибыль, ₽</TableCell>
            <TableCell align="right">Победа/поражение</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bets.map((row, idx) => (
            <BetRow
              key={row.id}
              bet={row}
              idx={idx}
              date={date}
              setDays={setDays}
              currentDay={currentDay}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
