import { useDisclosure } from "@chakra-ui/react";
import AuthShowcase from "@components/AuthShowcase/AuthShowcase";
import SettingsModal from "@components/Modal/SettingsModal";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import {
  card,
  cardRow,
  cardText,
  cardTitle,
  pinkSpan,
  showcaseContainer,
  title,
} from "../styles/index.css";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: sessionData } = useSession();

  // Fetch user team from database
  const { data: user, refetch } = trpc.team.getUserTeam.useQuery(
    {
      userId: sessionData?.user?.id ?? "",
    },
    { enabled: !!sessionData?.user?.id }
  );

  // Get team members
  const { data: teamMembers } = trpc.team.getTeamMembers.useQuery(
    { teamId: user?.team?.id ?? "" },
    { enabled: !!user?.team?.id }
  );

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
        <AuthShowcase
          user={user}
          sessionData={sessionData}
          onTeamCreated={() => refetch()}
          teamMembers={teamMembers}
        />
      </div>

      <SettingsModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={(data) => {
          sessionStorage.setItem("scheduleData", JSON.stringify(data));
          router.push("/schedule");
        }}
        teamMembers={teamMembers}
      />
    </>
  );
};

export default Home;
