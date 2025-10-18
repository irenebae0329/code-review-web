"use client";

import React from "react";
import { Card, Flex, Tooltip, Typography } from "antd";
import type { Project } from "@/types/project";
import Link from "next/link";
import dayjs from "dayjs";

type ProjectCardProps = {
  project: Project;
  onClick?: (project: Project) => void;
};


export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <Card
      hoverable
      onClick={() => onClick?.(project)}
      title={
        <Flex align="center" justify="space-between">
          <Typography.Text strong className="max-w-[50%] overflow-hidden text-ellipsis whitespace-nowrap">
            <Tooltip title={project.name}>
              {project.name}
            </Tooltip>
          </Typography.Text>
          <Link href={`/projects/${project.id}`}>{"view github page"}</Link>
        </Flex>
      }
      style={{
        height:'200px'
      }}
    >
      <Flex vertical gap={8}>
        <Typography.Paragraph style={{ marginBottom: 0 }}>
          {project.description}
        </Typography.Paragraph>
        <Typography.Text type="secondary">
          最近更新：{dayjs(project.updatedAt).format("YYYY-MM-DD HH:mm")}
        </Typography.Text>
      </Flex>
    </Card>
  );
}


