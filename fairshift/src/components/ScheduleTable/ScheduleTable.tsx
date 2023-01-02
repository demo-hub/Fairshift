import { CheckIcon, DownloadIcon, EditIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tooltip,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";

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
  const [employeeNames, setEmployeeNames] = useState<string[]>(
    employees.map((employee) => `Employee ${employee}`)
  );
  if (employeeNames.length !== employees.length) {
    setEmployeeNames(employees.map((employee) => `Employee ${employee}`));
  }

  const [employeeEditMode, setEmployeeEditMode] = useState<boolean[]>([
    ...employees.map(() => false),
  ]);
  if (employeeEditMode.length !== employees.length) {
    setEmployeeEditMode([...employees.map(() => false)]);
  }

  const toast = useToast();

  // Remove days of the week that are not included in the schedule
  const daysOfWeek = useMemo(
    () => [
      ...new Set(
        scheduleData.map((shift) => DAYS_OF_WEEK[shift.dayOfWeek - 1])
      ),
    ],
    [scheduleData]
  );

  const changeName = (index: number, name: string) => {
    const newEmployeeNames = [...employeeNames];
    newEmployeeNames[index] = name;
    setEmployeeNames(newEmployeeNames);

    // Update the scheduleData with the new name
    const newScheduleData = scheduleData.map((shift) => {
      if (shift.employee === employees[index]) {
        return { ...shift, employee: name };
      }
      return shift;
    });

    sessionStorage.setItem("scheduleData", JSON.stringify(newScheduleData));
  };

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
            ? employees.map((employee, index) => (
                <Tr key={employee}>
                  <Th>
                    <div key={employee} style={{ display: "flex" }}>
                      {employeeEditMode[index] ? (
                        <Input
                          defaultValue={employeeNames[index]}
                          focusBorderColor="purple.500"
                          onChange={(e) => changeName(index, e.target.value)}
                        ></Input>
                      ) : (
                        employeeNames[index]
                      )}
                      <Tooltip
                        label={
                          employeeEditMode[index] ? "Confirm" : "Edit name"
                        }
                      >
                        <IconButton
                          onClick={() => {
                            setEmployeeEditMode([
                              ...employeeEditMode.slice(0, index),
                              !employeeEditMode[index],
                              ...employeeEditMode.slice(index + 1),
                            ]);

                            if (employeeEditMode[index]) {
                              toast({
                                title: "Name changed.",
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                              });
                            }
                          }}
                          colorScheme="purple"
                          variant="link"
                          aria-label="Edit"
                          icon={
                            employeeEditMode[index] ? (
                              <CheckIcon />
                            ) : (
                              <EditIcon />
                            )
                          }
                        />
                      </Tooltip>
                    </div>
                  </Th>
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
                            {
                              employeeNames[
                                employees.findIndex((e) => shift.employee === e)
                              ]
                            }{" "}
                            ({shift.hours}h)
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
