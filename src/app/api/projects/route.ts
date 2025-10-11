import { NextResponse } from "next/server";

type Project = {
  id: string;
  name: string;
  description: string;
  status: "active" | "paused" | "archived";
  updatedAt: string; // ISO string
};

export async function GET() {
  const projects: Project[] = [
    {
      id: "p1",
      name: "AI Review Web",
      description: "Next.js + Ant Design + React Query 集成与项目评审界面。",
      status: "active",
      updatedAt: new Date().toISOString(),
    },
    {
      id: "p2",
      name: "Model Serving",
      description: "LLM 推理服务与负载均衡，支持多租户与观测性。",
      status: "paused",
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "p3",
      name: "Data Pipeline",
      description: "事件采集、清洗与特征生成的数据流。",
      status: "active",
      updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      id: "p4",
      name: "Observability",
      description: "统一日志、指标、追踪与告警平台整合。",
      status: "archived",
      updatedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    },
  ];

  return NextResponse.json(projects);
}


