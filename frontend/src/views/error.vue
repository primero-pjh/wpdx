<template>
    <div style="width: 100%; display: flex; justify-content: center;">
        <q-card style="width:300px;">
            <q-card-section>
                <div class="q-pa-md">
                    <q-img src="/images/wp-logo.png" />
                    <q-separator class="q-my-md" />
                    <p class="text-center text-bold text-h6">권한이 없거나</p>
                    <p class="text-center text-bold text-h6">잘못된 URL 입니다.</p>
                    <q-btn color="primary" @click="$router.back()" style="width: 100%;">
                        뒤로 돌아가기
                    </q-btn>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
export default {
    name: 'errorVue',
    data() {
        return {
        }
    },
    methods: {
    },
    mounted() {
        let vm = this;
        vm.$store.commit("setHeaderShow", false);
        vm.$store.commit("setDrawerLeft", false);
    }
}
</script>