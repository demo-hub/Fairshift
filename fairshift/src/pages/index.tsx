import { useDisclosure } from "@chakra-ui/react";
import SettingsModal from "@components/SettingsModal";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import {
  card,
  cardRow,
  cardText,
  cardTitle,
  pinkSpan,
  title,
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
