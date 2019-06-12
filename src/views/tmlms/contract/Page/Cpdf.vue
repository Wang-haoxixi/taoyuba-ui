<template>
            <div>
                    <pdf :src="src"></pdf>
            </div>
</template>
<script>        
import  pdf  from  'vue-pdf'                                                    
export default {
    components: {
            pdf,
    },
    data () {
        return {
                src:'',
        }
    },
    methods:{
            previewPDF (url) {
                    this.src  = url
                    console.log(this.src + '=======')
            },
    },
    created () {

    },
}
</script>
