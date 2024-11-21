import { useState } from "react";
import CheckToken from "../components/auth/CheckToken.tsx";

export default function TryToken() {
    const [message, setMessage] = useState<string>("")

    return (
        <div>
            <CheckToken
                setMessage={setMessage}
            />
            <h1>Try Token</h1>
            <p>{message}</p>
        </div>
    )
}