import { publicProcedure, router } from "../router";
import { getDiskStats } from "../../utils/system";

export const systemRouter = router({
  getDiskUsage: publicProcedure.query(getDiskStats)
});
