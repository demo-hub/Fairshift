type Props = {
  totalEmployees: number;
  shiftsPerDay: number;
  hoursPerShift: number;
  employeesPerShift: number;
};

type Shift = {
  employee: number;
  dayOfWeek: number;
  shiftNumber: number;
  hours: number;
};

// Function to generate shifts for a week based on the given parameters
const generateShifts = async ({
  totalEmployees,
  shiftsPerDay,
  hoursPerShift,
  employeesPerShift,
}: Props): Promise<Shift[]> => {
  // Check that the inputs are valid
  if (
    totalEmployees <= 0 ||
    totalEmployees > 5 ||
    shiftsPerDay <= 0 ||
    hoursPerShift <= 0 ||
    employeesPerShift <= 0
  ) {
    return [];
  }

  // Calculate the total number of shifts in a week
  const totalShifts = shiftsPerDay * 7;

  // Create an array to store the shift schedule
  const shiftSchedule: Shift[] = [];
  for (let i = 0; i < totalShifts; i++) {
    // Calculate the day of the week (1 = Monday, 7 = Sunday)
    const dayOfWeek = (i % 7) + 1;
    // Calculate the shift number (1 = first shift, 2 = second shift, etc.)
    const shiftNumber =
      shiftSchedule.filter((s) => s.dayOfWeek === dayOfWeek).length /
        employeesPerShift +
      1;
    // Select random employees for the shift
    const employeeArray = Array.from(Array(totalEmployees).keys());
    // Shuffle array
    employeeArray.sort(() => 0.5 - Math.random());
    // Get sub-array of first n elements after shuffled
    const selected = employeeArray.slice(0, employeesPerShift);
    // Add shifts to the schedule
    selected.forEach((employee) => {
      shiftSchedule.push({
        employee: employee + 1,
        dayOfWeek,
        shiftNumber,
        hours: hoursPerShift,
      });
    });
  }

  return shiftSchedule;
};

export default generateShifts;
