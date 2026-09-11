import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { type PropsWithChildren, useState } from 'react';

function shouldRetry(failureCount: number, error: unknown): boolean {
  // Client errors (4xx) won't succeed on retry — only retry network/server failures.
  if (isAxiosError(error) && error.response && error.response.status < 500) {
    return false;
  }
  return failureCount < 3;
}

export function QueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: shouldRetry },
        },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
