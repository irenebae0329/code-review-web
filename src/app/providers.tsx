"use client";

import React from "react";
import { ConfigProvider, theme } from "antd";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type ProvidersProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();


export default function Providers({ children }: ProvidersProps) {
  
  return (
    <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm,components:{
      Table:{
        headerBg:'#f6f8fa',
      },
      Layout:{
        headerBg:'#f6f8fa',
      },
      Card:{
        headerBg:'#f6f8fa',
      },
      Typography:{
        colorTextSecondary:'#59636e',
      },
      Button:{
        defaultBorderColor:'#f6f8fa'
      }
    },
    token:{
      colorPrimary:'#f6f8fa',
      colorIcon:'rgb(89, 99, 110)',
    },
    }}>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
    </ConfigProvider>
  );
}


