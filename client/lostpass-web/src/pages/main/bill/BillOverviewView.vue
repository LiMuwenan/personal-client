<template>
    总余额： {{ balance }} <br/>
    总收入： {{ income }} <br/>
    总支出： {{ spend }} <br/>
    按分类： {{ groupByCode }} <br/>
    按日期： {{ groupByDate }} <br/>

    <div id="balance" style="width: 500px;height: 500px"></div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { queryBillOverview } from '~/api/bill.js'
import * as echarts from 'echarts';

/**
 * echars启动延时，否则出现dom不可用报错
 */
setTimeout(()=>{
    getEcharts()
}, 200)

const startTime = ref('1970-01-01 00:00:00')
const endTime = ref('2023-09-27 23:59:59')
const query = reactive({
    startTime: null,
    endTime: null
})

const balance = ref(0)
const income = ref(0)
const spend = ref(0)
const groupByCode = ref([])
const groupByDate = ref([])
// 挂载组件
onMounted(()=>{
    queryBill()
})

// 获取总览数据
function queryBill() {
    query.startTime = startTime.value
    query.endTime = endTime.value
    queryBillOverview(query)
    .then((res)=>{
        let data = res.data.data
        balance.value = data.balance;
        income.value = data.income;
        spend.value = data.spend;
        groupByCode.value = data.groupByCode;
        groupByDate.value = data.groupByDate;
    })
    .catch((err)=>{
        console.log(err)
    })
}


function getEcharts() {
// 基于准备好的dom，初始化echarts实例
// var myChart = echarts.init(this.$refs.mainRef);
    let myChart = echarts.init(document.getElementById('balance'))
    
    myChart.setOption({
        series: [
            {
                type: 'pie',
                data: [
                    {
                    value: income.value,
                    name: '收入'
                    },
                    {
                    value: spend.value,
                    name: '支出'
                    }
                ],
                radius: '50%'
            }
        ],
        
    })

}
</script>

<style>

</style>