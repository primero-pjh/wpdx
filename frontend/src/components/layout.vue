<template>
    <div id="layoutVue">
        <q-layout
            view="hHr LpR fFr"
            container
            style="height: 100vh;"
            class="shadow-2 rounded-borders">
            <q-header reveal class="bg-black">
                <q-toolbar>
                    <q-btn flat @click="toggleDrawerLeft" round dense icon="dashboard" />
                    <q-toolbar-title class="faSB text-bold" @click="$store.state.goto_page('/home')">
                        WP-DX
                    </q-toolbar-title>
                </q-toolbar>
            </q-header>

            <!-- <q-footer>
                <q-toolbar>
                    <q-toolbar-title>Footer</q-toolbar-title>
                </q-toolbar>
            </q-footer> -->

            <q-drawer v-model="drawerLeft" :width="248" :breakpoint="700" bordered>
                <q-scroll-area class="fit ">
                    <div style="display: flex;">
                        <q-space></q-space>
                        <q-btn icon="close" flat @click="toggleDrawerLeft"></q-btn>
                    </div>
                    <q-separator />
                    <q-list class="q-px-md">
                        <q-item-label class="faSB q-pt-md q-px-sm text-grey-7 text-h6">통계</q-item-label>
                        <!-- <q-item clickable v-ripple @click="$store.state.goto_page('/dashboard')">
                            <q-item-section class="faSB text-body1" >
                                <q-item-label>대시보드</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-item-label avatar v-if="$route.name === 'dashboard'">
                                    <q-icon name="check" color="green" size="sm" />
                                </q-item-label>
                            </q-item-section>
                        </q-item> -->
                        <q-item clickable v-ripple @click="$store.state.goto_page('/stat')">
                            <q-item-section class="faSB text-body1" >
                                <q-item-label>지역별 학생 분포도</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-item-label avatar v-if="$route.name === 'stat'">
                                    <q-icon name="check" color="green" size="sm" />
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item-label class="faSB q-pt-md q-px-sm text-grey-7 text-h6">데이터베이스</q-item-label>
                        <q-item clickable v-ripple @click="$store.state.goto_page('/erd')">
                            <q-item-section class="faSB text-body1" >
                                <q-item-label>데이터 관계 테이블</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-item-label avatar v-if="$route.name === 'erd'">
                                    <q-icon name="check" color="green" size="sm" />
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple @click="$store.state.goto_page('/schema')">
                            <q-item-section class="faSB text-body1" >
                                <q-item-label>개념적 스키마</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-item-label avatar v-if="$route.name === 'schema'">
                                    <q-icon name="check" color="green" size="sm" />
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item-label class="faSB q-pt-md q-px-sm text-grey-7 text-h6">AI</q-item-label>
                        <q-item clickable v-ripple @click="$store.state.goto_page('/ai/pre')">
                            <q-item-section class="faSB text-body1" >
                                <q-item-label>재원 예측기</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-item-label avatar v-if="$route.name === 'ai_pre'">
                                    <q-icon name="check" color="green" size="sm" />
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                        <!-- <q-item clickable v-ripple @click="$store.state.goto_page('/home')">
                            <q-item-section class="faSB text-body1" >
                                <q-item-label>학원 재원생</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-item-label avatar v-if="$route.name === 'home'">
                                    <q-icon name="check" color="green" size="sm" />
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple @click="$store.state.goto_page('/school')">
                            <q-item-section class="faSB text-body1" >
                                <q-item-label>학교리스트</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-item-label avatar v-if="$route.name === 'school'">
                                    <q-icon name="check" color="green" size="sm" />
                                </q-item-label>
                            </q-item-section>
                        </q-item> -->
                        <q-separator />
                        <q-item-label class="faSB q-pt-md q-px-sm text-grey-7 text-h6">Drive</q-item-label>
                        <q-item clickable v-ripple @click="$store.state.open_new_tab('https://drive.google.com/drive/u/0/folders/19bltb0R1Oc9NxJIXQ7zU38t3vrglJ7dm')">
                            <q-item-section class="faSB text-body1" >
                                <q-item-label>외부 데이터 바로가기</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-item-label avatar>
                                    <q-icon name="open_in_new" color="primary" size="sm" />
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <!-- <q-item-label class="faSB q-pt-md q-px-sm text-grey-7 text-h6">Manage</q-item-label>
                        <q-item clickable v-ripple>
                            <q-item-section class="faSB text-body1" >
                                <q-item-label>MySQL</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                                <q-item-label avatar v-if="$route.name === 'mysql'">
                                    <q-icon name="check" color="green" size="sm" />
                                </q-item-label>
                            </q-item-section>
                        </q-item> -->
                    </q-list>
                </q-scroll-area>
            </q-drawer>

            <q-page-container>
                <q-page class="q-pa-md" style="background: #eee;">
                    <slot name="body">
                
                    </slot>
                </q-page>

                <q-page-scroller position="bottom">
                    <q-btn fab icon="keyboard_arrow_up" color="red" />
                </q-page-scroller>
            </q-page-container>
        </q-layout>
    </div>
</template>

<script>
export default {
    name: 'layoutVue',
    data() {
        return {
            drawerLeft: true,
        }
    },
    props: {
    },
    computed: {
    },
    methods: {
        toggleDrawerLeft() {
            this.drawerLeft = !this.drawerLeft;
        }
    },
    mounted() {
        
    },
}
</script>