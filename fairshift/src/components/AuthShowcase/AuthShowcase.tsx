import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Avatar as ChakraAvatar,
  Button,
  IconButton,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import type { Team } from "@prisma/client";
import Avatar from "boring-avatars";
import type { Session, User } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { authContainer, userContainer } from "./authShowcase.css";

type Props = {
  user:
    | (User & {
        team: Team | null;
      })
    | null
    | undefined;
  sessionData: Session | null | undefined;
};

const AuthShowcase: React.FC<Props> = ({ user, sessionData }) => {
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
              <Link href="/profile">
                <Text color="pink">{user?.team?.name ?? "Create Team"}</Text>
              </Link>
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
    </>
  );
};

export default AuthShowcase;
