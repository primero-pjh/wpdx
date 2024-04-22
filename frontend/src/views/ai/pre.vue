<template>
    <div id="ai_preVue">
        <div>
            <q-input placeholder="학생 이름을 입력하세요." v-model="search_student_name"
                filled dense class="faSB text-body1" @keyup.enter="loadStudent">
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
            </q-input>
            <template v-if="search_student_list && search_student_list.length > 0">
                <q-list bordered separator class="q-mt-sm bg-white">
                    <q-expansion-item expand-separator v-for="row, idx in search_student_list" :key="idx" @show="showStudentDetail(row, idx)"
                        class="q-pa-sm"
                        icon="perm_identity" 
                        :label="row.StudentName + '(' + row.CenterName + ')'" 
                        :caption="row.SchoolName + ' ' + row.SchoolGrade">
                        <q-card class="q-pa-md">
                            <template v-if="row?.details">
                                <q-list bordered separator style="border: 1px solid #eee;" class="q-mb-md">
                                    <q-item>
                                        <q-item-section>수강이력수</q-item-section>
                                        <q-item-section side>
                                            {{ row?.details?.cs_count }}
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>퇴원상담수</q-item-section>
                                        <q-item-section side>
                                            {{ row?.details?.withdraw_csl_count }}
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>퇴원상담을 제외한 나머지 상담수</q-item-section>
                                        <q-item-section side>
                                            {{ row?.details?.remain_csl_count }}
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>보강 횟수</q-item-section>
                                        <q-item-section side>
                                            {{ row?.details?.supply_count }}
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>보충 횟수</q-item-section>
                                        <q-item-section side>
                                            {{ row?.details?.clinic_count }}
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>결석 횟수</q-item-section>
                                        <q-item-section side>
                                            {{ row?.details?.abs_count }}
                                        </q-item-section>
                                    </q-item>
                                    <q-item>
                                        <q-item-section>출석 횟수</q-item-section>
                                        <q-item-section side>
                                            {{ row?.details?.pre_count }}
                                        </q-item-section>
                                    </q-item>
                                    
                                </q-list>
                                
                                <q-btn label="재원 예측" color="positive" @click="predict_student(row.details)" class="faSB" icon="build_circle" />
                                <!-- {{row.details.value}} -->
                                <q-inner-loading :showing="row.details.isLoading"
                                    label="Please wait..."
                                    label-class="faSB"
                                    label-style="font-size: 1.1em"
                                />
                                <template v-if="row.details.value">
                                    <div style="display: flex; align-items: center; border: 1px solid #eee;" class="q-mt-md">
                                        <div>
                                            <q-knob show-value font-size="12px" v-model="row.details.value" size="50px" readonly
                                                :thickness="0.22" color="teal" track-color="grey-3" class="q-ma-md">
                                                {{ row.details.value }}%
                                            </q-knob>
                                        </div>
                                        <div>
                                            의 확률로 재원 할 예정입니다.
                                        </div>
                                    </div>
                                </template>
                            </template>
                            <template v-else>
                                <div class="faSB">
                                    해당 학생의 데이터가 존재하지 않습니다.
                                </div>
                            </template>
                        </q-card>
                    </q-expansion-item>
                </q-list>
            </template>
            <template v-else>
                <q-list bordered separator class="q-mt-sm bg-white q-pa-sm">
                    <q-item class="faSB">
                        <q-item-section class="text-body1">
                            검색된 학생이 없습니다.
                        </q-item-section>
                    </q-item>
                </q-list>
            </template>    
        </div>
    </div>
</template>

<style>
</style>
<script>
import axios from "axios";

export default {
    name: 'ai_preVue',
    computed: {
    },
    components: {
    },
    data() {
        return {
            search_student_name: '',
            student: null,
            search_student_list: [],

            change_school_level_dict: {
                'kinder' : '유치원',
                'primary' : '초등학교',
                'middle' : '중학교',
                'high' : '고등학교',
            }
        }
    },
    methods: {
        predict_student(student) {
            let vm = this;
            student.isLoading = true;
            axios.get(`/api/keras/pre`, {
                params: student,
            }).then((res) => {
                let data = res.data;
                let value = data.value;
                student["value"] = parseInt((value*100).toFixed(0));
                student.isLoading = false;
            }).catch((err) => {
                console.error("파이썬 서버가 켜져있지 않습니다.");
            });
        },
        loadStudent() {
            let vm = this;
            vm.search_student_list = [];
            axios.get(`/api/lms/student/name/${vm.search_student_name}`, {

            }).then((res) => {
                let data = res.data;
                vm.search_student_list = data.rows;
            });
        },
        showStudentDetail(row, idx) {
            let vm = this;
            let UID = row.UID;
            axios.get(`/api/lms/student/${UID}`, {

            }).then((res) => {
                let data = res.data.rows;
                vm.search_student_list[idx].details = data;
            });
        },
    },
    mounted() {
        let vm = this;
        vm.loadStudent();
    },
}
</script>