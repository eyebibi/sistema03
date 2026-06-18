import { prisma } from "@discly/db";
import { NextResponse } from "next/server";
import { User } from "./User";

export class UserLoader {
  static async load(email: string) {
    try {
      const userData = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!userData) return null;

      return new User(userData);
    } catch (error) {
      console.error(error);
      return new User(null);
    }
  }

  static returnErrorResponse() {
    return NextResponse.json(
      {
        error: {
          message: "Algo deu errado ao buscar o usuário",
          action: "Tente novamente",
        },
      },
      {
        status: 500,
      },
    );
  }
}
