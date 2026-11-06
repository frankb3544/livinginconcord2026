import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAgentSettings } from "../endpoints/settings/agent_GET.schema";
import { postUpdateAgentSettings } from "../endpoints/admin/settings/agent/update_POST.schema";

export const useAgentProfile = () => {
  const queryClient = useQueryClient();

  const agentProfileQuery = useQuery({
    queryKey: ["agentProfile"],
    queryFn: () => getAgentSettings(),
    placeholderData: (prev) => prev,
  });

  const updateAgentProfileMutation = useMutation({
    mutationFn: postUpdateAgentSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agentProfile"] });
    },
  });

  return {
    agentProfileQuery,
    updateAgentProfileMutation,
  };
};