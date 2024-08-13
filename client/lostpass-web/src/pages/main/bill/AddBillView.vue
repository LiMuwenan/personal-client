<template>
    <el-main>
        <el-container class="bg-light-50">
            <el-form ref="billForm" :model="bill"  :rules="rules" label-width="120px">
                <el-form-item label="账单名称" prop="title">
                    <el-input v-model="bill.title" />
                </el-form-item>
                <el-form-item label="账单类型" prop="code">
                    <el-select v-model="bill.code" placeholder="请选择你的账单类型">
                        <el-option v-for="category in categories"
                            :label="category.message"
                            :value="category.code"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账单时间" prop="costTime">
                    <el-col :span="11">
                        <el-date-picker 
                            v-model="bill.costTime"
                            type="date" 
                            placeholder="选择日期" 
                            format="YYYY-MM-DD"
                            style="width: 100%"
                            />
                    </el-col>
                </el-form-item>
                <el-form-item label="账单花费" prop="cost">
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
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">创建</el-button>
                    <el-button @click="onClear">清空</el-button>
                </el-form-item>
            </el-form>
        </el-container>
    </el-main>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { addBillItem, queryCategory, queryBook } from '~/api/bill.js'
import { toast, coverterTime } from '~/util/util'

const categories = ref([])
const billBooks = ref([])
onMounted(()=>{
    queryCategory()
    .then((res)=>{
        res = res.data.data
        categories.value = res
    })
    .catch((err)=>{
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

const billForm = ref(null)
// 表单数据
const bill = reactive({
    title: '',
    code: '',
    message: '',
    costTime: '',
    cost: '',
    billBooks: '',
})
// 表单验证规则
const rules = {
    title: [
        {
            required: true,
            message: '账务名称不能为空',
            trigger: 'blur'
        },{
            min: 1,
            max: 20,
            message: '账务名称长度1-20字符',
            trigger: 'blur'
        }
    ],
    code: [
        {
            required: true,
            message: '账务类型不能为空',
            trigger: 'blur'
        }
    ],
    message: [{

    }],
    costTime: [
        {
            required: true,
            message: '账单时间不能为空',
            trigger: 'blur'
        }
    ],
    cost: [
        {
            required: true,
            message: '金额不能为空'
        },
        {
            type: 'number',
            // pattern: /^[0-9]{1,12}(\.[0-9]{0,2})?&/,
            message: "请填写数字",
            trigger: 'blur',
            transform: (value) => Number(value)
        }
    ],
    billBooks: [
        {
            required: true,
            message: "账本不能为空",
            trigger: 'blur'
        }
    ]
}

const onSubmit = () => {
    bill.costTime = coverterTime(bill.costTime)
    billForm.value.validate((valid) => {
        if (valid) {
            addBillItem(bill)
            .then((res)=>{
                toast("添加成功", 'success')
            })
            .catch((err)=>{
                toast(err, 'error')
            })
        }
    })

}

const onClear = () => {
    bill.code = ''
    bill.title = ''
    bill.cost=''
    bill.costTime=''
    bill.billBooks=[]
}
</script>

<style scope>
.el-form-item {
    @apply w-lg my-8
}
</style>