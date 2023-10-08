<template>
    总余额： {{ balance }} <br />
    总收入： {{ income }} <br />
    总支出： {{ spend }} <br />
    <div>
      <span>统计日期</span>
      <el-date-picker
        v-model="daterange"
        type="daterange"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        :default-value="[new Date(), new Date()]"
      />
      <el-button type="primary" @click="daterangePick()"></el-button>
    </div>
    <div id="balance" style="width: 500px;height: 500px"></div>
    <div id="month-spend-income" style="width: 1200px;height: 600px"></div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import { queryBillOverview } from '~/api/bill.js'
import { coverterTime } from '~/util/util.js'
import * as echarts from 'echarts';

const daterange = ref()
const startTime = ref(new Date().getFullYear() + '-01-01T00:00:00')
const endTime = ref(new Date().getFullYear() + '-12-31T00:00:00')
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
onMounted(() => {
    pieChart = echarts.init(document.getElementById('balance'))
    histogramChart = echarts.init(document.getElementById('month-spend-income'))
    queryBill()
})

// 获取总览数据
function queryBill() {
    query.startTime = coverterTime(startTime.value)
    query.endTime = coverterTime(endTime.value)
    queryBillOverview(query)
        .then((res) => {
            let data = res.data.data
            balance.value = data.balance;
            income.value = data.income;
            spend.value = data.spend;
            groupByCode.value = data.groupByCode;
            groupByDate.value = data.groupByDate;
            /**
             * 绘图
             */
            pieCharts()
            histogramCharts()
        })
        .catch((err) => {
            console.log(err)
        })
}

/**
 * 选择时间区间
 */
function daterangePick() {
    startTime.value = coverterTime(daterange.value[0])
    endTime.value = coverterTime(daterange.value[1])
    queryBill()
}

/**
 * 分类饼图
 */
let pieChart;
let pieOption = reactive({})
function pieCharts() {
    // 基于准备好的dom，初始化echarts实例
    pieOption = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '种类占比',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'center',
                    formatter: '{b}({d}%)'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: []
            }
        ]
    };
    let array = []
    for (const key in groupByCode.value) {
        array.push(
            {
                name: `${key}`,
                value: `${groupByCode.value[key]}`
            }
        )
    }
    pieOption.series[0].data = array
    pieChart.setOption(pieOption)
}

/**
 * 月份柱状图
 */
let histogramChart;
let histogramOption = reactive({})
function histogramCharts() {
    histogramOption = {
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ['product', '支出', '收入'],
                ['Matcha Latte', 43.3, 85.8],
                ['Milk Tea', 83.1, 73.4]
            ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }]
    };
    let array = []
    array.push(
        [
            'product', '收入', '支出'
        ]
    )
    for (const key in groupByDate.value) {
        console.log(`${key}`)
        array.push(
            [
                `${key}`,
                `${groupByDate.value[key][0]}`,
                `${groupByDate.value[key][1]}`
            ]
        )
    }

    histogramOption.dataset.source = array
    histogramChart.setOption(histogramOption)
}
</script>

<style></style>