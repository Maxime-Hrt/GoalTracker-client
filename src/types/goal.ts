import { User } from "./user.ts";

export interface Goal {
    id: string
    title: string
    description: string
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"
    createdDate: string
    targetDate: string
    user: User
}