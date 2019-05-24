<template>
  <div>
    <project-title
      @click.native="activatedChange()"
      :projectName="project.name"
      :server="project.server"
      :count="project.milepost.length"
      :completionDegree="project.degree"
      :activated="project.activated"></project-title>
    <div class="project-details"
         v-if="project.milepost"
         :style="getHeight">
      <project-detail
        v-for="(detail, index) in project.milepost"
        :key="index"
        :label="`${detail.desc}`"
        :startMonth="startMonth"
        :endMonth="endMonth"
        :detail="detail"
        :scrollLeft="scrollLeft"></project-detail>
    </div>
  </div>
</template>

<script>
import projectTitle from './projectTitle.vue'
import projectDetail from './projectDetail.vue'
export default {
  name: 'project-item',
  components: {
    projectTitle,
    projectDetail,
  },
  props: {
    scrollLeft: {
      type: Number,
      default: 0,
    },
    project: {
      type: Object,
      required: true,
    },
    startMonth: {
      type: String,
    },
    endMonth: {
      type: String,
    },
  },
  methods: {
    activatedChange () {
      this.project.activated = !this.project.activated
    },
  },
  computed: {
    getHeight () {
      return {
        height: this.project.activated ? 50 * this.project.milepost.length + 'px' : '0',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.project-details {
  overflow: hidden;
  transition: height .2s linear;
}
</style>
