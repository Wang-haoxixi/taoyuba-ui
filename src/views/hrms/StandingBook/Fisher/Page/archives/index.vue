<template>
    <div>
        <div class="archives-info">
            <div v-for="(item,index) in list" :key="index" style="width: 20%">
                <div v-for="(items,indexs) in item" :key="indexs" class="archives-info-content">
                    <p>{{ items.name }}</p>
                    <p v-if="!items.dic">{{ data[items.value] || '暂无' }}</p>
                    <p v-else>{{ getName(data[items.value],items.dic) || '暂无' }}</p>
                </div>
            </div>
        </div>
        <div class="archives-certificate">
            <div>
                <p>渔船所有权证书编号</p>
                <p>{{ data.licensesOwnerShip || '暂无' }}</p>
                <p>到期日期：{{ list.licensesDateExpire || '暂无'}}</p>
                <template v-if="img.ownershipRegistrationImage">
                    <el-image 
                        style="width: 100px; height: 100px"
                        v-for="(item,index) in img.ownershipRegistrationImage.split(',')" :key="index"
                        :src="item" 
                        :preview-src-list="[item]">
                    </el-image>
                </template>
            </div>
            <div>
                <p>渔船捕捞证书编号</p>
                <p>{{ data.licensesFishingNo || '暂无' }}</p>
                <p>到期日期：{{ list.licensesFishingExpireDate || '暂无' }}</p>
                <template v-if="img.fishLicenceImage">
                    <el-image 
                        style="width: 100px; height: 100px"
                        v-for="(item,index) in img.fishLicenceImage.split(',')" :key="index"
                        :src="item" 
                        :preview-src-list="[item]">
                    </el-image>
                </template>
            </div>
            <div>
                <p>船舶检验证书编号</p>
                <p>{{ data.licensesInspectionNo || '暂无' }}</p>
                <p>到期日期：{{ list.licensesInspectionExpireDate || '暂无' }}</p>
                <template v-if="img.fishVesselImage">
                    <el-image 
                        style="width: 100px; height: 100px"
                        v-for="(item,index) in img.fishVesselImage.split(',')" :key="index"
                        :src="item" 
                        :preview-src-list="[item]">
                    </el-image>
                </template>
            </div>
            <div>
                <p>国籍证书编号</p>
                <p>{{ data.licensesNationalNo || '暂无' }}</p>
                <p>到期日期：{{ list.licensesNationalExpireDate || '暂无' }}</p>
                <template v-if="img.nationalityRegistrationImage">
                    <el-image 
                        style="width: 100px; height: 100px"
                        v-for="(item,index) in img.nationalityRegistrationImage.split(',')" :key="index"
                        :src="item" 
                        :preview-src-list="[item]">
                    </el-image>
                 </template>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'prot',
  data () {
    return {
        list: [
            [
                {
                    name: '船籍港',
                    value: 'portName',
                },
                {
                    name: '船舶产地',
                    value: 'buildFactory',
                },
                {
                    name: '船体材料',
                    value: 'hullMaterial',
                    dic: 'tyb_ship_material',
                },
                {
                    name: '造船日期',
                    value: 'buildDate',
                },
            ],
            [
                {
                    name: '船龄',
                    value: '7年',
                },
                {
                    name: '船长',
                    value: 'hullLength',
                },
                {
                    name: '航速',
                    value: '10 ly/h',
                },
                {
                    name: '核定航区',
                    value: '太平洋',
                },
            ],
            [
                {
                    name: '主机型号',
                    value: 'mainEngineModel',
                },
                {
                    name: '主机功率',
                    value: 'mainEnginePower',
                },
                {
                    name: '总机功率',
                    value: 'engineTotalPower',
                },
                {
                    name: '双控功率',
                    value: 'dualPower',
                },
            ],
            [
                {
                    name: '型深',
                    value: 'mouldedDepth',
                },
                {
                    name: '型宽',
                    value: 'mouldedBreadth',
                },
                {
                    name: '总吨位',
                    value: 'grossTonnage',
                },
                {
                    name: '净吨位',
                    value: 'netTonnage',
                },
            ],
            [
                {
                    name: '作业类型',
                    value: 'workTypeName ',
                },
                {
                    name: '作业方式',
                    value: 'workModeName ',
                },
                {
                    name: '渔具',
                    value: 'fishingGearName',
                },
                {
                    name: '主捕种类',
                    value: 'fishType',
                },
            ],
        ],
    }
  },
  created () {
  },
  mounted () {
  },
  props: {
    data: {
      default: ()=>{},
      type: Object,
    },
    img: {
      default: ()=>{},
      type: Object,
    },
  },
  methods: {
    handleClick () {
    },
    back () {
    },
    getName (val,arr) {
        let data = ''
        console.log(this.$store.getters.dictGroup)
        this.$store.getters.dictGroup[arr].forEach(element => {
            if( element.value === val ){
                data = element.label
            }
        })
        return data
    },
  },
  components: {
  },
}
</script>
<style scoped lang="scss">
.archives-info {
    display: flex;
    // justify-content: space-around;
    background: #F9F9F9;
    padding: 21px;
    .archives-info-content {
        margin-bottom: 16px;
        p {
            margin: 0;
            font-size: 14px;
            color: #666666;
        }
        p:first-child {
            color: #0185D8;
        }
    }
}
.archives-certificate {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 30px;
    img {
        max-width: 200px;
    }
    div {
        p {
            color: #666666;
            font-size: 14px;
        }
        p:first-child{
            color: #333333;
            font-size: 16px;
        }
        p:last-child{
            color: #999999;
            font-size: 14px;
        }
    }
}
</style>