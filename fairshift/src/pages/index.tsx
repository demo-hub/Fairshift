import { useDisclosure } from "@chakra-ui/react";
import SettingsModal from "@components/SettingsModal";
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import styles from "./index.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>
            Fair<span className={styles.pinkSpan}>Shift</span>
          </h1>
          <div className={styles.cardRow}>
            <div className={styles.card} onClick={onOpen}>
              <h3 className={styles.cardTitle}>Generate schedule →</h3>
              <div className={styles.cardText}>
                Automatic schedule generation based on your preferences.
              </div>
            </div>
          </div>
          <div className={styles.showcaseContainer}>
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
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className={styles.authContainer}>
      <button
        className={styles.loginButton}
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
