import { SessionOptions } from "iron-session";

export interface AdminSession {
  isLoggedIn: boolean;
  adminId?: string;
  email?: string;
}

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    "change-this-to-a-long-random-secret-at-least-32-characters",

  cookieName: "ts-care-palace-admin",

  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  },
};