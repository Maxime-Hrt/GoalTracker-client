import {useEffect, useState} from "react"
import {User} from "../types/user.ts"
import UserMock from "../mocks/user.ts"
import {CiAlignLeft, CiMenuBurger, CiSettings, CiSquarePlus} from "react-icons/ci"
import {LiaTimesSolid} from "react-icons/lia"
import {Task} from "../types/task.ts"
import TaskMock from "../mocks/task.ts"
import { useNavigate} from "react-router-dom"

const Dashboard = () => {
    const user: User = UserMock
    const tasks: Task[] = TaskMock

    const [showMenu, setShowMenu] = useState<boolean>(true)
    const [showMenuRetarded, setShowMenuRetarded] = useState<boolean>(true)

    const navigate = useNavigate()

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    useEffect(() => {
        function displayMenu() {
            if (!showMenu) {
                setShowMenuRetarded(false)
                return
            }
            if (showMenu !== showMenuRetarded) {
                setTimeout(() => {
                    setShowMenuRetarded(!showMenuRetarded)
                }, 150)
            }
        }

        displayMenu()
    }, [showMenu])

    const onLogout = () => {
        localStorage.removeItem("user")
        navigate("/")
    }

    return (
        <div className={"w-screen h-screen flex bg-gray-900"}>
            <div className={`duration-300 ${showMenu ? "w-1/6 p-3" : "w-0"}`}>
                { showMenuRetarded && (
                    <div className={"h-full  flex flex-col justify-between"}>
                        <div className={"text-white flex flex-col"}>
                            <span className={"font-knewave-regular text-6xl mb-4 pl-2"}>G</span>
                            <span className={"h-10 hover:rounded-md flex gap-x-1 items-center pl-2 hover:bg-gray-400"}><CiSquarePlus className={"text-xl"}/><p>New Task</p></span>
                            <span className={"h-10 hover:rounded-md flex gap-x-1 items-center pl-2 hover:bg-gray-400"}><CiAlignLeft className={"text-xl"}/><p>Statistics</p></span>
                            <span className={"h-10 hover:rounded-md flex gap-x-1 items-center pl-2 hover:bg-gray-400"}><CiSettings className={"text-xl"}/><p>Settings</p></span>
                        </div>
                        <span onClick={onLogout} className={"bg-white text-black p-2 rounded-full hover:bg-gray-200 duration-300"}>Logout</span>
                    </div>
                )}
            </div>
            <div className={`bg-white rounded-3xl flex duration-300 p-6 relative ${showMenu ? "w-5/6" : "w-full"}`}>
                <span className={"text-xl absolute top-4 left-4"} onClick={toggleMenu}>{showMenu  ? <CiMenuBurger/> : <LiaTimesSolid />}</span>
                <div className={"text-3xl mt-8"}><p>Welcome back <span className={"italic"}>{user.username}</span></p></div>
                <div>
                    <div className={"text-2xl mt-8"}><p>Tasks</p></div>
                    <div className={"flex flex-col gap-y-4 mt-4"}>
                        {tasks.map((task: Task) => (
                            <div className={"flex gap-x-4"}>
                                <div className={"flex flex-col gap-y-2"}>
                                    <span className={"text-xl"}>{task.name}</span>
                                    <span className={"text-sm"}>{task.description}</span>
                                </div>
                                <div className={"flex flex-col gap-y-2"}>
                                    <span className={"text-xl"}>{task.goal.title}</span>
                                    <span className={"text-sm"}>{task.goal.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard