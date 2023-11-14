<template>
    <el-calendar>
        <template #date-cell="{ data }">
            <div @click="select(data)" class="card">
                <p :class="data.isSelected ? 'is-selected' : ''">
                    {{ data.day.split('-').slice(-1).join('-') }}
                <p>{{ data.isSelected ? '♥' : '' }}</p>
                <p>{{ data.isSelected ? '♥' : '' }}</p>
                </p>
            </div>

        </template>

    </el-calendar>
    <div @click="changeDayStatus">
        <el-switch v-model="period.status" active-text="来了" inactive-text="没来" :active-value="1" :inactive-value="0" />
        <el-switch v-model="period.ovulationDay" active-text="是" inactive-text="否" :active-value="1" :inactive-value="0" />
        <el-switch v-model="period.sex" active-text="有" inactive-text="无" :active-value="1" :inactive-value="0" />
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
            console.log(res)
        })
        .catch((err) => {
            consoloe.log(err)
        })
}
const period = reactive({
    status: 1,
    ovulationDay: 1,
    sex: 1,
    today: coverterTime(new Date())
})
function select(data) {
    period.today = data.day
    console.log(period)
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
        })
        .catch((err) => {
            console.log(err)
        })
}

</script>