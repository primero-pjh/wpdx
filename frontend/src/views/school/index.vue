<template>
    <div id="schoolVue">
        <div>
            <q-table class="faSB"
                title="학교기본정보"  
                :rows="schoolInfos"
                row-key="name"
            />
        </div>
    </div>
</template>

<style>
</style>
<script>
import axios from "axios";

export default {
    name: 'schoolVue',
    computed: {
        schoolInfos() {
            return this.$store.state.schoolInfos;
        }
    },
    components: {
    },
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
        let vm = this;
    }
}
</script>