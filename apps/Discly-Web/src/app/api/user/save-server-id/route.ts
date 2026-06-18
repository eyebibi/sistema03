import { AuthorizationError, ServiceError } from "@/errors";
import { RouteGuard } from "@/models/RouteGuard";
import { UserLoader } from "@/models/UserLoader";
import { saveServerIdSchema } from "@/schemas/api/saveServerId";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const guard = new RouteGuard({
    requiresAuth: true,
    schema: saveServerIdSchema,
  });

  if (!(await guard.isAuthOk())) return guard.unauthorizeRequest();

  const requestBody = await request.json();

  if (!guard.validate(requestBody)) return guard.unauthorizeRequest();

  const customer = await UserLoader.load(guard.data.customerEmail);
  if (!customer) return UserLoader.returnErrorResponse();

  try {
    if (!customer.canAddMoreServers) {
      const error = new AuthorizationError({
        message: "Limite de servidores excedido",
        action:
          "Se você precisa adicionar mais servidores, atualize seu plano.",
        stack: new Error().stack,
      }).toJSON();

      return NextResponse.json(
        { error },
        {
          status: error.statusCode,
        },
      );
    }

    await customer.addServer(guard.data.serverId);

    return NextResponse.json({ error: null });
  } catch (error) {
    console.log(error.stack);

    return NextResponse.json(
      {
        error: new ServiceError({
          stack: error.stack || new Error().stack,
          action: error.action || "Por favor, tente novamente",
          message: error.message || "Erro no banco de dados",
        }).toJSON(),
      },
      {
        status: 500,
      },
    );
  }
}
