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
  totalEmployees: number;
  shiftsPerDay: number;
  hoursPerShift: number;
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
      totalEmployees: 1,
      shiftsPerDay: 1,
      hoursPerShift: 1,
      employeesPerShift: 1,
    },
  });

  const mutation = trpc.shift.generateShifts.useMutation();

  const onSubmit = async (data: Settings) => {
    console.log(data);
    const mutationData = await mutation.mutateAsync({
      totalEmployees: parseInt(data.totalEmployees.toString()),
      shiftsPerDay: parseInt(data.shiftsPerDay.toString()),
      hoursPerShift: parseInt(data.hoursPerShift.toString()),
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
                  name="totalEmployees"
                  control={control}
                  rules={{ required: true, min: 1 }}
                  render={({ field }) => (
                    <NumberInput
                      focusBorderColor="purple.500"
                      errorBorderColor="red.500"
                      isInvalid={!!errors.totalEmployees}
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
                  {errors.totalEmployees
                    ? errors.totalEmployees?.message?.toString()
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
                  name="hoursPerShift"
                  control={control}
                  rules={{ required: true, min: 1 }}
                  render={({ field }) => (
                    <NumberInput
                      focusBorderColor="purple.500"
                      errorBorderColor="red.500"
                      isInvalid={!!errors.hoursPerShift}
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
                  {errors.hoursPerShift
                    ? errors.hoursPerShift?.message?.toString()
                    : undefined}
                </span>
              </span>
              <span>
                <Text mb="8px">Shifts per day</Text>
                <Controller
                  name="shiftsPerDay"
                  control={control}
                  rules={{ required: true, min: 1 }}
                  render={({ field }) => (
                    <NumberInput
                      focusBorderColor="purple.500"
                      errorBorderColor="red.500"
                      isInvalid={!!errors.shiftsPerDay}
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
                  {errors.shiftsPerDay
                    ? errors.shiftsPerDay?.message?.toString()
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
