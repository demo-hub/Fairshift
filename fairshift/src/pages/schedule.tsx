import {
  Card,
  CardBody,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";
import scheduleStyles from "./schedule.module.css";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type Shift = {
  employee: number;
  dayOfWeek: number;
  shiftNumber: number;
  hours: number;
};

const Schedule: NextPage = () => {
  const [scheduleData, setScheduleData] = useState<Shift[]>([]);

  useEffect(() => {
    setScheduleData(JSON.parse(sessionStorage.getItem("scheduleData") || "[]"));
  }, []);

  const employees = [...new Set(scheduleData.map((shift) => shift.employee))];

  // Sort employees in ascending order
  employees.sort((a, b) => a - b);

  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Fair<span className={styles.pinkSpan}>Shift</span>
          </h1>
          <Card className={scheduleStyles.card}>
            <CardBody>
              <TableContainer>
                <Table variant="simple">
                  <TableCaption>
                    Generated schedule based on your preferences.
                  </TableCaption>
                  <Thead>
                    <Tr>
                      <Th></Th>
                      {DAYS_OF_WEEK.map((day) => (
                        <Th key={day}>{day}</Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {employees.map((employee) => (
                      <Tr key={employee}>
                        <Td>Employee {employee}</Td>
                        {DAYS_OF_WEEK.map((day, dayIndex) => (
                          <Td key={day}>
                            {scheduleData
                              .filter(
                                (shift) =>
                                  shift.employee === employee &&
                                  shift.dayOfWeek === dayIndex + 1
                              )
                              .map((shift) => (
                                <div key={shift.shiftNumber}>
                                  Shift {shift.shiftNumber} - {shift.hours}{" "}
                                  hours
                                </div>
                              ))}
                          </Td>
                        ))}
                      </Tr>
                    ))}
                  </Tbody>
                  <Tfoot>
                    <Tr>
                      <Th></Th>
                      {DAYS_OF_WEEK.map((day) => (
                        <Th key={day}>{day}</Th>
                      ))}
                    </Tr>
                  </Tfoot>
                </Table>
              </TableContainer>
            </CardBody>
          </Card>
        </div>
      </main>
    </>
  );
};

export default Schedule;