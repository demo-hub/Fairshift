import {
  Button,
  Input,
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
import type { Team } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { trpc } from "../../utils/trpc";
import { form, row } from "./settings.css";

type TeamForm = {
  name: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (team: Team) => void;
};

const TeamModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TeamForm>({
    defaultValues: {
      name: "",
    },
  });

  const mutation = trpc.team.createTeam.useMutation();

  const onSubmit = async (data: TeamForm) => {
    const team = await mutation.mutateAsync({
      name: data.name,
    });

    onSuccess(team);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Team</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={8} className={form}>
            <div className={row}>
              <span>
                <Text mb="8px">Name</Text>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      focusBorderColor="purple.500"
                      errorBorderColor="red.500"
                      isInvalid={!!errors.name}
                      {...field}
                    />
                  )}
                />
                <span>
                  {errors.name ? errors.name?.message?.toString() : undefined}
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
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TeamModal;
