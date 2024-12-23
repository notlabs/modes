import { getDiskStats } from '../../utils/system';
import { protectedProcedure } from '../middleware/auth';
import { router } from '../router';

export const systemRouter = router({
  getDiskUsage: protectedProcedure.query(getDiskStats),
});
