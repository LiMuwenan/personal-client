<template>
    <el-main>
        <el-scrollbar router>
            <el-table :data="tableData" :table-layout="fixed">
                <el-table-column prop="seq" label="序号" />
                <el-table-column prop="username" label="用户名"/>
                <el-table-column prop="status" label="状态" />
                <el-table-column prop="edit" label="编辑" />
            </el-table>
        </el-scrollbar>
    </el-main>
</template>

<script setup>
import { ref } from 'vue'
import { queryUserList } from '~/api/user.js'
import { onMounted } from 'vue';

const tableData = ref([])

onMounted(()=>{
    console.log('查询查询')
    queryUserList()
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