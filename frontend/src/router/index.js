import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

import homeVue from "../views/home.vue";
import dashboardVue from "../views/dashboard.vue";
import errorVue from "../views/error.vue";
import statVue from "../views/stat/index.vue";
import schoolVue from "../views/school/index.vue";
import erdVue from "../views/erd/index.vue";
import schemaVue from "../views/erd/schema.vue";
import ai_preVue from "../views/ai/pre.vue";

const routes = [
    /* default-user */
    { path: "/home", name: "home", component: homeVue, label: "홈화면", },
    { path: "/dashboard", name: "dashboard", component: dashboardVue, label: "대시보드", },
    { path: "/stat", name: "stat", component: statVue, label: "지역별 학생 분포도", },
    { path: "/erd", name: "erd", component: erdVue, label: "데이터 관계 테이블", },
    { path: "/schema", name: "schema", component: schemaVue, label: "개념적 스키마", },
    { path: "/ai/pre", name: "ai_pre", component: ai_preVue, label: "재원 예측기", },

    { path: "/school", name: "school", component: schoolVue, label: "학교리스트", },
    /*error*/
    { path: "/error", name: "error", component: errorVue, label: "404", },
    { path: "/:pathMatch(.*)*", redirect: "/error" },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;