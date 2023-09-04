import axios from "~/axios"

export function queryBillList() {
    return axios.get(
        "/api/bill/list"
    )
}
