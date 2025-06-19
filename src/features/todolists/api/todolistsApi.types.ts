import z from "zod/v4";
import {todolistSchema} from "@/features/todolists/lib/schemas";

export type Todolist = z.infer<typeof todolistSchema>
