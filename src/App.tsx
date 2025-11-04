import { Stack } from "@mui/material";
import "./App.css";
import BetsTable from "./components/BetsTable";
import { Header } from "./components/Header";
import { useEffect, useState } from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import type { DaysType, DayType } from "./types";
import { getInitialDays, saveDays } from "./helpers/db";
import { dateKey } from "./helpers/date";
import { AddEditBet } from "./components/AddEditBet";
import { FormProvider } from "./components/form/FormProvider";

function App() {
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const [days, setDays] = useState<DaysType>(getInitialDays());

  const currentDay = days?.[dateKey(date)] ?? ({} as DayType);

  useEffect(() => {
    saveDays(days);
  }, [days]);

  return (
    <Stack spacing={2}>
      <Header
        date={date}
        setDate={setDate}
        currentDay={currentDay}
        setDays={setDays}
      />

      <BetsTable date={date} currentDay={currentDay} setDays={setDays} />

      <FormProvider>
        <AddEditBet date={date} currentDay={currentDay} setDays={setDays} />
      </FormProvider>
    </Stack>
  );
}

export default App;
