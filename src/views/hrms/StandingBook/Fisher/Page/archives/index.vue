<template>
    <div>
        <div class="archives-info">
            <div v-for="(item,index) in list" :key="index" style="width: 20%">
                <div v-for="(items,indexs) in item" :key="indexs" class="archives-info-content">
                    <p>{{ items.name }}</p>
                    <p>{{ items.value }}</p>
                </div>
            </div>
        </div>
        <div class="archives-certificate">
            <div>
                <p>渔船所有权证书编号</p>
                <p>3310000586554</p>
                <p>到期日期：2025-01-13</p>
                <img src="/img/ship.png">
            </div>
            <div>
                <p>渔船捕捞证书编号</p>
                <p>3310000586554</p>
                <p>到期日期：2025-01-13</p>
                <img src="/img/ship.png">
            </div>
            <div>
                <p>船舶检验证书编号</p>
                <p>3310000586554</p>
                <p>到期日期：2025-01-13</p>
                <img src="/img/ship.png">
            </div>
            <div>
                <p>国籍证书编号</p>
                <p>3310000586554</p>
                <p>到期日期：2025-01-13</p>
                <img src="/img/ship.png">
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
                    value: '苍南',
                },
                {
                    name: '船舶产地',
                    value: '浙江舟山',
                },
                {
                    name: '船体材料',
                    value: '工业级纳米高分子塑料聚合',
                },
                {
                    name: '造船日期',
                    value: '2016年04月02日',
                },
            ],
            [
                {
                    name: '船龄',
                    value: '7年',
                },
                {
                    name: '船长',
                    value: '53KM',
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
                    value: 'Chinese Theater Missile Defense',
                },
                {
                    name: '主机功率',
                    value: '56KW',
                },
                {
                    name: '总机功率',
                    value: '80KW',
                },
                {
                    name: '双控功率',
                    value: '42KW',
                },
            ],
            [
                {
                    name: '型深',
                    value: '7M',
                },
                {
                    name: '型宽',
                    value: '8M',
                },
                {
                    name: '总吨位',
                    value: '176t',
                },
                {
                    name: '净吨位',
                    value: '53t',
                },
            ],
            [
                {
                    name: '作业类型',
                    value: '张网',
                },
                {
                    name: '作业方式',
                    value: '帆张网',
                },
                {
                    name: '渔具',
                    value: '刺网',
                },
                {
                    name: '主捕种类',
                    value: '大鱿鱼',
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
    row: {
      default: ()=>{},
      type: Object,
    },
  },
  methods: {
    handleClick () {
    },
    back () {
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