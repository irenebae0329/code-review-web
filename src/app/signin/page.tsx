"use client";

import { Button, Card, Typography, Space } from "antd";
import { signIn } from "next-auth/react";
import { GithubFilled } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/"
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <Card style={{ maxWidth: 420, width: "100%" }}>
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <Typography.Title level={3} style={{ margin: 0 }}>
            使用 GitHub 登录
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            我们将跳转至 GitHub 完成认证。是否继续？
          </Typography.Paragraph>
          <Space style={{ width: "100%" }} size={12}>
            <Button
              type="primary"
              block
              icon={<GithubFilled />}
              onClick={() => signIn("github", { callbackUrl })}
            >
              继续 GitHub 登录
            </Button>
            <Button
              block
              onClick={() => {
                import("antd").then(({ message }) => {
                  message.info("请先进行登陆认证");
                });
              }}
            >
              取消返回首页
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
}


