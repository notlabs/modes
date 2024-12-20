'use client';
import { trpc } from '../utils/trpc';

export default function Home() {
  const { data, isLoading } = trpc.example.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Examples from Database</h1>
      {data?.map((example) => (
        <div key={example.id}>
          <h2>{example.name}</h2>
          <p>{example.description}</p>
        </div>
      ))}
    </div>
  );
}
