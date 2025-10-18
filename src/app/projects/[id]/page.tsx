"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {  Flex, Timeline, Typography, Tag, Space, DatePicker, Select } from "antd";
import type { Commit,Branch } from "@/types/project";
import dayjs from "dayjs";
import { useOptions } from "./useOptions";

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const projectId = params.id;

  const { data: commits, isLoading } = useQuery<Commit[]>({
    queryKey: ["commits", projectId],
    queryFn: async () => {
      const res = await fetch(`/api/projects/${projectId}/commits`);
      if (!res.ok) throw new Error("Failed to fetch commits");
      return res.json();
    },
    enabled: Boolean(projectId),
  });
  
  const { options } = useOptions(projectId);

 

  const [startAt, setStartAt] = useState<dayjs.Dayjs | null>(null);
  const [endAt, setEndAt] = useState<dayjs.Dayjs | null>(null);
  const [branch, setBranch] = useState<string | null>(null);
  const filteredCommits = useMemo(() => {
    if (!commits) return [] as Commit[];
    let result = commits;
    if (startAt) {
      const startMs = startAt.valueOf();
      result = result.filter((c) => dayjs(c.committedAt).valueOf() >= startMs);
    }
    if (endAt) {
      const endMs = endAt.valueOf();
      result = result.filter((c) => dayjs(c.committedAt).valueOf() <= endMs);
    }
    return result;
  }, [commits, startAt, endAt]);

  return (
    <div className="font-sans flex !pt-[32px] justify-center min-h-screen ">
      <div className="w-full max-w-4xl mt-16 flex flex-col gap-8">
        <Flex vertical gap={12} className="mb-6">
          <Typography.Title level={3} style={{ margin: 0 }}>
            项目提交记录
          </Typography.Title>
          <Typography.Text type="secondary">项目ID：{projectId}</Typography.Text>
          <Flex align="center" gap={8}>
            <Typography.Text type="secondary">时间范围：</Typography.Text>
            <DatePicker.RangePicker
              showTime
              allowClear
              placeholder={["起始时间", "终止时间"]}
              onChange={(dates) => {
                setStartAt(dates?.[0] ?? null);
                setEndAt(dates?.[1] ?? null);
              }}
              style={{ width: 520 }}
            />

          
          </Flex>
        </Flex>

        <div>
          {isLoading ? (
            <Typography.Text>加载中…</Typography.Text>
          ) : !filteredCommits || filteredCommits.length === 0 ? (
            <Typography.Text type="secondary">暂无提交</Typography.Text>
          ) : (
            <Timeline
              items={filteredCommits.map((c) => ({
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


