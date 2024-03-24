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
            // 학교알리미
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
                    { id: 201, label: '직위별 교원 현황', size: third_size, font: { size: 12, }, },
                    { id: 202, label: '자격종별 교원 현황', size: third_size, font: { size: 12, }, },
                    { id: 203, label: '표시과목별 교원 현황', size: third_size, font: { size: 12, }, },

                {id: 300, label: '교육활동', size: second_size, font: { size: 14, }, },
                    { id: 301, label: '수업일수 및 수업시수 현황', size: third_size, font: { size: 12, }, },
                    { id: 302, label: '수업공개 계획', size: third_size, font: { size: 12, }, },
                    { id: 303, label: '교과별(학년별) 교과진도 운영계획', size: third_size, font: { size: 12, }, },

                {id: 400, label: '교육여건', size: second_size, font: { size: 14, }, },
                    { id: 401, label: '안전교육 계획 및 실시현황', size: third_size, font: { size: 12, }, },
                    { id: 402, label: '학교도서관 현황', size: third_size, font: { size: 12, }, },

                {id: 500, label: '예결산현황', size: second_size, font: { size: 14, }, },
                    { id: 501, label: '사립학교 교비회계 예·결산서', size: third_size, font: { size: 12, }, },
                    { id: 502, label: '학교발전기금', size: third_size, font: { size: 12, }, },

                {id: 600, label: '학업성취도', size: second_size, font: { size: 14, }, },
                    { id: 601, label: '교과별(학년별) 평가계획에 관한 사항', size: third_size, font: { size: 12, }, },
                    { id: 602, label: '교과별 학업성취 사항', size: third_size, font: { size: 12, }, },
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
                {id: 100001, label: '학교기본정보', size: second_size, font: { size: 14, }, },
                {id: 100002, label: '학원교습소정보', size: second_size, font: { size: 14, }, },
                {id: 100003, label: '학사일정', size: second_size, font: { size: 14, }, },
            
            // KESS
            {
                id: 200000, label: 'KESS', size: first_size,
                color: {
                    border: "green",
                    background: "yellow",
                    highlight: { border: "yellow", background: "green" },
                    hover: { border: "orange", background: "grey" },
                },
            },
                {id: 200100, label: '개황', size: second_size, font: { size: 14, }, },
                    { id: 200101, label: '유초중등 학교급별 개황', size: third_size, },

                {id: 200200, label: '주제별', size: second_size, font: { size: 14, }, },
                    { id: 200201, label: '입학 및 졸업 후 상황', size: third_size, },

                {id: 200300, label: '행정구역별', size: second_size, font: { size: 14, }, },
                    { id: 200301, label: '행정구역별 개황', size: third_size, },
                    { id: 200302, label: '행정구역별 학년별 학급수 학생수', size: third_size, },
                    { id: 200303, label: '행정구역별 입학 및 졸업 후 상황', size: third_size, },

    
            // KOSIS
            {
                id: 300000, label: 'KOSIS', size: first_size,
                color: {
                    border: "green",
                    background: "yellow",
                    highlight: { border: "yellow", background: "green" },
                    hover: { border: "orange", background: "grey" },
                },
            },
                {id: 300100, label: '초중고사교육비조사', size: second_size, font: { size: 14, }, },
                    { id: 300101, label: '학년별 사교육비 총액', size: third_size, },
                    { id: 300102, label: '학년별 방과후학교, EBS교재비, 어학연수 총액(중학교)', size: third_size, },

                {id: 300200, label: '학교급 및 특성별 결과', size: second_size, font: { size: 14, }, },
                    { id: 300201, label: '학년 및 특성별 학생 1인당 월평균 사교육비(중학교)', size: third_size, },
                    { id: 300202, label: '학년 및 특성별 사교육 참여율(중학교)', size: third_size, },
                    { id: 300203, label: '학년 및 시도별 학생 1인당 월평균 사교육비(중학교)', size: third_size, },
                {id: 300300, label: '특성 분포', size: second_size, font: { size: 14, }, },
                    { id: 300301, label: '월평균 사교육비 지출금액 구간 및 특성별 분포', size: third_size, },
                    { id: 300302, label: '주당 평균 사교육 시간 구간 및 특성별 분포', size: third_size, },
                    { id: 300303, label: '진학희망 고등학교 유형별 희망률', size: third_size, },
        ]);

        // create an array with edges
        var edges = new vis.DataSet([
            {from: 0, to: 100},
            {from: 0, to: 200},
            {from: 0, to: 300},
            {from: 0, to: 400},
            {from: 0, to: 500},
            {from: 0, to: 600},

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

            {from: 300, to: 301},
            {from: 300, to: 302},
            {from: 300, to: 303},

            {from: 400, to: 401},
            {from: 400, to: 402},
            {from: 400, to: 403},
            
            {from: 500, to: 501},
            {from: 500, to: 502},
            {from: 500, to: 503},

            {from: 600, to: 601},
            {from: 600, to: 602},
            {from: 600, to: 603},

            // 나이스
            {from: 100000, to: 100001},
            {from: 100000, to: 100002},
            {from: 100000, to: 100003},

            {from: 200000, to: 200100},
                {from: 200100, to: 200101},
            {from: 200000, to: 200200},
                {from: 200200, to: 200201},
                {from: 200200, to: 200202},
                {from: 200200, to: 200203},
            {from: 200000, to: 200300},
                {from: 200300, to: 200301},
                {from: 200300, to: 200302},
                {from: 200300, to: 200303},

            {from: 300000, to: 300100},
                {from: 300100, to: 300101},
                {from: 300100, to: 300102},
            {from: 300000, to: 300200},
                {from: 300200, to: 300201},
                {from: 300200, to: 300202},
                {from: 300200, to: 300203},
            {from: 300000, to: 300300},
                {from: 300300, to: 300301},
                {from: 300300, to: 300302},
                {from: 300300, to: 300303},
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