import axios from "~/axios"

export function queryUserList() {
    return axios.get(
        "/api/user/userList"
    )
}