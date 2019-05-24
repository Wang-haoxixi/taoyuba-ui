<template>
  <div class="top-class">
    <div class="top-class-list" v-for="item in items" :key="item.id">
      <span class="num">{{countObj[item.prop]}}</span>
      <span class="name">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
import { getRecruitCount } from '@/api/app/hrms/'

export default {
  data () {
    return {
      items: [
        {
          id: '1',
          num: '498',
          name: '国脉同学',
          prop: 'userCount',
        },
        {
          id: '2',
          num: '28',
          name: '外部同学',
          prop: 'externalCount',
        },
        {
          id: '3',
          num: '88',
          name: '国脉专家',
          prop: 'expertCount',
        },
        {
          id: '4',
          num: '228',
          name: '国脉校友',
          prop: 'alumnusCount',
        },
        {
          id: '5',
          num: '33',
          name: '组织',
          prop: 'orgCount',
        },
        {
          id: '6',
          num: '28',
          name: '入驻机构',
          prop: 'institutionCount',
        },
      ],
      countObj: {
        userCount: 0,
        externalCount: 0,
        expertCount: 0,
        alumnusCount: 0,
        orgCount: 0,
        institutionCount: 0,
      },
    }
  },
  created () {
    getRecruitCount().then(({data}) => {
      this.countObj = data.data
    })
  },
}
</script>
<style lang="scss" scoped>
.top-class {
  display: flex;
  margin: 0 auto;
  width: 1200px;
  padding: 20px 100px;
  border-bottom: 1px solid #ebeef5;
  justify-content: space-between;
  text-align: center;
  .top-class-list {
    .num,
    .name {
      display: block;
    }
    .num {
      font-size: 26px;
    }
    .name {
      font-size: 16px;
    }
    &:nth-child(1) .num {
      color: #cb3737;
    }
  }
}
</style>
