import { Project } from "@/types/project";
import { fetchGitHubProjects } from "@/lib/github";
import ProjectCardList from "./ProjectCardList";
import ProjectCardListLoading from "./ProjectCardListLoading";
import Title from "antd/es/typography/Title";

export default async function Home() {
  const projects: Project[] = await fetchGitHubProjects();
  return (
    <div className="font-sans flex justify-center min-h-screen">
      <div className="flex flex-col gap-16 row-start-2 items-center sm:items-start w-full max-w-6xl mt-16">
        <Title level={2} style={{ margin: 0 }}>
          所有项目
        </Title>
        <ProjectCardList projects={projects} fallback={<ProjectCardListLoading />} />
      </div>
    </div>
  );
}
