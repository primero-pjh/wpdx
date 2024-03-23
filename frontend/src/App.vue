<template>
    <div id="app">
        <layout ref="layout">
            <template v-slot:body>
                <router-view />
            </template>
        </layout>
    </div>
</template>

<script>
import layout from "@/components/layout.vue";

export default {
    name: 'app',
    computed: {
        width() {
            return this.$store.state.width;
        },
        height() {
            return this.$store.state.height;
        },
    },
    components: {
        layout,
    },
    data() {
        return {
        }
    },
    mounted() {
        let vm = this;
        // vm.$store.commit("loadSchoolInfo");
    },
    created() {
        let vm = this;
        vm.$store.commit("loadSchoolInfo");
        vm.$store.commit("loadWPPresent");
    }
}
</script>