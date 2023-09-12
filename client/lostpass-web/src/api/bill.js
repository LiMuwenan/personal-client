import axios from "~/axios"

export function queryBillList(billQuery) {
    return axios.get(
        "/api/bill/list",
        {
            params: {
                codes: billQuery.codes,
                startTime: billQuery.startTime,
                endTime: billQuery.endTime,
                lowCost: billQuery.lowCost,
                highCost: billQuery.highCost,
                // 分页
                size: billQuery.page.size,
                current: billQuery.page.current
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
