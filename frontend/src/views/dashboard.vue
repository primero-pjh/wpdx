<template>
    <div id="dashboardVue" style="width: 100%; height: 100%;">
        <div class="faSB">
            <q-list bordered class="rounded-borders">
                <q-expansion-item
                    switch-toggle-side
                    expand-separator
                    default-opened
                    label="학년 및 시도별 학생 1인당 월평균 사교육비(중학교)">
                    <q-card>
                        <q-card-section>
                            <canvas id="myChart"></canvas>
                        </q-card-section>
                    </q-card>
                </q-expansion-item>
                <!-- <q-separator /> -->
            </q-list>
        </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
    name: 'dashboardVue',
    components: {
    },
    data() {
        return {
            datasets: [],
        }
    },
    methods: {
        normalizationData(rows) {
            let vm = this;
            let data = JSON.parse(rows.value);
            console.log(data);
            // Object.prototype.hasOwnProperty.call(foo, "bar");
            let result = Object.groupBy(data, ({ ITM_NM }) => ITM_NM);
            console.log("result:", result);
            let dict = {};
            for(let i=0; i<data.length; i++) {
                dict[data[i].C1_NM] = [];
            }
            let labels = [];
            for(var k in dict) {
                labels.push(k);
            }
            let datasets = [];
            for(var key in result) {
                let value = result[key];
                let temp_data = [];

                for(let i=0; i<value.length; i++) {
                    temp_data.push(value[i].DT);
                }
                datasets.push({
                    label: key,
                    data: temp_data,
                });
            }
            vm.drawBarChart(labels, datasets);
        },
        drawBarChart(labels, datasets) {
            const ctx = document.getElementById('myChart');
            let Chart = window.Chart;
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: datasets,
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        initChart(datasets) {
            let vm = this;
            for(let i=0; i<datasets.length; i++) {
                let data = datasets[i];
                let value = JSON.parse(data.value);
                console.log(value);
            }
            vm.drawBarChart();
        }
    },
    mounted() {
        let vm = this;
        vm.$q.loading.show();
        axios.get(`/api/datasets/kosis`, {}).then((res) => {
            let data = res.data;
            vm.normalizationData(data.rows[2]);
            vm.$q.loading.hide();
        }).catch((err) => {
            console.log(err);
        });
    },
}
</script>