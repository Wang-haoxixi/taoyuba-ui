<template>
  <div class="box">
    <div class="fir">
      <div class="identical">
        <div class="informtion">
          <div class="lefts">
            <span class="info">归集资源数量&nbsp;</span>
            <span class="numbers" style="color:#836964">{{data.alreadyCollects}}</span>
          </div>
          <div class="rights">
            <span class="info">归集字段数量&nbsp;</span>
            <span class="numbers" style="color:#1b79d8">{{data.alreadyCollitems}}</span>
          </div>
        </div>
        <div class="looksone">
          <looksones></looksones>
        </div>
      </div>
      <div class="identical">
        <identicals></identicals>
      </div>
    </div>
    <div class="secbox">
      <secboxs></secboxs>
    </div>
    <div class="Thirds">
      <Thirdes></Thirdes>
    </div>
  </div>
</template>

<script>
import looksones from './looksones'
import identicals from './identicals'
import secboxs from './secboxs'
import Thirdes from './Thirdes'
import {getCollectsSum} from '@/api/lookdata/index'
export default {
  components:{looksones,identicals,secboxs,Thirdes},
  data (){
    return{
      data:{},
    }
  },
  mounted () {
    getCollectsSum().then(({data})=>{
      this.data = data.data
    })
  },
}
</script>


<style lang="scss" scoped>
.box{
  width: 100%;
}
.fir{
  width: 95%;
  height: 270px;
  margin: 0 auto;
}
.identical{
  width: 50%;
  height: 100%;
  float: left;
  // background-color: yellow;
  border-bottom: 1px solid #28416e;
}
.informtion{
  width: 356px;
  height: 38px;
  border:1px dashed #29447b;
  background: #223a78;
  border-radius: 5px;
  margin-left: 10px;
  margin-top: 13px;
  font-size: 12px;
  line-height: 38px;
  padding-right: 10px;
}
.lefts{
  float: left;
  color: #fff;
  margin-left: 10px;
}
.rights{
  float: right;
  color: #fff;
}
.numbers{
  font-size: 20px;
  vertical-align: bottom;
}
.looksone{
  margin-top: 15px;
  height: 160px;
  border-right: 1px dashed #28416e;
}
.secbox{
  width: 95%;
  height: 220px;
  margin: 0 auto;
  padding: 0;
  // background-color: green;
  border-bottom: 1px solid #28416e;
}
.Thirds{
  width: 95%;
  height: 237px;
  margin: 0 auto;
  padding: 0;
}
.info{
  font-size:13px;
}
</style>
