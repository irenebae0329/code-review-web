"use client";

import React from "react";
import { Layout, Grid } from "antd";
import Sidebar from "./Sidebar";

const { Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const screens = useBreakpoint();
  const isSmallScreen = !screens.lg;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth={isSmallScreen ? 0 : 64}
        width={220}
        style={{ background: "transparent" }}
      >
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            paddingInline: 16,
            fontWeight: 600,
          }}
        >
          AI Review
        </div>
        <Sidebar />
      </Sider>
      <Layout>
        <Content style={{ padding: 16 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}


