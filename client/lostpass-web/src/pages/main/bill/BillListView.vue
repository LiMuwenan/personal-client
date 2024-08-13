<template>
    <el-main>
        
        <div>
            <div class="demo-date-picker">
                <div class="block">
                    <!-- <span class="demonstration">Default</span> -->
                    <el-date-picker
                    v-model="queryDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    :size="default"
                    />
                </div>
            </div>
            <el-select v-model="billQuery.codes" 
                multiple
                placeholder="请选择你的账单类型">
                <el-option v-for="category in categories"
                    :label="category.message"
                    :value="category.code"
                ></el-option>
            </el-select>
            <el-input
                v-model="search"
                style="width: 240px"
                placeholder="名称搜索"
                :prefix-icon="Search"
                />
            <el-button type="primary" @click="billList()">搜索</el-button>
            <el-button @click="clearBillQuery()">重置</el-button>
        </div>

        <el-table ref="table" :data="tableData" :table-layout="fixed" :row-key="id"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" width="55" />
            <el-table-column prop="costTime" label="日期" />
            <el-table-column prop="title" label="名称" />
            <el-table-column prop="message" label="类型" :filters="tags" :filter-method="filterTag">
                <template #default="scope">
                    <el-tag> {{ scope.row.message }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="cost" label="花费" />
            <el-table-column>
                <template #header>
                    <el-button size="small" type="danger" @click="handleDelete">
                        删除
                    </el-button>
                </template>
                <template #default="scope">
                    <el-button size="small" type="success" @click="updateDialog(scope.row)">
                        编辑
                    </el-button>
                    <el-button size="small" type="danger" @click="deleteDialog(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="demo-pagination-block flex justify-end">
            <el-pagination v-model:current-page="currentPage" :page-size="pageSize" :small="small" :disabled="disabled"
                :background="background" layout="total, sizes, prev, pager, next" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
    </el-main>

    <el-dialog v-model="updateForm" title="编辑账单">
        <el-form :model="bill">
            <el-form-item type="hidde" v-model="bill.id" />
            <el-form-item label="账单名称">
                <el-input v-model="bill.title" autocomplete="off" />
            </el-form-item>
            <el-form-item label="账单类型">
                <el-select v-model="bill.code" placeholder="请选择你的账单类型">
                    <el-option v-for="category in categories" :label="category.message" :value="category.code"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="账单时间">
                <el-col :span="11">
                    <el-date-picker v-model="bill.costTime" type="date" placeholder="选择日期" format="YYYY-MM-DD"
                        style="width: 100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="账单花费">
                <el-input v-model="bill.cost" />
            </el-form-item>
            <el-form-item label="所属账本" prop="billBooks">
                <el-select
                    v-model="bill.billBooks"
                    multiple
                    placeholder="账本"
                    style="width: 240px"
                    >
                    <el-option
                        v-for="item in billBooks"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
        </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="updateForm = false">取消</el-button>
                <el-button type="primary" @click="handleUpdate()">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="deleteDia" title="是否删除">
        <el-form :model="bill">
            <el-form-item type="hidde" v-model="bill.id"></el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancelDelete()">取消</el-button>
                <el-button type="danger" @click="handleDelete()">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>



<script setup>
import { ref, reactive } from 'vue'
import { queryBillList, queryCategory, uppdateBillItem, deleteBillItem, queryBook, queryBillDetail } from '~/api/bill.js'
import { onMounted } from 'vue';
import { coverterTime, toast } from '~/util/util.js'

// 分页变量数据
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(20)
const background = ref(true)
/**
 *     codes: null,
    startTime: null,
    endTime: null,
    lowCost: null,
    highCost: null,
    page: {
        current: null,
        size: null
    }
 */
const billQuery = reactive({
    page: {
        current: null,
        size: null
    }
})
const search = ref('')
const tableData = ref([])
const tags = ref(new Set())
// 挂载获取数据
onMounted(() => {
    billList()
    queryCategory()
        .then((res) => {
            res = res.data.data
            categories.value = res
        })
        .catch((err) => {
            console.log(err)
        })
    queryBook()
    .then((res)=>{
        res = res.data.data
        billBooks.value = res
    })
    .catch((err)=>{
        console.log(err)
    })
})

function billList() {
    billQuery.page.current = currentPage.value
    billQuery.page.size = pageSize.value
    if (queryDate.value != '') {
        billQuery.startTime = coverterTime(queryDate.value[0])
        billQuery.endTime = coverterTime(queryDate.value[1])
    }
    if (search.value != '' ) {
        billQuery.title = search.value
    }
    queryBillList(billQuery)
        .then((res) => {
            let result = res.data.data
            result.records = reponseDataFormat(result.records)
            tableData.value = result.records
            total.value = result.total
        })
        .catch((err) => {
            console.log(err)
        })
}

function reponseDataFormat(dateArr) {
    total.value = dateArr.length
    return dateArr.filter((item) => {
        item.cost = item.cost.toFixed(2)
        return item
    })
}

// 更改当前页
function handleCurrentChange() {
    billList()
}
// 更改分页大小
function handleSizeChange(number) {
    pageSize.value = number
    currentPage.value = 1
    billList()
}

const bill = ref({
})
const categories = ref([])
const billBooks = ref([])
/**
 * 账单编辑对话框
 */
const updateForm = ref()
function updateDialog(row) {
    updateForm.value = true
    bill.value = row
    console.log("======================bill", bill)
    console.log("======================row", row)
    queryBillDetail(row.id)
    .then((res)=>{
        res = res.data.data
        res = new Set(res.booksId)
        bill.value.billBooks=[]
        billBooks.value.filter((item)=>{
            if (res.has(item.id)) {
                bill.value.billBooks.push(item.id)
            }
            return res.has(item.id)
        })
    })
    .catch((err)=>{
        console.log(err)
    })

}
function handleUpdate() {
    bill.value.costTime = coverterTime(bill.value.costTime)
    uppdateBillItem(bill.value)
        .then((res) => {
            updateForm.value = false
            toast("编辑成功")
            billList()
        })
        .catch((err) => {
            console.log(err)
        })
}

let deleteIds = ref([])
let backupIds = ref([])
/**
 * 账单删除对话框
 */
const deleteDia = ref()
function deleteDialog(row) {
    deleteDia.value = true
    // 多选框选项备用
    backupIds.value = deleteIds.value;
    deleteIds.value = []
    deleteIds.value.push(row.id)
}
function cancelDelete() {
    // 多选框选项恢复
    deleteIds.value = backupIds.value
    backupIds.value = []
    deleteDia.value = false
    console.log(deleteIds.value)
}
function handleDelete() {
    deleteBillItem(deleteIds.value)
        .then((res) => {
            deleteDia.value = false
            toast("删除成功")
            billList()
        })
        .catch((err) => {
            console.log(err)
        })
}
/**
 * 多选框
 */
function handleSelectionChange(ids) {
    console.log(ids.map(item => item.id))
    deleteIds.value = ids.map(item => item.id)
    console.log(deleteIds.value)
}

/**
 * 日期选择器
 */

const queryDate = ref('')

function clearBillQuery() {
    delete billQuery.startTime
    delete billQuery.endTime
    delete billQuery.codes
    delete billQuery.title
    currentPage.value = 1
    pageSize.value = 20
    search.value = ''
    queryDate.value = ''
    billList()
}
</script>

<style scoped>
.layout-container-demo .el-main {
    padding: 0;
}

.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>