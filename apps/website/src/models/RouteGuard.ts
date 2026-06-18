import { auth } from "@/auth";
import { RouteGuardParams } from "@/types/models/route-guard/route-guard-params";
import { Session } from "next-auth";
import { NextResponse } from "next/server";
import { ZodObject, ZodRawShape } from "zod";

export class RouteGuard<T extends ZodRawShape> {
  private schema?: ZodObject<T>;
  private _data: ZodObject<T>["_output"];
  private _requiresAuth: boolean;
  private session: Session;

  constructor(guardingOptions: RouteGuardParams<T>) {
    this.schema = guardingOptions.schema;
    this._requiresAuth = guardingOptions.requiresAuth;
  }

  async isAuthOk(): Promise<boolean> {
    if (!this._requiresAuth) return true;

    const session = await auth();
    if (!session) return false;

    this.session = session;
    return true;
  }

  get userSession() {
    if (!this.session) {
      throw new Error(
        "Error [RouteGuard]: Session doesn't exist. It's either invalid or you forgot to call isAuthOk first.",
      );
    }

    return this.session;
  }

  validate(data: T): boolean {
    const parseResult = this.schema.safeParse(data);

    if (!parseResult.success) return false;

    this._data = parseResult.data;
    return true;
  }

  unauthorizeRequest() {
    return NextResponse.json(
      {
        error: {
          message: "Dados inválidos",
        },
      },
      {
        status: 401,
      },
    );
  }

  get data() {
    return this._data;
  }
}
