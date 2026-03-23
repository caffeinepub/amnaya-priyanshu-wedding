import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitRSVP() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      attending,
      inviteCode,
    }: {
      name: string;
      attending: boolean;
      inviteCode: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitRSVP(name, attending, inviteCode);
    },
  });
}

export function useAddSongRequest() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      title,
      artist,
      name,
    }: {
      title: string;
      artist: string;
      name: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addSongRequest(title, artist, name);
    },
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllRSVPs() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["rsvps"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllRSVPs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetSongRequests() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["songRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSongRequests();
    },
    enabled: !!actor && !isFetching,
  });
}
