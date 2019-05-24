<template>
  <div class="recommend-tags">
    <span v-for="(item,index) in tags" :key="index" @click="TagsDetail()">
        {{item.name+'('+ item.num +')'}}
    </span>
  </div>
</template>
<script>
export default {
  data () {
    return {
        tags:[
            {name:'营商通', num: 3},
            {name:'营商环境', num: 5},
            {name:'数据基因', num: 8},
            {name:'数字政府', num: 8},
            {name:'电子政务', num: 5},
            {name:'数字经济', num: 5},
            {name:'微服务', num: 5},
            {name:'数据元', num: 5},
            {name:'智慧城市', num: 3},
            {name:'互联网+政务服务', num: 3},
            {name:'互联网+政务服务', num: 3},
            {name:'营商通', num: 3},
            {name:'营商环境', num: 5},
            {name:'数据基因', num: 8},
            {name:'数字政府', num: 8},
            {name:'电子政务', num: 5},
            {name:'数字经济', num: 5},
            {name:'微服务', num: 5},
            {name:'数据元', num: 5},
            {name:'智慧城市', num: 3},
        ],
    }
  },
    methods: {
        TagsDetail () {
            this.$router.push({
                 path: '/app/tags_detail',
            })
        },
    },
}
</script>
<style scoped lang="scss">
.recommend-tags{
    span{
        display:inline-block;
        padding: 5px 12px;
        margin-right: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        color: #666;
        cursor: pointer;
    }
    & span:hover{
        color:#c73e3e;
         border: 1px solid #c73e3e;
    }
}
</style>
