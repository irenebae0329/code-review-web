"use client";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Row, Col, Empty, Flex, Typography, Input } from "antd";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/types/project";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data, isLoading } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("/api/nextjs/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });

  const projects = data ?? [];
  const router = useRouter();
  const header = useMemo(
    () => (
      <Flex vertical gap={8} className="w-full">
        <Typography.Title level={2} style={{ margin: 0 }}>
          所有项目
        </Typography.Title>
        <Typography.Text type="secondary">
          共 {projects.length} 个项目
        </Typography.Text>
        <Input.Search placeholder="搜索项目名称…" allowClear style={{ maxWidth: 360 }} />
      </Flex>
    ),
    [projects.length]
  );

  return (
    <div className="font-sans flex !pt-[32px] justify-center min-h-screen">
      <div className="flex flex-col gap-16 row-start-2 items-center sm:items-start w-full max-w-6xl mt-16">
        {header}
        {isLoading ? (
          <Typography.Text>加载中…</Typography.Text>
        ) : projects.length === 0 ? (
          <Empty description="暂无项目" />
        ) : (
          <Row
            gutter={[16,16]}
            className="w-full"
            style={{ alignSelf: "stretch" }}
            justify="start"
          >
            {projects.map((p) => (
              <Col
                key={p.id}
                span={8}
              >
                  <ProjectCard
                    project={p}
                    onClick={() => {
                      router.push(`/projects/${p.id}`);
                    }}
                  />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
