<template>
    <el-main>
        <el-scrollbar router>
            <el-table :data="tableData" :table-layout="fixed">
                <el-table-column prop="costTime" label="时间" />
                <el-table-column prop="title" label="账务"/>
                <el-table-column prop="message" label="类型" />
                <el-table-column prop="costTime" label="花费" />
            </el-table>
        </el-scrollbar>
    </el-main>
</template>



<script setup>
import { ref } from 'vue'
import { queryBillList } from '~/api/bill.js'
import { onMounted } from 'vue';

const tableData = ref([])

onMounted(()=>{
    console.log('查询查询')
    queryBillList()
    .then((res)=>{
        console.log(res.data.data)
        tableData.value = res.data.data
    })
    .catch((err)=>{
        console.log(err)
    })
})

</script>

<style scoped>
.layout-container-demo .el-main {
    padding: 0;
}
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>