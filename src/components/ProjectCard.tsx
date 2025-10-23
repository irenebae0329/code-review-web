"use client";

import React from "react";
import { Card, Flex, Tooltip, Typography, Tag } from "antd";
import type { Project } from "@/types/project";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { GithubOutlined, PlusCircleOutlined } from "@ant-design/icons";

type ProjectCardProps = {
  project: Project;
};


export default function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter();
  return (
    <Card
      hoverable
      onClick={() => router.push(`/projects/${project.id}`)}
      title={
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={8} className="max-w-[60%]">
            <Tag color={project.hasConfiged ? "green" : "default"} style={{ marginRight: 8 }}>
              {project.hasConfiged ? "已配置" : "未配置"}
            </Tag>
            <Typography.Text strong className="overflow-hidden text-ellipsis whitespace-nowrap">
              <Tooltip title={project.name}>
                {project.name}
              </Tooltip>
            </Typography.Text>
          </Flex>
          <Flex align="center" gap={12} onClick={(e) => e.stopPropagation()}>
            {/** GitHub repo link icon */}
            <a
              href={project.repoUrl || (project.owner && project.repo ? `https://github.com/${project.owner}/${project.repo}` : "#")}
              target="_blank"
              rel="noreferrer"
              aria-label="Open GitHub repository"
              onClick={(e) => {
                if (!project.repoUrl && !(project.owner && project.repo)) e.preventDefault();
              }}
            >
              <Tooltip title="GitHub">
                <GithubOutlined style={{ fontSize: 18 }} />
              </Tooltip>
            </a>

            {!project.hasConfiged && (
              <a
                href={project.webhookSettingsUrl ? `${project.webhookSettingsUrl}/new` : (project.owner && project.repo ? `https://github.com/${project.owner}/${project.repo}/settings/hooks/new` : "#")}
                target="_blank"
                rel="noreferrer"
                aria-label="Configure webhook"
                onClick={(e) => {
                  if (!project.webhookSettingsUrl && !(project.owner && project.repo)) e.preventDefault();
                }}
              >
                <Tooltip title="配置 Webhook">
                  <PlusCircleOutlined style={{ fontSize: 18 }} />
                </Tooltip>
              </a>
            )}
          </Flex>
        </Flex>
      }
      style={{
        height:'200px'
      }}
    >
      <Flex vertical gap={8} justify='space-between'  style={ {
        height:'100px',
      }}>
        <Typography.Paragraph style={{ marginBottom: 0,flex:1,maxHeight:'60%',overflow:'scroll' }}>
            {project.description}
        </Typography.Paragraph>
        <Typography.Text type="secondary">
          最近更新：{dayjs(project.updatedAt).format("YYYY-MM-DD HH:mm")}
        </Typography.Text>
      </Flex>
    </Card>
  );
}


