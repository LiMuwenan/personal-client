<template>
    <el-main>
        <el-container class="bg-light-50">
            <el-form ref="billForm" :model="bill"  :rules="rules" label-width="120px">
                <el-form-item label="账单名称" prop="title">
                    <el-input v-model="bill.title" />
                </el-form-item>
                <el-form-item label="账单类型" prop="code">
                    <el-select v-model="bill.code" placeholder="请选择你的账单类型">
                        <el-option label="日常" value="1" />
                        <el-option label="水果" value="2" />
                        <el-option label="商超" value="3" />
                        <el-option label="聚餐" value="4" />
                        <el-option label="医疗" value="5" />
                        <el-option label="水费" value="20" />
                        <el-option label="电费" value="21" />
                        <el-option label="燃气费" value="22" />
                        <el-option label="取暖费" value="23" />
                        <el-option label="物业费" value="24" />
                        <el-option label="车品费" value="25" />
                        <el-option label="交通费" value="26" />
                        <el-option label="电话费" value="27" />
                        <el-option label="旅游" value="40" />
                        <el-option label="美妆" value="41" />
                        <el-option label="电子产品" value="42" />
                        <el-option label="衣服鞋子" value="43" />
                        <el-option label="投资" value="90" />
                        <el-option label="薪水" value="100" />
                        <el-option label="进账" value="101" />
                        <el-option label="其他" value="200" />
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
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">创建</el-button>
                    <el-button @click="onClear">清空</el-button>
                </el-form-item>
            </el-form>
        </el-container>
    </el-main>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { addBillItem } from '~/api/bill.js'
import { toast, coverterTime } from '~/util/util'

const billForm = ref(null)
// 表单数据
const bill = reactive({
    title: '',
    code: '',
    message: '',
    costTime: '',
    cost: ''
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

}
</script>

<style scope>
.el-form-item {
    @apply w-lg my-8
}
</style>