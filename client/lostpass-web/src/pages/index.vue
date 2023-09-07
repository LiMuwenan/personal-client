<template>
    <el-container class="layout-container-demo" style="height: 500px">
        <!-- 左侧导航栏 -->
        <el-aside width="200px">
            <el-scrollbar>
                <el-menu :default-openeds="[]" router>
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                                <message />
                            </el-icon>总览
                        </template>
                        <el-menu-item-group>
                            <template #title>Group 1</template>
                            <el-menu-item index="1-1">Option 1</el-menu-item>
                            <el-menu-item index="1-2">Option 2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group 2">
                            <el-menu-item index="1-3">Option 3</el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu index="1-4">
                            <template #title>Option4</template>
                            <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon><icon-menu /></el-icon>密码管理
                        </template>
                        <el-menu-item-group>
                            <template #title>Group 1</template>
                            <el-menu-item index="2-1">Option 1</el-menu-item>
                            <el-menu-item index="2-2">Option 2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group 2">
                            <el-menu-item index="2-3">Option 3</el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu index="2-4">
                            <template #title>Option 4</template>
                            <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon>
                                <setting />
                            </el-icon>账务管理
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index/billList" >账务总览</el-menu-item>
                            <el-menu-item index="3-2">添加账务</el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="4">
                        <template #title>
                            <el-icon>
                                <setting />
                            </el-icon>系统管理
                        </template>
                        <el-sub-menu index="4-1">
                            <template #title >用户管理</template>
                            <el-menu-item index="/index/userList">用户列表</el-menu-item>
                            <el-menu-item index="4-1-2">修改用户</el-menu-item>
                            <el-menu-item index="4-1-3">删除用户</el-menu-item>
                        </el-sub-menu>
                        <el-sub-menu index="4-2">
                            <template #title>字典管理</template>
                            <el-menu-item index="4-2-1">添加字典</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <!-- 顶部信息显示 -->
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <div class="toolbar">
                    <el-dropdown>
                        <el-icon style="margin-right: 8px; margin-top: 1px">
                            <setting />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>View</el-dropdown-item>
                                <el-dropdown-item>Add</el-dropdown-item>
                                <el-dropdown-item>Delete</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                    <span>Tom</span>
                </div>
            </el-header>

            <!-- 主体 -->
            <router-view></router-view>
            <!-- <el-main>
                <el-scrollbar router>
                    <router-view></router-view>
                    <el-table :data="tableData">
                        <el-table-column prop="date" label="Date" width="140" />
                        <el-table-column prop="name" label="Name" width="120" />
                        <el-table-column prop="address" label="Address" />
                    </el-table>
                </el-scrollbar>
            </el-main> -->
        </el-container>
    </el-container>
</template>
  
<script setup>
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

</script>

<style scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}</style>