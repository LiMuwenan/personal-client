import axios from "~/axios"

export function queryBillList(billQuery) {
    return axios.get(
        "/api/bill/list",
        {
            params: {
                code: 1,
                costTime: '',
                size: 20,
                current: 2
            }
        }

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
