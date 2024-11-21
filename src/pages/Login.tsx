import Layout from "./_layout.tsx"
import {ChangeEvent, useState} from "react"
import axios from "axios"
// import {LoginResponse} from "../types/reponse.ts";

export default function Login() {
    const [message, setMessage] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleLogin = async () => {
        const url = "http://localhost:8080/api/auth/login"

        if (!email || !password) {
            setMessage("Email and password are required")
            return
        }

        const credentials = {
            email: email,
            password: password
        }

        await axios.post(url, credentials)
            .then(response => {
                localStorage.setItem("token", response.data.token)
                setMessage(response.data.message)
                console.log(response)
            })
            .catch(error => {
                setMessage(error.response.data.message)
                console.error(error)
            })
    }

    return (
        <Layout>
            <div>
                <div className={"bg-red-200 flex flex-col gap-y-2 px-4"}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                    <button onClick={handleLogin}>Login</button>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </Layout>
    )
}