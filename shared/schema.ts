import { z } from "zod";

// User schema
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string()
});

export interface User {
  id: number;
  username: string;
  password: string;
}

export type InsertUser = z.infer<typeof insertUserSchema>;

// Response schema
export const insertResponseSchema = z.object({
  annualDay: z.string().optional(),
  additionalInfo: z.string().optional()
});

export interface Response {
  id: number;
  annualDay?: string;
  additionalInfo?: string;
  createdAt: Date;
}

export type InsertResponse = z.infer<typeof insertResponseSchema>;
