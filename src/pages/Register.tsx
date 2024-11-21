import Layout from "./_layout.tsx";
import {ChangeEvent, useState} from "react";
import axios from "axios";

export default function Register() {
    const [username, setUsername] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    const onRegister = async () => {
        if (!username || !email || !password || !confirmPassword) {
            setMessage("All fields are required")
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
            return;
        }

        const graphqlEndpoint = `http://localhost:8080/api/graphql`
        const mutationQuery = `
            mutation {
                createUser(email: "${email}", password: "${password}", role: "USER", username: "${username}") {
                    id
                    email
                    role
                    username
                }
            }
        `
        try {
            const response = await axios.post(
                graphqlEndpoint,
                { query: mutationQuery },
                { headers: { "Content-Type": "application/json" } }
            )

            console.log(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Layout>
            <h1>Register</h1>
            <div className={"flex flex-col gap-y-3"}>
                <div className={"flex-col flex"}>
                    <label htmlFor={"username"}>Username</label>
                    <input type={"text"} id={"username"} onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                </div>
                <div className={"flex-col flex"}>
                    <label htmlFor={"email"}>Email</label>
                    <input type={"email"} id={"email"} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                </div>
                <div className={"flex-col flex"}>
                    <label htmlFor={"password"}>Password</label>
                    <input type={"password"} id={"password"} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                </div>
                <div className={"flex-col flex"}>
                    <label htmlFor={"confirmPassword"}>Confirm Password</label>
                    <input type={"password"} id={"confirmPassword"} onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} />
                </div>
                <button onClick={onRegister}>Register</button>
                <p>{message}</p>
            </div>
        </Layout>
    )
}