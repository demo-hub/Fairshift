import { Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";

const Invitation: NextPage = () => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  const { teamId } = router.query;
  const joinTeam = trpc.team.joinTeam.useMutation();
  // Check if user is already in a team
  const { data: userTeam } = trpc.team.getUserTeam.useQuery(
    { userId: sessionData?.user?.id ?? "" },
    { enabled: status === "authenticated" }
  );

  useEffect(() => {
    // Redirect to login page if not logged in
    if (status === "unauthenticated") {
      signIn();
    } else if (status === "authenticated") {
      // Redirect to dashboard if user is already in a team
      if (userTeam?.team?.name) {
        router.push("/");
      }

      // Join team
      joinTeam.mutateAsync({ teamId: teamId as string });
      router.push("/");
    }
  }, [joinTeam, router, sessionData, status, teamId, userTeam?.team?.name]);

  return joinTeam.isLoading ? (
    <Text color="white">Loading...</Text>
  ) : (
    <Text color="white">Joining team...</Text>
  );
};

export default Invitation;
