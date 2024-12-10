import Layout from "./_layout.tsx"
import {useEffect} from "react";
import {User} from "../types/user.ts";
import {getUserDataFromLocalStorage} from "../lib/auth.ts";
import {useNavigate} from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()

    useEffect(() => {
        const user: User | null  = getUserDataFromLocalStorage()
        if (user) {
            navigate("/dashboard")
        }
    }, []);
    return (
        <Layout>
            <div
                className={"w-full flex justify-center h-full inset-0 bg-white p-4 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:16px_16px]"}>
                {/* Main Page Section*/}
                <section className={"flex w-4/5 flex-col text-center gap-y-2 justify-center items-center"}
                         style={{minHeight: "calc(100vh - 6rem)"}}>
                    <h1 className={"text-5xl font-bold"}>Goal Tracker</h1>
                    <p className={"text-gray-500 text-lg"}>An application that allows users to define, track, and manage
                        their Objectives and Key Results (OKRs) or daily/monthly habits.</p>
                    <button
                        className={"border border-dashed border-gray-400 animate-bounce text-gray-500 p-4 font-thin text-lg rounded-full hover:bg-gray-200 hover:bg-opacity-40 duration-300 mt-8"}>Learn
                        More
                    </button>
                </section>
            </div>
        </Layout>
    )
}