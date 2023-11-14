<template>
    <el-calendar>
        <template #date-cell="{ data }">
            <div @click="select(data)">
                <el-row>
                    {{ data.day.split("-").slice(2).join("-") }}
                </el-row>
                <div v-for="(item, index) in getFromCalendarData(data)" :key="index">
                    <el-row v-if="item.status != 0">😢</el-row>
                    <el-row v-if="item.sex != 0">♥</el-row>
                    <el-row v-if="item.ovulationDay != 0">☁</el-row>
                </div>
            </div>

        </template>

    </el-calendar>
    <div @click="changeDayStatus">
        <el-row>
            <el-switch v-model="period.status" active-text="来了" inactive-text="没来" :active-value="1" :inactive-value="0" />
        </el-row>
        <el-row>
            <el-switch v-model="period.ovulationDay" active-text="是" inactive-text="否" :active-value="1" :inactive-value="0" />
        </el-row>
        <el-row>
            <el-switch v-model="period.sex" active-text="有" inactive-text="无" :active-value="1" :inactive-value="0" />
        </el-row>
    </div>
</template>

<style setup>
.is-selected {
    color: #F56C6C;
}

.card {
    color: #F56C6C;
}
</style>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { queryRecords, changePeriod } from '~/api/female.js'
import { toast, coverterTime } from '~/util/util.js'
onMounted(() => {
    queryRecord()
})


const calendarData = ref([])
/**
 * 查询查询月份前后共两个月的数据
 */
function queryRecord() {
    let data = {};
    data.startTime = coverterTime(new Date().setDate(new Date().getDate() - 30))
    data.endTime = coverterTime(new Date().setDate(new Date().getDate() + 30))
    queryRecords(data)
        .then((res) => {
            res = res.data.data
            calendarData.value = res
            console.log(res)
        })
        .catch((err) => {
            consoloe.log(err)
        })
}

/**
 * 从查询到的数据中，过滤对应日期的数据
 * @param {*} date 
 */
function getFromCalendarData(date) {
    return calendarData.value.filter((item) => {
        return date.day === item.today.substr(0, 10)
    });
}

/**
 * 选择一天日期，同步状态
 */
let period = reactive({
    status: 0,
    ovulationDay: 0,
    sex: 0,
    today: coverterTime(new Date())
})
function select(date) {
    console.log("date:", date)
    let today = getFromCalendarData(date)
    console.log("today:", today)
    if (today.length > 0) {
        period.id = today[0].id
        period.status = today[0].status
        period.ovulationDay = today[0].ovulationDay
        period.sex = today[0].sex
        console.log("perdios1:", period)
    }
    period.today = date.day
    console.log("perdios2:", period)
    toast('选择日期成功')
}

/**
 * 修改某天状态
 */
function changeDayStatus() {
    period.today = coverterTime(period.today)
    changePeriod(period)
        .then((res) => {
            toast('更改成功')
            queryRecord()
        })
        .catch((err) => {
            console.log(err)
        })
}

</script>