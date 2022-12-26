import { DownloadIcon } from "@chakra-ui/icons";
import {
  IconButton,
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

type Shift = {
  employee: number;
  dayOfWeek: number;
  shiftNumber: number;
  hours: number;
};

type Props = {
  scheduleData: Shift[];
  employees: number[];
  generatePdf: () => void;
  view: "employee" | "shift";
  shifts: number[];
};

const ScheduleTable: React.FC<Props> = ({
  scheduleData,
  employees,
  generatePdf,
  view,
  shifts,
}) => {
  const DAYS_OF_WEEK = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Remove days of the week that are not included in the schedule
  const daysOfWeek = [
    ...new Set(scheduleData.map((shift) => DAYS_OF_WEEK[shift.dayOfWeek - 1])),
  ];

  return (
    <TableContainer>
      <Table variant="simple" id={view}>
        <TableCaption>
          Generated schedule based on your preferences.
          <IconButton
            variant="ghost"
            colorScheme="purple"
            aria-label="Download"
            icon={<DownloadIcon />}
            onClick={generatePdf}
          />
        </TableCaption>
        <Thead>
          <Tr>
            <Th></Th>
            {daysOfWeek.map((day) => (
              <Th key={day}>{day}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {view === "employee"
            ? employees.map((employee) => (
                <Tr key={employee}>
                  <Th>Employee {employee}</Th>
                  {daysOfWeek.map((day, dayIndex) => (
                    <Td key={day}>
                      {scheduleData
                        .filter(
                          (shift) =>
                            shift.employee === employee &&
                            shift.dayOfWeek === dayIndex + 1
                        )
                        .map((shift) => (
                          <p key={shift.shiftNumber}>
                            Shift {shift.shiftNumber} ({shift.hours}h)
                          </p>
                        ))}
                    </Td>
                  ))}
                </Tr>
              ))
            : shifts.map((shiftNumber) => (
                <Tr key={shiftNumber}>
                  <Th>Shift {shiftNumber}</Th>
                  {daysOfWeek.map((day, dayIndex) => (
                    <Td key={day}>
                      {scheduleData
                        .filter(
                          (shift) =>
                            shift.shiftNumber === shiftNumber &&
                            shift.dayOfWeek === dayIndex + 1
                        )
                        .map((shift) => (
                          <p key={shift.employee}>
                            Employee {shift.employee} ({shift.hours}h)
                          </p>
                        ))}
                    </Td>
                  ))}
                </Tr>
              ))}
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
    </TableContainer>
  );
};

export default ScheduleTable;
