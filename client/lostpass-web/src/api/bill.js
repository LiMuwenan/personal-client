import axios from "~/axios"
import qs from 'qs'

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
                title: billQuery.title,
                startTime: billQuery.startTime,
                endTime: billQuery.endTime,
                lowCost: billQuery.lowCost,
                highCost: billQuery.highCost,
                // 分页
                size: billQuery.page.size,
                current: billQuery.page.current,
            },
            paramsSerializer: params => {
                return qs.stringify(params, { indices: false })
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

/**
 * 更新账单
 */
export function uppdateBillItem(bill) {
    return axios.post(
        "/bill/update",
        {
            id: bill.id,
            cost: bill.cost,
            costTime: bill.costTime,
            code: bill.code,
            title: bill.title
        }
    )
}
/**
 * 删除帐单
 */
export function deleteBillItem(ids) {
    return axios.post(
        "/bill/delete",
        {
            ids: ids
        }
    )
}

/**
 * 查询总览
 * @param {*} query 
 * @returns 
 */
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

/**
 * 查询种类
 * @returns 
 */
export function queryCategory() {
    return axios.post(
        "/billCategory/query",
        {}
    )
}

/**
 * 添加种类
 * @param {*} data 
 * @returns 
 */
export function addCategory(data) {
    return axios.post(
        "/billCategory/add",
        {
            code: data.code,
            message: data.message,
            status: data.status
        }
    )
}

/**
 * 编辑更新种类
 * @param {*} data 
 * @returns 
 */
export function updateCategory(data) {
    return axios.post(
        "/billCategory/update",
        {
            id: data.id,
            code: data.code,
            message: data.message,
            status: data.status
        }
    )
}

/**
 * 删除种类
 * @param {*} data 
 * @returns 
 */
export function deleteCategory(data) {
    return axios.post(
        "/billCategory/delete",
        {
            id: data.id
        }
    )
}