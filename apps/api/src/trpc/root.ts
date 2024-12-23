import { router } from './router';
import { mediaRouter } from './routers/media';
import { collectionsRouter } from './routers/collections';
import { tagsRouter } from './routers/tags';
import { usersRouter } from './routers/users';
import { mediaVersionsRouter } from './routers/mediaVersions';
import { processedMediaRouter } from './routers/processedMedia';
import { systemRouter } from './routers/system';
import { statsRouter } from './routers/stats';
import { adminRouter } from './routers/admin';

export const appRouter = router({
  media: mediaRouter,
  collections: collectionsRouter,
  tags: tagsRouter,
  users: usersRouter,
  mediaVersions: mediaVersionsRouter,
  processedMedia: processedMediaRouter,
  system: systemRouter,
  stats: statsRouter,
  admin: adminRouter,
});
export type AppRouter = typeof appRouter;
