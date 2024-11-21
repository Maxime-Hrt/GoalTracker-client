import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import {getTokenFromLS, refreshToken} from "../../lib/auth.ts"

interface CheckTokenProps {
    setMessage: (message: string) => void
}

const CheckToken = (props: CheckTokenProps) => {
    const { setMessage } = props
    const [refresherPopup, setRefresherPopup] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function checkToken() {
            const tokenFromLS = localStorage.getItem("token")
            if (!tokenFromLS) {
                navigate("/login", { replace: true })
            } else {
                const url = `http://localhost:8080/api/auth/validate-token?token=${tokenFromLS}`

                await axios.get(url)
                    .then(response => {
                        console.log("Response from checkToken: ", response.data)
                        // typeof response.data.status = string
                        if (response.data.status == 200) {
                            setMessage(response.data.message)
                        } else if (response.data.status == 401) {
                            setRefresherPopup(true)
                        } else {
                            navigate("/login", { replace: true })
                        }
                    })
                    .catch(error => {
                        console.error(error)
                    })
            }
        }

        checkToken()
    }, [setMessage, navigate])

    if (refresherPopup) {
        return (
            <>
                {/* Overlay */}
                <div
                    className="fixed inset-0 bg-black opacity-50 z-10"
                    onClick={() => setRefresherPopup(false)}
                ></div>

                {/* Popup */}
                <div className="fixed inset-0 flex items-center justify-center z-20">
                    <div className="w-[400px] bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Session Expired</h2>
                            <button
                                className="text-gray-500 hover:text-gray-800"
                                onClick={() => setRefresherPopup(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <p className="mb-6">Your session has expired. Please log in again to continue.</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                                onClick={() => setRefresherPopup(false)}
                            >
                                Close
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={
                                    async () => {
                                        const token = getTokenFromLS()
                                        if (!token) {
                                            setMessage("Session expired")
                                            navigate("/login", { replace: true })
                                            return
                                        }

                                        const response = await refreshToken(token)

                                        console.log("Response from refreshToken: dans compo", response)

                                        if (response.ok) {
                                            setMessage(response.message)
                                            setRefresherPopup(false)
                                            console.log("Session extended")
                                        } else {
                                            setMessage(response.message)
                                            console.log("Session expired")
                                            navigate("/login", { replace: true })
                                        }
                                    }
                                }
                            >
                                Extend Session
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return <></>
}

export default CheckToken