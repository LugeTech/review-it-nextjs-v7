"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const QueryProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    {children}
  </QueryClientProvider>
);

export default QueryProvider;
