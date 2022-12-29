import { Text, useToast } from "@chakra-ui/react";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";

const Invitation: NextPage = () => {
  const { data: sessionData, status } = useSession();
  const toast = useToast();
  const router = useRouter();
  const { teamId } = router.query;
  const joinTeam = trpc.team.joinTeam.useMutation();
  // Check if user is already in a team
  const { data: userTeam, isLoading } = trpc.team.getUserTeam.useQuery(
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
        // Notify user that they are already in a team
        toast({
          title: "You are already in a team.",
          description: "You can only be in one team at a time.",
          status: "error",
        });
        router.push("/");
        return;
      } else if (!isLoading) {
        // Join team
        joinTeam.mutate({ teamId: teamId as string });
        // Notify user that they have joined the team
        toast({
          title: "You have joined the team.",
          description: "You can now be assigned to schedules.",
          status: "success",
        });
        router.push("/");
        return;
      }
    }
  }, [
    isLoading,
    joinTeam,
    router,
    sessionData,
    status,
    teamId,
    toast,
    userTeam?.team?.name,
  ]);

  return joinTeam.isLoading ? (
    <Text color="white">Loading...</Text>
  ) : (
    <Text color="white">Joining team...</Text>
  );
};

export default Invitation;
