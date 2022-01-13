<template>
    <div>
        <basic-container>
            <page-header title="在线视频"></page-header>
            <operation-container>
                <template slot="left">
                    <iep-button @click="refresh">刷新</iep-button>
                </template>
                <template slot="right">
                    <el-input v-model.trim="params.idcard" placeholder="身份证" size="small" clearable style="width:150px"></el-input>
                    <!-- <el-select clearable size="small" v-model="params.type" placeholder="请选择类型" style="width:150px!important">
                        <el-option
                        label="船东"
                        value="1">
                        </el-option>
                        <el-option
                        label="职务船员"
                        value="2">
                        </el-option>
                        <el-option
                        label="游客"
                        value="3">
                        </el-option>
                    </el-select> -->
                    <!-- <el-input v-model.trim="params.name" placeholder="姓名" size="small" clearable style="width:150px"></el-input> -->
                    <el-button size="small" @click="search">搜索</el-button>
                    <el-button size="small" @click="$router.back(-1)" style="margin-left:0">返回</el-button>
                </template>
            </operation-container>
            <el-table
            :data="userData"
            :header-cell-style="headerCellStyle"
            style="width: 100%">
                <el-table-column
                    prop="vedioName"
                    label="视频标题">
                </el-table-column>
                <el-table-column
                    label="视频图片">
                    <template slot-scope="scope">
                        <el-image :src='scope.row.videoImg' style="width:150px"></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    label="视频简介">
                    <template slot-scope="scope">
                        <div class="videoDescript">{{ scope.row.videoDescript }}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="idcard"
                    label="身份证">
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="最近一次学习时间">
                </el-table-column>
                <!-- <el-table-column
                    label="学习记录">
                    <template slot-scope="scope">
                        <el-button size="small" @click="check(scope.row)">查看</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
            <el-pagination
                background
                style="text-align:center;margin-top:15px"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.current"
                :page-sizes="[10,20,30,40]"
                :page-size="params.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </basic-container>
    </div>
</template>

<script>
    import { getUserInfoList } from '@/api/lessonVideo'
    export default {
        data (){
            return{
                params:{
                    videoId: '',
                    current:1,
                    size:10,
                    // idcard:'',
                    // type:'',
                    // name:'',
                },
                total:0,
                userData:[],
            }
        },
        created (){
            this.params.videoId = this.id
            this.getUserInfoList()
        },
        methods:{
            initParams (){
                this.params={
                    videoId: this.id,
                    current:1,
                    size:10,
                    // idcard:'',
                    // type:'',
                    // name:'',
                }
            },
            // 秒转换为时分秒
            formatSeconds (value) {
				var secondTime = parseInt(value) // 秒
				var minuteTime = 0 // 分
				var hourTime = 0 // 小时
				if (secondTime >= 60) {
					minuteTime = parseInt(secondTime / 60)
					secondTime = parseInt(secondTime % 60)
					if (minuteTime >= 60) {
						hourTime = parseInt(minuteTime / 60)
						minuteTime = parseInt(minuteTime % 60)
					}
				}
				var result ='' +(parseInt(secondTime) < 10? '0' + parseInt(secondTime): parseInt(secondTime))

				// if (minuteTime > 0) {
					result ='' + (parseInt(minuteTime) < 10? '0' + parseInt(minuteTime) : parseInt(minuteTime)) + ':' + result
				// }
				// if (hourTime > 0) {
					result ='' + (parseInt(hourTime) < 10 ? '0' + parseInt(hourTime): parseInt(hourTime)) +':' + result
				// }
				return result
			},
            headerCellStyle ({ rowIndex }){
                if (rowIndex == 0) {
                    return 'background:#F2F4F5;color:#000'
                } else {
                    return ''
                }
            },
            getUserInfoList (){
                getUserInfoList(this.params).then(({ data })=>{
                    console.log('getUserInfoList..', data)
                    this.total = data.data.total
                    this.userData = data.data.records
                })
            },
            handleSizeChange (val) {
                this.params.size = val
                this.getUserInfoList()
            },
            handleCurrentChange (val) {
                this.params.current = val
                this.getUserInfoList()
            },
            check (row){
                console.log('check..', row)
            },
            search (){
                console.log('search..')
                if (!this.params.idcard) return this.$message.warning('身份证不能为空!')
                this.getUserInfoList()
            },
            refresh (){
                this.initParams()
                this.getUserInfoList()
            },
        },
        computed:{
            id () {
                return this.$route.params.id
            },
        },
    }
</script>

<style lang="scss" scoped>
.videoDescript{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
</style>