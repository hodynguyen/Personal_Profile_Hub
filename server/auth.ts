import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import type { Express, Request, Response, NextFunction } from "express";
import { storage } from "./storage";
import { pool } from "./db";
import { api } from "@shared/routes";
import { z } from "zod";

const scryptAsync = promisify(scrypt);

declare global {
  namespace Express {
    interface User {
      id: number;
      username: string;
      password: string;
      createdAt: Date | null;
    }
  }
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

export async function comparePasswords(
  supplied: string,
  stored: string,
): Promise<boolean> {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) return next();
  return res.status(401).json({ message: "Not authenticated" });
}

export function setupAuth(app: Express) {
  const PgStore = connectPgSimple(session);

  const sessionMiddleware = session({
    store: new PgStore({
      pool,
      // Table is defined in shared/schema.ts and created by `npm run db:push`
      createTableIfMissing: false,
    }),
    secret: process.env.SESSION_SECRET || "dev-session-secret-change-me",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 604800000, // 7 days
      sameSite: "lax",
    },
  });

  app.use(sessionMiddleware);
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user) {
          return done(null, false, { message: "Invalid credentials" });
        }
        const isValid = await comparePasswords(password, user.password);
        if (!isValid) {
          return done(null, false, { message: "Invalid credentials" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user || undefined);
    } catch (err) {
      done(err);
    }
  });

  // Register route
  app.post(api.auth.register.path, async (req, res, next) => {
    try {
      const existingCount = await storage.getUserCount();
      if (existingCount > 0) {
        return res.status(403).json({ message: "Registration is closed" });
      }

      const input = api.auth.register.input.parse(req.body);
      const hashedPassword = await hashPassword(input.password);

      const user = await storage.createUser({
        username: input.username,
        password: hashedPassword,
      });

      req.login(user, (err) => {
        if (err) return next(err);
        return res.status(201).json({
          id: user.id,
          username: user.username,
          createdAt: user.createdAt?.toISOString() ?? null,
        });
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      next(err);
    }
  });

  // Login route
  app.post(api.auth.login.path, (req, res, next) => {
    passport.authenticate(
      "local",
      (err: Error | null, user: Express.User | false, info: { message: string } | undefined) => {
        if (err) return next(err);
        if (!user) {
          return res.status(401).json({ message: info?.message ?? "Invalid credentials" });
        }
        req.login(user, (err) => {
          if (err) return next(err);
          return res.json({
            id: user.id,
            username: user.username,
            createdAt: user.createdAt?.toISOString() ?? null,
          });
        });
      },
    )(req, res, next);
  });

  // Logout route
  app.post(api.auth.logout.path, (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie("connect.sid");
        return res.json({ success: true });
      });
    });
  });

  // Session route
  app.get(api.auth.session.path, (req, res) => {
    if (!req.isAuthenticated() || !req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    return res.json({
      id: req.user.id,
      username: req.user.username,
      createdAt: req.user.createdAt?.toISOString() ?? null,
    });
  });
}
