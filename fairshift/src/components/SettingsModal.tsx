import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { trpc } from "../utils/trpc";
import NumericInput from "./Input/NumericInput";
import { form, row } from "./settings.css";

type Settings = {
  totalEmployees: number;
  shiftsPerDay: number;
  hoursPerShift: number;
  employeesPerShift: number;
  includeWeekends: boolean;
};

type Shift = {
  employee: number;
  dayOfWeek: number;
  shiftNumber: number;
  hours: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (shifts: Shift[]) => void;
};

const SettingsModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
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
      includeWeekends: false,
    },
  });

  const mutation = trpc.shift.generateShifts.useMutation();

  const onSubmit = async (data: Settings) => {
    console.log(data);
    const shifts = await mutation.mutateAsync({
      totalEmployees: parseInt(data.totalEmployees.toString()),
      shiftsPerDay: parseInt(data.shiftsPerDay.toString()),
      hoursPerShift: parseInt(data.hoursPerShift.toString()),
      employeesPerShift: parseInt(data.employeesPerShift.toString()),
      includeWeekends: data.includeWeekends,
    });

    onSuccess(shifts);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={8} className={form}>
            <div className={row}>
              <span>
                <Text mb="8px">Employees</Text>
                <Controller
                  name="totalEmployees"
                  control={control}
                  rules={{ required: true, min: 1, max: 5 }}
                  render={({ field }) => (
                    <NumericInput
                      isInvalid={!!errors.totalEmployees}
                      min={1}
                      max={5}
                      {...field}
                    />
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
                    <NumericInput
                      isInvalid={!!errors.employeesPerShift}
                      min={1}
                      {...field}
                    />
                  )}
                />
                <span>
                  {errors.employeesPerShift
                    ? errors.employeesPerShift?.message?.toString()
                    : undefined}
                </span>
              </span>
            </div>
            <div className={row}>
              <span>
                <Text mb="8px">Hours per shift</Text>
                <Controller
                  name="hoursPerShift"
                  control={control}
                  rules={{ required: true, min: 1 }}
                  render={({ field }) => (
                    <NumericInput
                      isInvalid={!!errors.hoursPerShift}
                      min={1}
                      {...field}
                    />
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
                    <NumericInput
                      isInvalid={!!errors.shiftsPerDay}
                      min={1}
                      {...field}
                    />
                  )}
                />
                <span>
                  {errors.shiftsPerDay
                    ? errors.shiftsPerDay?.message?.toString()
                    : undefined}
                </span>
              </span>
            </div>
            <div className={row}>
              <Controller
                name="includeWeekends"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    defaultChecked={!!field.value}
                    colorScheme="purple"
                    value={field.value ? 1 : 0}
                  >
                    Include weekends
                  </Checkbox>
                )}
              />
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
