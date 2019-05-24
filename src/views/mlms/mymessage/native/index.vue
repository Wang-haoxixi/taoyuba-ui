<template>
    <div>
        <basic-container>
            <page-header title="通知公告"></page-header>
            <iep-tabs v-model="activeTab" :tab-list="tabList">
                <template v-if="activeTab ==='MeHave'" v-slot:MeHave>
                    <me-have v-loading="activeTab !=='MeHave'"></me-have>
                </template>
                <template v-if="activeTab ==='TitleSystem'" v-slot:TitleSystem>
                    <title-system v-loading="activeTab !=='TitleSystem'"></title-system>
                </template>
                <template v-if="activeTab === 'MySign'" v-slot:MySign>
                    <my-sign v-loading="activeTab !=='MySign'"></my-sign>
                </template>
            </iep-tabs>



        </basic-container>
    </div>
</template>
<script>
    import MeHave from './MeHave/'
    import TitleSystem from './TitleSystem/'
    import MySign from './MySign/'
    export default {
        components: { MeHave, MySign, TitleSystem },
        data () {
            return {
                tabList: [{
                    label: '我收到的',
                    value: 'MeHave',
                }, {
                    label: '我发出的',
                    value: 'TitleSystem',
                }, {
                    label: '我标记的',
                    value: 'MySign',
                }],
                activeTab: 'MeHave',
            }
        },
    }
</script>
