import {
  Card,
  CardBody,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ScheduleTable from "@components/ScheduleTable/ScheduleTable";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { type NextPage } from "next";
import { useEffect, useState } from "react";
import { pinkSpan, title } from "../styles/index.css";
import { card } from "../styles/schedule.css";

type Shift = {
  employee: number;
  dayOfWeek: number;
  shiftNumber: number;
  hours: number;
};

const Schedule: NextPage = () => {
  const [scheduleData, setScheduleData] = useState<Shift[]>([]);
  const [view, setView] = useState<"employee" | "shift">("employee");

  useEffect(() => {
    setScheduleData(JSON.parse(sessionStorage.getItem("scheduleData") || "[]"));
  }, []);

  const employees = [...new Set(scheduleData.map((shift) => shift.employee))];

  // Sort employees in ascending order
  employees.sort((a, b) => a - b);

  const shifts = [...new Set(scheduleData.map((shift) => shift.shiftNumber))];

  const generatePdf = async () => {
    // Initialize jsPDF
    const doc = new jsPDF();

    // It can parse html:
    // <table id="my-table"><!-- ... --></table>
    autoTable(doc, {
      html: `#${view}`,
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
      <Tabs variant="soft-rounded" colorScheme="purple" align="center">
        <TabList>
          <Tab onClick={() => setView("employee")}>By Employee</Tab>
          <Tab onClick={() => setView("shift")}>By Shift</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Card className={card}>
              <CardBody>
                <ScheduleTable
                  scheduleData={scheduleData}
                  employees={employees}
                  generatePdf={generatePdf}
                  shifts={shifts}
                  view="employee"
                />
              </CardBody>
            </Card>
          </TabPanel>
          <TabPanel>
            <Card className={card}>
              <CardBody>
                <ScheduleTable
                  scheduleData={scheduleData}
                  employees={employees}
                  generatePdf={generatePdf}
                  shifts={shifts}
                  view="shift"
                />
              </CardBody>
            </Card>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Schedule;
