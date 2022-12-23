import { DownloadIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
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
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { pinkSpan, title } from "../styles/index.css";
import { card } from "../styles/schedule.css";

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

  // Remove days of the week that are not included in the schedule
  const daysOfWeek = [
    ...new Set(scheduleData.map((shift) => DAYS_OF_WEEK[shift.dayOfWeek - 1])),
  ];

  const generatePdf = async () => {
    // Initialize jsPDF
    const doc = new jsPDF();

    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    autoTable(doc, {
      html: "#schedule",
      headStyles: { fillColor: "#2e026d" },
      theme: "grid",
    });

    // Download the PDF
    doc.save("Schedule.pdf");
  };

  return (
    <>
      <h1 className={title}>
        Fair<span className={pinkSpan}>Shift</span>
      </h1>
      <Card className={card}>
        <CardBody>
          <TableContainer>
            <Table variant="simple" id="schedule">
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
                {employees.map((employee) => (
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
                ))}
              </Tbody>
              <Tfoot></Tfoot>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </>
  );
};

export default Schedule;
