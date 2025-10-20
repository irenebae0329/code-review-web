import { Button, Card, Typography, Space, message } from "antd";
import { signIn, signOut } from "next-auth/react";
import { GithubFilled } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";  
import { useEffect } from "react";
export default function Authorization() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const error = searchParams.get("error");
  useEffect(() => {
    if (error) {
      // 主动清除 NextAuth 的 session cookie
      signOut({ redirect: false });
      // 根据错误类型提示
      switch (error) {
        case "OAuthCallback":
          message.error("授权回调失败，已清除登录状态，请重试。");
          break;
        case "OAuthSignin":
          message.error("无法连接到认证服务器，请稍后再试。");
          break;
        default:
          message.error(`登录失败：${error}`);
      }
    }
  }, [error]);
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