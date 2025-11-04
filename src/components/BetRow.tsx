import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Stack,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import type { Dayjs } from "dayjs";
import type { BetResult, BetType, DaysType, DayType } from "../types";
import { useState, type Dispatch, type SetStateAction } from "react";
import { dateKey } from "../helpers/date";
import {
  formatCurrency,
  getBetIncome,
  getBetPayment,
  getRowStyle,
} from "../helpers/table";
import { AddEditBet } from "./AddEditBet";
import { FormProvider } from "./form/FormProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

type Props = {
  date: Dayjs | null;
  currentDay: DayType;
  setDays: Dispatch<SetStateAction<DaysType>>;
  bet: BetType;
  idx: number;
};

export const BetRow = ({ date, currentDay, setDays, bet, idx }: Props) => {
  const bets = currentDay?.bets ?? [];

  const betPayment = getBetPayment(bet);

  const betIncome = getBetIncome(bet);

  const handleDeleteRow = (betId: number) => {
    setDays((days) => {
      return {
        ...days,
        [dateKey(date)]: {
          ...currentDay,
          bets: bets.filter((bet) => bet.id !== betId),
        },
      };
    });
  };

  const handleChangeResult = (event: SelectChangeEvent) => {
    const value = event.target.value as BetResult;

    setDays((days) => {
      return {
        ...days,
        [dateKey(date)]: {
          ...currentDay,
          bets: bets.map((item) => {
            if (item.id !== bet.id) return item;

            return { ...item, result: value };
          }),
        },
      };
    });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isOpenEdit, setOpenEdit] = useState(false);

  const handleEditBet = () => {
    setOpenEdit(true);
  };

  return (
    <>
      <TableRow
        key={bet.id}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row">
          {idx + 1}
        </TableCell>
        <TableCell component="th" scope="row">
          {bet.name}
        </TableCell>
        <TableCell align="right">{bet.betAmount}</TableCell>
        <TableCell align="right">{bet.coef}</TableCell>
        <TableCell align="right">
          <Typography fontSize={14} fontWeight={500}>
            {formatCurrency(betPayment)}
          </Typography>
        </TableCell>
        <TableCell align="right">
          <Typography fontSize={14} fontWeight={500}>
            {formatCurrency(betIncome)}
          </Typography>
        </TableCell>
        <TableCell
          align="right"
          style={{
            borderRadius: 4,
            ...getRowStyle(bet),
          }}
        >
          <Select
            size="small"
            value={bet.result}
            onChange={handleChangeResult}
            sx={{
              ".MuiSelect-select": {
                padding: "3px 10px",
              },
              fontSize: 14,
              background: "#fff",
            }}
          >
            <MenuItem value="unknown">Неизвестно</MenuItem>
            <MenuItem value="win">Победа</MenuItem>
            <MenuItem value="lose">Поражение</MenuItem>
          </Select>
        </TableCell>
        <TableCell align="right">
          <Stack direction="row" gap={0.5} justifyContent="flex-end">
            <IconButton onClick={handleEditBet} size="small">
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleOpen} size="small">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </TableCell>
      </TableRow>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box mb={4}>
            <Typography align="center">Удалить ставку {bet.name}?</Typography>
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap={2}
          >
            <Button
              type="submit"
              variant="outlined"
              size="small"
              onClick={handleClose}
            >
              Отмена
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => handleDeleteRow(bet.id)}
            >
              Да
            </Button>
          </Stack>
        </Box>
      </Modal>

      {isOpenEdit && (
        <FormProvider>
          <AddEditBet
            date={date}
            currentDay={currentDay}
            setDays={setDays}
            editBet={bet}
            setOpenEdit={setOpenEdit}
          />
        </FormProvider>
      )}
    </>
  );
};
