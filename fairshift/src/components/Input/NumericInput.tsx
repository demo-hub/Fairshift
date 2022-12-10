import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";

type Settings = {
  totalEmployees: number;
  shiftsPerDay: number;
  hoursPerShift: number;
  employeesPerShift: number;
};

type Props = {
  min?: number;
  max?: number;
  isInvalid?: boolean;
};

const NumericInput: React.FC<Props> = ({ min, max, isInvalid, ...field }) => {
  return (
    <NumberInput
      focusBorderColor="purple.500"
      errorBorderColor="red.500"
      isInvalid={isInvalid}
      min={min}
      max={max}
      {...field}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export default NumericInput;
