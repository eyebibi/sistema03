import { prisma } from "@discly/db";
import { UserData } from "@/types/models/user/UserData";

export class User {
  private _data: UserData;

  constructor(data: UserData) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  get canAddMoreServers() {
    if (this.data.plan === "COMPLETE") return true;

    return (
      this.data.serversIds.length < Number(process.env.BASIC_PLAN_SERVERS_LIMIT)
    );
  }

  async addServer(serverId: string) {
    await prisma.user.update({
      where: {
        email: this.data.email,
      },
      data: {
        serversIds: {
          push: serverId,
        },
      },
    });
  }
}
