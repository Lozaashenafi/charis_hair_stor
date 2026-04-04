import { db } from "@/db";
import { messages } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getAdminMessages() {
  try {
    return await db.select().from(messages).orderBy(desc(messages.createdAt));
  } catch (error) {
    console.error("Fetch Messages Error:", error);
    return [];
  }
}

