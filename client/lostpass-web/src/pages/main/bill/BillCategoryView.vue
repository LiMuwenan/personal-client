<template>
    <el-main>
        <el-table :data="tableData" :table-layout="fixed" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" width="55" />
            <el-table-column prop="code" label="编号" />
            <el-table-column prop="message" label="名称" />
            <el-table-column prop="status" label="类型" />
            <el-table-column>
                <template #header>
                    <el-button size="small" type="primary" @click="addForm = true">
                        添加
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
    </el-main>


    <el-dialog v-model="addForm" title="添加种类">
        <el-form :model="form">
            <el-form-item label="种类编号" >
                <el-input v-model="form.code" autocomplete="off" />
            </el-form-item>
            <el-form-item label="种类名称" >
                <el-input v-model="form.message" autocomplete="off" />
            </el-form-item>
            <el-form-item label="种类类型" >
                <el-select v-model="form.status" placeholder="请选择类型">
                    <el-option v-for="item in labelOptions" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="addForm = false">Cancel</el-button>
                <el-button type="primary" @click="handleAdd()">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="updateForm" title="编辑种类">
        <el-form :model="form">
            <el-form-item type="hidde" v-model="form.id"/>
            <el-form-item label="种类编号" >
                <el-input v-model="form.code" autocomplete="off" />
            </el-form-item>
            <el-form-item label="种类名称" >
                <el-input v-model="form.message" autocomplete="off" />
            </el-form-item>
            <el-form-item label="种类类型" >
                <el-select v-model="form.status" placeholder="请选择类型">
                    <el-option v-for="item in labelOptions" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="updateForm = false">Cancel</el-button>
                <el-button type="primary" @click="handleUpdate()">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>

    <el-dialog v-model="deleteDia" title="是否删除">
        <el-form :model="form">
            <el-form-item type="hidde" v-model="form.id"></el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="deleteDia = false">Cancel</el-button>
                <el-button type="danger" @click="handleDelete()">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>

    
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { queryCategory, addCategory, updateCategory, deleteCategory } from '~/api/bill.js'
import { toast } from '~/util/util.js'

const addForm = ref(false)
const updateForm = ref(false)
const deleteDia = ref(false)
const form = reactive({})
const tableData = ref([])

/**
 * 标签数据
 */
const labelOptions = [
    {
        value: 0,
        label: "收入"
    }, {
        value: 1,
        label: "支出"
    }
]

/**
 * 挂载
 */
onMounted(()=>{
    queryCategoryList()
})
function queryCategoryList() {
    queryCategory()
    .then((res)=>{
        res = res.data.data
        tableData.value = res
    })
    .catch((err)=>{
        console.log(err)
    })
}
/**
 * 添加
 */
function handleAdd() {
    addForm.value = false
    addCategory(form)
    .then(()=>{
        toast("添加成功")
        queryCategoryList()
    })
    .catch((err)=>{
        console.log(err)
    })
}

/**
 * 编辑
 */
 function updateDialog(row) {
    updateForm.value = true
    form.code = row.code
    form.id = row.id
    form.message = row.message
    form.status = row.status
}
function handleUpdate() {
    updateCategory(form)
    .then(()=>{
        updateForm.value = false
        toast("更新成功")
        queryCategoryList()
    })
    .catch((err)=>{
        toast("更新失败", "failed")
    })
}
/**
 * 删除
 */
function deleteDialog(row) {
    deleteDia.value = true
    form.id = row.id
}
function handleDelete() {
    deleteDia.value = false;
    deleteCategory(form)
    .then((res)=>{
        toast("删除成功")
        queryCategoryList()
    })
    .catch((err)=>{
        toast("删除失败", "failed")
    })
}


</script>

<style>
.layout-container-demo .el-main {
    padding: 0;
}
</style>