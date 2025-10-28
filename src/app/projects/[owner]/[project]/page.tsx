"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { ConfigProvider, Divider, Flex, Space, Timeline, Typography } from "antd";
import { theme } from "antd";
import { CodeReviewResult } from "@prisma/client";
import CodeReviewResultList from "./components/CodeReviewResultList/codeReviewResultList";
import { useProjectDetailStyles } from "./style";
export default function ProjectDetailPage() {
  const params = useParams<{ owner: string, project: string }>();
  const projectId = params.project;
  const owner = params.owner;
  const { styles } = useProjectDetailStyles();
  const {token:{colorIcon}} = theme.useToken();
  type GroupByDay = { day: string; records: CodeReviewResult[] };

  const { data: groups, isLoading } = useQuery<GroupByDay[]>({
    queryKey: ["codeReviewResults", projectId, "day"],
    queryFn: async () => {
      const url = `/api/nextjs/results?repo=${owner}/${projectId}&groupBy=day`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch code review results");
      return res.json();
    },
    enabled: Boolean(projectId),
  });
 

 

  return (
    <ConfigProvider theme={{
      components:{
        Button:{
          defaultBorderColor:'#f6f8fa'
        }
      }
    }}>
    <div className="font-sans flex justify-center min-h-screen w-full">
      <div className="w-full max-w-7xl mt-16 flex flex-col gap-8">
        <Flex vertical gap={12} className="mb-6">
          <Typography.Title level={3} style={{ margin: 0 }}>
            Code Review Results
          </Typography.Title>
        </Flex>
        <Divider className={styles.divider} />
        <div>
          {isLoading ? (
            <Typography.Text>加载中…</Typography.Text>
          ) : !groups || groups.length === 0 ? (
            <Typography.Text type="secondary">暂无提交</Typography.Text>
          ) : (
            <Timeline
              items={groups.map((g) => ({
                color:colorIcon,
                children: (
                  <Space direction="vertical" className="w-full">
                    <Typography.Text type="secondary">{`Commits on ${g.day}`}</Typography.Text>
                    <CodeReviewResultList data={g.records} />
                </Space>
                ),
              }))}
            />
          )}
        </div>
      </div>
    </div>
</ConfigProvider>
  );
}


