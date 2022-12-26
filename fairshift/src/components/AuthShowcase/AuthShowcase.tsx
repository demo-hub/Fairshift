import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Avatar as ChakraAvatar,
  Button,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import TeamModal from "@components/Modal/TeamModal";
import type { Team } from "@prisma/client";
import Avatar from "boring-avatars";
import type { Session, User } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import {
  authContainer,
  teamContainer,
  userContainer,
} from "./authShowcase.css";

type Props = {
  user:
    | (User & {
        team: Team | null;
      })
    | null
    | undefined;
  sessionData: Session | null | undefined;
  onTeamCreated: (team: Team) => void;
};

const AuthShowcase: React.FC<Props> = ({
  user,
  sessionData,
  onTeamCreated,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  return (
    <>
      {sessionData ? (
        <div className={userContainer}>
          <div className={userContainer}>
            {sessionData.user?.image ? (
              <ChakraAvatar name="User" src={sessionData.user?.image} />
            ) : (
              <Avatar
                size={40}
                name="User"
                variant="sunset"
                colors={["#da627d", "#2e026d"]}
              />
            )}
            <div>
              <Text color="white">{sessionData.user?.name}</Text>
              <div
                className={teamContainer}
                onClick={() => {
                  if (!user?.team?.name) {
                    onOpen();
                  } else {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/invite/${user?.team?.id}`
                    );

                    toast({
                      title: "Invitation link copied to clipboard.",
                      description:
                        "Share this link with your team members to invite them to your team.",
                      status: "success",
                      duration: 9000,
                      isClosable: true,
                    });
                  }
                }}
              >
                <Text color="pink">{user?.team?.name ?? "Create Team"}</Text>
              </div>
            </div>
          </div>
          <Tooltip label="Sign out">
            <IconButton
              onClick={() => signOut()}
              colorScheme="whiteAlpha"
              variant="ghost"
              aria-label="Search database"
              icon={<ArrowForwardIcon />}
            />
          </Tooltip>
        </div>
      ) : (
        <div className={authContainer}>
          <Button colorScheme="purple" onClick={() => signIn()}>
            Sign In
          </Button>
        </div>
      )}

      <TeamModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={(team) => {
          onTeamCreated(team);
          onClose();
        }}
      />
    </>
  );
};

export default AuthShowcase;
