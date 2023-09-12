<template>
    <el-main>
        <!-- <el-container class="mt-1">
            <el-space 
                alignment="start"  wrap :size="30"
                class="container mx-auto bg-gray-500 m-4 w-screen h-xs flex ">
                    <el-card shadow="always" class="h-xs"> 扇形 </el-card>
                    <el-card shadow="always"> 扇形 </el-card>
                    <el-card shadow="always"> 扇形 </el-card>
            </el-space>
        </el-container> -->

        <el-table :data="tableData" :table-layout="fixed" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" width="55" />
            <el-table-column prop="costTime" label="日期" />
            <!-- <template #defualt="scope">
                            <div> {{ scope.row.costTime }}</div>
                        </template> -->
            <el-table-column prop="title" label="名称" />
            <el-table-column prop="message" label="类型" :filters="tags" :filter-method="filterTag">
                <template #default="scope">
                    <el-tag> {{ scope.row.message }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="cost" label="花费" />
            <el-table-column>
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <el-button size="small" type="danger" @click="handleDelete()">
                    Delete
                </el-button>
            </el-table-column>
        </el-table>
        <div class="demo-pagination-block flex justify-end">
            <el-pagination 
                v-model:current-page="currentPage" 
                :page-size="pageSize" 
                :small="small" 
                :disabled="disabled"
                :background="background" 
                layout="total, prev, pager, next" 
                :total="total" 
                @current-change="handleCurrentChange" />
        </div>

    </el-main>
</template>



<script setup>
import { ref, reactive } from 'vue'
import { queryBillList } from '~/api/bill.js'
import { onMounted } from 'vue';

// 分页变量数据
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)
const background = ref(true)
const billQuery = reactive({
    code: '',
    costTime: '',
    page: {
        current: '',
        size: ''
    }
})

const tableData = ref([])
const tags = ref(new Set())

// 挂载获取数据
onMounted(() => {
    queryBillList(billQuery)
        .then((res) => {
            let result = res.data.data
            result.records = reponseDataFormat(result.records)
            // 格式化时间
            tableData.value = result.records
        })
        .catch((err) => {
            console.log(err)
        })
})

function reponseDataFormat(dateArr) {
    let tmp = dateArr.filter((item) => {
        item.cost = item.cost.toFixed(2)
        return item
    })
    let flag = false
    // 类型筛选
    for (let i = 0; i < tmp.length; ++i) {
        flag = false
        for (let item of tags.value) {
            if (item.value == tmp[i].code) {
                flag = true
                break
            }
        }
        if (!flag) {
            tags.value.add({
                text: tmp[i].message,
                value: tmp[i].code
            })
        }
    }
    total.value = dateArr.length

    return tmp;
}

function handleCurrentChange() {
    queryBillList(billQuery)
        .then((res) => {
            res.data.data = reponseDataFormat(res.data.data)
            // 格式化时间
            tableData.value = res.data.data
        })
        .catch((err) => {
            console.log(err)
        })
}
</script>

<style scoped>
.layout-container-demo .el-main {
    padding: 0;
}

</style>