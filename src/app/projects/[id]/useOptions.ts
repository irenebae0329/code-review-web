import { Branch } from "@/types/project";
import { useQuery } from "@tanstack/react-query";

export function useOptions(projectId: string) {
    const { data: branches } = useQuery<Branch[]>({
        queryKey: ["branches", projectId],
        queryFn: async () => {
          const res = await fetch(`/api/nextjs/projects/${projectId}/branches`, {
            method: "POST",
            body: JSON.stringify({ repoName: projectId }),
          });
          if (!res.ok) throw new Error("Failed to fetch branches");
          return res.json();
        },
        enabled: Boolean(projectId),
      });
    
    return { 
        options: branches?.map((branch) => ({
            label: branch.name,
            value: branch.id,
        })),
    };
}