import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Avatar as ChakraAvatar,
  Button,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import SettingsModal from "@components/SettingsModal";
import Avatar from "boring-avatars";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  authContainer,
  card,
  cardRow,
  cardText,
  cardTitle,
  pinkSpan,
  showcaseContainer,
  title,
  userContainer,
} from "../styles/index.css";

const Home: NextPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <h1 className={title}>
        Fair<span className={pinkSpan}>Shift</span>
      </h1>
      <div className={cardRow}>
        <div className={card} onClick={onOpen}>
          <h3 className={cardTitle}>Generate schedule →</h3>
          <div className={cardText}>
            Automatic schedule generation based on your preferences.
          </div>
        </div>
      </div>
      <div className={showcaseContainer}>
        <AuthShowcase />
      </div>

      <SettingsModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={(data) => {
          sessionStorage.setItem("scheduleData", JSON.stringify(data));
          router.push("/schedule");
        }}
      />
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  console.log(sessionData?.user?.image);

  return (
    <>
      {sessionData ? (
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
          <Text color="white">{sessionData.user?.name}</Text>
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
