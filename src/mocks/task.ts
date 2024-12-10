import {Task} from "../types/task.ts";
import UserMock from "./user.ts";

const TaskMock: Task[] = [
    {
        id: "1",
        name: "Task 1",
        description: "Description of Task 1",
        status: "PENDING",
        dueDate: "2021-01-01",
        goal: {
            id: "1",
            title: "Goal 1",
            description: "Description of Goal 1",
            status: "PENDING",
            createdDate: "2021-01-01",
            targetDate: "2021-12-31",
            user: UserMock
        }
    }, {
        id: "2",
        name: "Task 2",
        description: "Description of Task 2",
        status: "IN_PROGRESS",
        dueDate: "2021-02-01",
        goal: {
            id: "2",
            title: "Goal 2",
            description: "Description of Goal 2",
            status: "IN_PROGRESS",
            createdDate: "2021-02-01",
            targetDate: "2021-12-31",
            user: UserMock
        }
    }, {
        id: "3",
        name: "Task 3",
        description: "Description of Task 3",
        status: "COMPLETED",
        dueDate: "2021-03-01",
        goal: {
            id: "3",
            title: "Goal 3",
            description: "Description of Goal 3",
            status: "COMPLETED",
            createdDate: "2021-03-01",
            targetDate: "2021-12-31",
            user: UserMock
        }
    }
]

export default TaskMock