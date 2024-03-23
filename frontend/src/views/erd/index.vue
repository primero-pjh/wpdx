<template>
    <div id="erdVue">
        <div id="mynetwork" class="w100p"
            style="width: 100%; height: 100%; border: 1px solid black; height: 100vh;
                background-color: #333333;">

        </div>
    </div>
</template>

<style>
</style>
<script>
import axios from "axios";

export default {
    name: 'erdVue',
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
        let vis = window.vis;

        let first_size = 30;
        let second_size = 20;
        let third_size = 16;
        let nodes = new vis.DataSet([
            {
                id: 0, label: '학교알리미', size: first_size,
                color: {
                    border: "green",
                    background: "yellow",
                    highlight: { border: "yellow", background: "green" },
                    hover: { border: "orange", background: "grey" },
                },
            },
                {id: 100, label: '학생현황', size: second_size,},
                    {id: 101, label: '학교현황', size: third_size},
                    {id: 102, label: '성별학생수', size: third_size},
                    {id: 103, label: '학년별, 학급별 학생수', size: third_size},
                    {id: 104, label: '전 출입 및 학업중단 학생수', size: third_size},
                    {id: 105, label: '입학생 현황', size: third_size},
                    {id: 106, label: '졸업생의 진로 현황', size: third_size},
                    {id: 107, label: '장학금 수혜 현황', size: third_size},

                { id: 200, label: '교원현황', size: second_size, },
                    {
                        id: 201, label: '직위별 교원 현황', size: third_size,
                        font: {
                            size: 12,
                        },
                    },
                    {
                        id: 202, label: '자격종별 교원 현황', size: third_size,
                        font: {
                            size: 12,
                        },
                    },
                    {
                        id: 203, label: '표시과목별 교원 현황', size: third_size,
                        font: {
                            size: 12,
                        },
                    },

                {id: 300, label: '교육활동', size: second_size,
                    font: {
                        size: 12,
                    },
                },

            // 나이스 대국민서비스
            {
                id: 100000, label: '나이스', size: first_size,
                color: {
                    border: "green",
                    background: "yellow",
                    highlight: { border: "yellow", background: "green" },
                    hover: { border: "orange", background: "grey" },
                },
            },
                {id: 100004, label: '학교기본정보', size: third_size,
                    font: {
                        size: 12,
                    },
                },
                {id: 100005, label: '학원교습소정보', size: third_size,
                    font: {
                        size: 12,
                    },
                },

            {
                id: 200000, label: 'KESS', size: first_size,
                color: {
                    border: "green",
                    background: "yellow",
                    highlight: { border: "yellow", background: "green" },
                    hover: { border: "orange", background: "grey" },
                },
            },
            {
                id: 300000, label: 'KOSIS', size: first_size,
                color: {
                    border: "green",
                    background: "yellow",
                    highlight: { border: "yellow", background: "green" },
                    hover: { border: "orange", background: "grey" },
                },
            },
                {id: 300100, label: '초중고사교육비조사', size: second_size,
                    font: {
                        size: 12,
                    },
                },
                    { id: 300101, label: '학년별 사교육비 총액', size: third_size, },
                    { id: 300102, label: '학년별 방과후학교, EBS교재비, 어학연수 총액(중학교)', size: third_size, },

                {id: 300200, label: '학교급 및 특성별 결과', size: second_size,
                    font: {
                        size: 12,
                    },
                },
                {id: 300300, label: '특성 분포', size: second_size,
                    font: {
                        size: 12,
                    },
                },
        ]);

        // create an array with edges
        var edges = new vis.DataSet([
            {from: 0, to: 100},
            {from: 0, to: 200},
            {from: 0, to: 300},

            {from: 100, to: 101},
            {from: 100, to: 102},
            {from: 100, to: 103},
            {from: 100, to: 104},
            {from: 100, to: 105},
            {from: 100, to: 106},
            {from: 100, to: 107},

            {from: 200, to: 201},
            {from: 200, to: 202},
            {from: 200, to: 203},

            {from: 100000, to: 100004},
            {from: 100000, to: 100005},

            {from: 300000, to: 300100},
                {from: 300100, to: 300101},
                {from: 300100, to: 300102},
            {from: 300000, to: 300200},
            {from: 300000, to: 300300},
        ]);

        // create a network
        var container = document.getElementById('mynetwork');

        // provide the data in the vis format
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {
            // physics: false,
            nodes: {
                shape: "dot",
                // size: 30,
                font: {
                    size: 14,
                    color: "#ffffff",
                },
                borderWidth: 2,
            },
            edges: {
                width: 2,
                // arrows: "to",
            },
        };

        // initialize your network!
        var network = new vis.Network(container, data, options);
    }
}
</script>