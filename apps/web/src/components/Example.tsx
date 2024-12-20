import { trpc } from '../utils/trpc';

export const Example = () => {
  const hello = trpc.example.hello.useQuery('world');

  if (hello.isLoading) return <div>Loading...</div>;
  
  return <div>{hello.data}</div>;
};
