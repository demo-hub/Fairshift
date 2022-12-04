import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import styles from "./settings.module.css";

type Settings = {
  employees: number;
  shifts: number;
  hours: number;
  employeesPerShift: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SettingsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Settings>({
    defaultValues: {
      employees: 1,
      shifts: 1,
      hours: 1,
      employeesPerShift: 1,
    },
  });

  const mutation = trpc.shift.generateShifts.useMutation();

  const onSubmit = async (data: Settings) => {
    const mutationData = await mutation.mutateAsync({
      employees: parseInt(data.employees.toString()),
      shifts: parseInt(data.shifts.toString()),
      hours: parseInt(data.hours.toString()),
      employeesPerShift: parseInt(data.employeesPerShift.toString()),
    });

    console.log(mutationData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={8} className={styles.form}>
            <div className={styles.row}>
              <span>
                <Text mb="8px">Employees</Text>
                <Controller
                  name="employees"
                  control={control}
                  rules={{ required: true, min: 1 }}
                  render={({ field }) => (
                    <NumberInput
                      focusBorderColor="purple.500"
                      errorBorderColor="red.500"
                      isInvalid={!!errors.employees}
                      min={1}
                      {...field}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                />
                <span>
                  {errors.employees
                    ? errors.employees?.message?.toString()
                    : undefined}
                </span>
              </span>
              <span>
                <Text mb="8px">Employees per shift</Text>
                <Controller
                  name="employeesPerShift"
                  control={control}
                  rules={{ required: true, min: 1 }}
                  render={({ field }) => (
                    <NumberInput
                      focusBorderColor="purple.500"
                      errorBorderColor="red.500"
                      isInvalid={!!errors.employeesPerShift}
                      min={1}
                      {...field}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                />
                <span>
                  {errors.employeesPerShift
                    ? errors.employeesPerShift?.message?.toString()
                    : undefined}
                </span>
              </span>
            </div>
            <div className={styles.row}>
              <span>
                <Text mb="8px">Hours per shift</Text>
                <Controller
                  name="hours"
                  control={control}
                  rules={{ required: true, min: 1 }}
                  render={({ field }) => (
                    <NumberInput
                      focusBorderColor="purple.500"
                      errorBorderColor="red.500"
                      isInvalid={!!errors.hours}
                      min={1}
                      {...field}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                />
                <span>
                  {errors.hours ? errors.hours?.message?.toString() : undefined}
                </span>
              </span>
              <span>
                <Text mb="8px">Shifts per day</Text>
                <Controller
                  name="shifts"
                  control={control}
                  rules={{ required: true, min: 1 }}
                  render={({ field }) => (
                    <NumberInput
                      focusBorderColor="purple.500"
                      errorBorderColor="red.500"
                      isInvalid={!!errors.shifts}
                      min={1}
                      {...field}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  )}
                />
                <span>
                  {errors.shifts
                    ? errors.shifts?.message?.toString()
                    : undefined}
                </span>
              </span>
            </div>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            colorScheme="purple"
            mr={3}
            onClick={handleSubmit(onSubmit)}
          >
            Generate
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
