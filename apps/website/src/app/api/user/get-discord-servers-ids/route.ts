import { RouteGuard } from "@/models/RouteGuard";
import { prisma } from "@discly/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const guard = new RouteGuard({
      requiresAuth: true,
    });

    if (!(await guard.isAuthOk())) return guard.unauthorizeRequest();

    const userServers = await prisma.user.findUnique({
      where: {
        email: guard.userSession.user.email,
      },
      select: {
        serversIds: true,
      },
    });

    return NextResponse.json({
      error: null,
      data: userServers.serversIds,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: error,
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}
