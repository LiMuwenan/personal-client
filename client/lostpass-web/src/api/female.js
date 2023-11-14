import axios from '~/axios'

/**
 * 查记录
 * @param {*} data 
 * @returns 
 */
export function queryRecords(data) {
    return axios.post(
        "/female/query",
        {
            startTime: data.startTime,
            endTime: data.endTime
        }
    )
}

/**
 * 更改记录
 * @param {*} data 
 * @returns 
 */
export function changePeriod(data) {
    return axios.post(
        "/female/change",
        {
            sex: data.sex,
            today: data.today,
            ovulationDay: data.ovulationDay,
            status: data.status
        }
    )
}