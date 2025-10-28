"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Button, ConfigProvider, Flex, List, Space, Typography } from "antd";
import dayjs from "dayjs";
import type { CodeReviewResult } from "@prisma/client";
import { fetchGithubAvatarByToken } from "@/lib/github";
import { useSession } from "next-auth/react";
import useCodeReviewResultListStyles from "./style";
import { SecurityFinding } from "@/types/project";


type CodeReviewResultTableProps = {
  data: CodeReviewResult[];
  loading?: boolean;
  onRowClick?: (row: CodeReviewResult) => void;
};


export default function CodeReviewResultList({ data, loading, onRowClick }: CodeReviewResultTableProps) {
  const session = useSession();
  const accessToken = session.data?.accessToken;
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  
  useEffect(() => {
      fetchGithubAvatarByToken(accessToken as string).then((avatarUrl) => {
        setAvatarUrl(avatarUrl);
      });
  }, [accessToken]);

  const {
    styles:{
      avatar,
      listItemContent,
      listItem,
      listItemFlex,
      buttonDanger,
      buttonSafe
    }
  } = useCodeReviewResultListStyles();


  const renderListItemContent = (item: CodeReviewResult) => {
    
    const parsedSummaryResult = JSON.parse(JSON.stringify(item.summary_result)) as any;
    const parsedSecurityResult = JSON.parse(JSON.stringify(item.security_result)) as SecurityFinding[];

    return (
    <List.Item
      onClick={() => onRowClick?.(item)}
      className={listItem}
      >
      <Flex className={listItemFlex}>
        <Space direction="vertical" className={listItemContent} >
          <Typography.Text strong>{parsedSummaryResult?.summary?.overview}</Typography.Text>
          <Space direction="horizontal" >
            <Avatar src={avatarUrl} className={avatar}/>
            <Typography.Text type="secondary">{`authored By: ${item.author} at ${dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')}`}</Typography.Text>
          </Space>
        </Space>
        {parsedSecurityResult.length > 0 ?  <Button variant="outlined" className={buttonDanger}>risky</Button> : <Button variant="outlined" className={buttonSafe}>safe</Button>}
      </Flex>
    </List.Item>
    );
  };
  return (

    <List<CodeReviewResult>
      dataSource={data}
      loading={loading}
      rowKey={(item) => item.id.toString()}
      itemLayout="horizontal"
      bordered
      renderItem={
        renderListItemContent
      }
    />
  );
}