import { UserPlan } from "@discly/db";

export interface UserData {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  discordUserId: string | null;
  plan: UserPlan;
}
