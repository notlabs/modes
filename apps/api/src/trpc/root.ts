import { router } from './router';
import { mediaRouter } from './routers/media';
import { collectionsRouter } from './routers/collections';
import { tagsRouter } from './routers/tags';
import { usersRouter } from './routers/users';
import { mediaVersionsRouter } from './routers/mediaVersions';
import { processedMediaRouter } from './routers/processedMedia';
import { systemRouter } from './routers/system';

export const appRouter = router({
  media: mediaRouter,
  collections: collectionsRouter,
  tags: tagsRouter,
  users: usersRouter,
  mediaVersions: mediaVersionsRouter,
  processedMedia: processedMediaRouter,
  system: systemRouter,
});
export type AppRouter = typeof appRouter;
