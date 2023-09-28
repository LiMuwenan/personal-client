import axios from "~/axios"

/**
 * 查询账单列表
 * @param {*} billQuery 
 * @returns 
 */
export function queryBillList(billQuery) {
    return axios.get(
        "/bill/list",
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

/**
 * 添加账单信息
 * @param {*} bill 
 * @returns 
 */
export function addBillItem(bill) {
    return axios.post(
        "/bill/add",
        {
           title: bill.title,
           cost: bill.cost,
           costTime: bill.costTime,
           code: bill.code
        }
    )
}

export function queryBillOverview(query) {
    return axios.get(
        "/bill/stat",
        {
            params: {
                startTime: query.startTime,
                endTime: query.endTime
            }
        }

    )
}
