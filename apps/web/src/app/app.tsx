import { Route, Routes, Link } from 'react-router-dom';
import { trpc } from '../utils/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useState } from 'react';

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc',
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div>
          <h1>My Examples</h1>
          <ExampleList />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function ExampleList() {
  const { data, isLoading } = trpc.example.getAll.useQuery();

  if (isLoading) return <div>Loading your examples...</div>;

  return (
    <div>
      {data?.map((example) => (
        <div key={example.id}>
          <h2>{example.name}</h2>
          <p>{example.description}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
