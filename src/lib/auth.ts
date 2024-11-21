import axios from "axios";

const getTokenFromLS = () => {
    return localStorage.getItem('token')
}


type Message = {
    message: string
    ok: boolean
}
const refreshToken = async (token: string): Promise<Message> => {
    if (!token) {
        return { message: "No token provided", ok: false }
    }

    const url = `http://localhost:8080/api/auth/refresh-token`
    const credentials = { token }

    try {
        const response = await axios.post(url, credentials, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("Response from refreshToken: dans func ", response.data)

        if (response.data.status === "200") {
            localStorage.setItem("token", response.data.token)
            return { message: response.data.message, ok: true }
        } else {
            console.log("Token refresh failed")
            return { message: response.data.message, ok: false }
        }
    } catch (error: any) {
        console.error(error.response?.data || error.message)
        return { message: error.response?.data?.message || error.message, ok: false }
    }
}

export {getTokenFromLS, refreshToken};