import { ElNotification } from 'element-plus'

export function toast(message, type = "success") {
    ElNotification({
        message,
        type,
        duration: 3000
    })
}

export function coverterTime(rawTime, method) {
    let rawDate = new Date(rawTime);
    let date = rawDate.getFullYear()
        + "-"
        + ('0' + (rawDate.getMonth() + 1)).slice(-2)
        + "-"
        + ('0' + rawDate.getDate()).slice(-2)
        + 'T'
        + ('0' + rawDate.getHours()).slice(-2)
        + ":" 
        + ('0' + rawDate.getMinutes()).slice(-2)
        + ":" 
        + ('0' + rawDate.getSeconds()).slice(-2)
    return date
}