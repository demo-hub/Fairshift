type Props = {
  employees: number;
  shifts: number;
  hours: number;
  employeesPerShift: number;
};

type Shift = {
  employee: number;
  shifts: {
    shift: number;
    hours: {
      hour: number;
      employeesPerShift: (number | undefined)[];
    }[];
  }[];
};

// Function to generate shifts for a week based on the given parameters
const generateShifts = async ({
  employees,
  shifts,
  hours,
  employeesPerShift,
}: Props): Promise<Shift[]> => {
  // Create an array of employees
  const employeeArray = Array.from(Array(employees).keys());

  // Create an array of shifts
  const shiftArray = Array.from(Array(shifts).keys());

  // Create an array of hours
  const hourArray = Array.from(Array(hours).keys());

  // Create an array of employees per shift
  const employeesPerShiftArray = Array.from(Array(employeesPerShift).keys());

  // Create an array of shifts for each employee
  const employeeShifts = employeeArray.map((employee) => {
    // Create an array of shifts for each employee
    const shifts = shiftArray.map((shift) => {
      // Create an array of hours for each shift
      const hours = hourArray.map((hour) => {
        // Create an array of employees per shift for each hour
        const employeesPerShift = employeesPerShiftArray.map(
          (employeePerShift) => {
            // Return a random employee
            return employeeArray[
              Math.floor(Math.random() * employeeArray.length)
            ];
          }
        );

        // Return an object with the hours and employees per shift
        return {
          hour,
          employeesPerShift,
        };
      });

      // Return an object with the shift and hours
      return {
        shift,
        hours,
      };
    });

    // Return an object with the employee and shifts
    return {
      employee: employee + 1,
      shifts,
    };
  });

  // Return the employee shifts
  return employeeShifts;
};

export default generateShifts;
