import axios from "~/axios"

export function login(username, password) {
    return axios.post(
        "/user/login", 
        {
            username,
            password
        }
    )
}
