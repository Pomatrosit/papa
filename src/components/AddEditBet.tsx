import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Form } from "./form/Form";
import type { BetType, DaysType, DayType } from "../types";
import type { Dayjs } from "dayjs";
import { dateKey } from "../helpers/date";
import { useFormContext } from "react-hook-form";

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

type FormValues = Pick<BetType, "name" | "betAmount" | "coef">;

type Props = {
  date: Dayjs | null;
  currentDay: DayType;
  setDays: Dispatch<SetStateAction<DaysType>>;
  editBet?: BetType;
  setOpenEdit?: Dispatch<SetStateAction<boolean>>;
};

export const AddEditBet = ({
  date,
  currentDay,
  setDays,
  editBet,
  setOpenEdit,
}: Props) => {
  const type = editBet ? "edit" : "create";

  const [open, setOpen] = useState(type === "create" ? false : true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    if (type === "edit" && setOpenEdit) {
      setOpenEdit(false);
    }
  };

  const onSubmit = (betOptions: FormValues) => {
    const currentDayBets = currentDay?.bets ?? [];

    if (type === "create") {
      setDays((days) => {
        return {
          ...days,
          [dateKey(date)]: {
            ...currentDay,
            bets: [
              ...currentDayBets,
              {
                id: Date.now(),
                ...betOptions,
                result: "unknown",
              },
            ],
          },
        };
      });
    } else {
      setDays((days) => {
        return {
          ...days,
          [dateKey(date)]: {
            ...currentDay,
            bets: currentDayBets.map((bet) => {
              if (editBet?.id === bet.id)
                return {
                  ...bet,
                  ...betOptions,
                };

              return bet;
            }),
          },
        };
      });
    }

    handleClose();
  };

  const { setValue } = useFormContext();

  useEffect(() => {
    if (type === "edit") {
      setValue("name", editBet?.name);
      setValue("betAmount", editBet?.betAmount);
      setValue("coef", editBet?.coef);
    }
  }, []);

  return (
    <>
      {type === "create" && (
        <Stack direction="row" justifyContent="center">
          <Button variant="contained" size="small" onClick={handleOpen}>
            Добавить ставочку
          </Button>
        </Stack>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Form onSubmit={onSubmit}>
            <Stack spacing={2}>
              <Typography>
                {type === "edit" ? "Редактировать" : "Добавить"} ставочку
              </Typography>

              <Form.TextInput
                name="name"
                label="Исход"
                isRequired
                size="small"
                variant="filled"
              />

              <Form.TextInput
                name="betAmount"
                label="Сумма ставки"
                isRequired
                size="small"
                variant="filled"
                type="number"
              />

              <Form.TextInput
                name="coef"
                label="Коэффициент"
                isRequired
                size="small"
                variant="filled"
                type="number"
              />

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
                <Button type="submit" variant="contained" size="small">
                  Сохранить
                </Button>
              </Stack>
            </Stack>
          </Form>
        </Box>
      </Modal>
    </>
  );
};
