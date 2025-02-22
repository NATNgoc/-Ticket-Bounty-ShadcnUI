import { ticketStatusList } from "@/features/ticket/type";
import { z } from "zod";

export const TicketsPrefix = "tickets";

export const upsertZodSchema = z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(3).max(1000),
    status: z.enum(ticketStatusList),
});
