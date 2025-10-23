"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Flex, Timeline, Typography, Tag, Space } from "antd";
import type { Commit } from "@/types/project";
import dayjs from "dayjs";
// import { useOptions } from "./useOptions";

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const projectId = params.id;

  const { data: commits, isLoading } = useQuery<Commit[]>({
    queryKey: ["commits", projectId],
    queryFn: async () => {
      const res = await fetch(`/api/nextjs/projects/${projectId}/commits`);
      if (!res.ok) throw new Error("Failed to fetch commits");
      return res.json();
    },
    enabled: Boolean(projectId),
  });
  
  // const { options } = useOptions(projectId);

 

  return (
    <div className="font-sans flex justify-center min-h-screen ">
      <div className="w-full max-w-4xl mt-16 flex flex-col gap-8">
        <Flex vertical gap={12} className="mb-6">
          <Typography.Title level={3} style={{ margin: 0 }}>
            项目提交记录
          </Typography.Title>
          <Typography.Text type="secondary">项目ID：{projectId}</Typography.Text>
        </Flex>

        <div>
          {isLoading ? (
            <Typography.Text>加载中…</Typography.Text>
          ) : !commits || commits.length === 0 ? (
            <Typography.Text type="secondary">暂无提交</Typography.Text>
          ) : (
            <Timeline
              items={commits.map((c) => ({
                color:
                  c.status === "success"
                    ? "green"
                    : c.status === "warning"
                    ? "orange"
                    : c.status === "error"
                    ? "red"
                    : "blue",
                children: (
                <Space direction="horizontal" className="w-full justify-between">
                  <Space style={{ columnGap:'15px'}}>
                  <Typography.Text type="secondary">{dayjs(c.committedAt).format("YYYY-MM-DD HH:mm")}</Typography.Text>
                  <Space direction="vertical" size={0} className="align-start">
                    <Typography.Text>{c.message}</Typography.Text>
                    <Typography.Text type="secondary">
                      {c.author} • {c.hash}
                    </Typography.Text>
                    {c.status && (
                      <Tag
                        color={
                          c.status === "success"
                            ? "green"
                            : c.status === "warning"
                            ? "orange"
                            : c.status === "error"
                            ? "red"
                            : "blue"
                        }
                      >
                        {c.status}
                      </Tag>
                    )}
                  </Space>
                </Space>
                    <Typography.Text>{`ai Summary: ${c.message}`}</Typography.Text>
                  </Space>
                ),
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
}


