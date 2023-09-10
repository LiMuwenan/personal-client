import axios from "~/axios"

export function queryBillList() {
    return axios.get(
        "/api/bill/list"
    )
}

export function addBillItem(bill) {
    return axios.post(
        "/api/bill/add",
        {
           title: bill.title,
           cost: bill.cost,
           costTime: bill.costTime,
           code: bill.code
        }
    )
}
