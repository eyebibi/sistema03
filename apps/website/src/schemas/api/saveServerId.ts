import { z } from "zod";

export const saveServerIdSchema = z.object({
  customerEmail: z.string().email().nonempty(),
  serverId: z.string().nonempty(),
});
