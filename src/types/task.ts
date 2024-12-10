import {Goal} from "./goal.ts";

export interface Task {
    id: string
    name: string
    description: string
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED"
    dueDate: string
    goal: Goal
}