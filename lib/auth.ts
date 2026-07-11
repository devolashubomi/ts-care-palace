import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, AdminSession } from "./session";

export async function getSession() {
  return getIronSession<AdminSession>(
    await cookies(),
    sessionOptions
  );
}

export async function isAuthenticated() {
  const session = await getSession();

  return session.isLoggedIn === true;
}

export async function requireAuth() {
  const session = await getSession();

  if (!session.isLoggedIn) {
    throw new Error("Unauthorized");
  }

  return session;
}