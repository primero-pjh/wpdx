<template>
    <div id="schemaVue">
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
    name: 'schemaVue',
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
        const vis = window.vis;

        let first_size = 30;
        let second_size = 20;
        let third_size = 16;

        // create an array with edges
        var edges = new vis.DataSet([
            {from: 0, to: 100}, 
                {from: 100, to: 101},
                {from: 100, to: 102},
                {from: 100, to: 103},
            {from: 0, to: 200}, 
                // {from: 200, to: 200}, 
                {from: 200, to: 201}, 
                {from: 200, to: 202}, 
                {from: 200, to: 203}, 
                {from: 200, to: 204}, 
                {from: 200, to: 205}, 
            {from: 0, to: 300},     
                {from: 300, to: 301}, 
                {from: 300, to: 302}, 
                {from: 300, to: 303}, 
            {from: 0, to: 400},
            {from: 0, to: 500},
                {from: 500, to: 501},
                {from: 500, to: 502},

            {from: 100000, to: 110000},
                {from: 110000, to: 110001},
                {from: 110000, to: 110002},
            {from: 100000, to: 120000},
                {from: 120000, to: 120001},
                {from: 120000, to: 120002},
            {from: 100000, to: 130000},
                {from: 130000, to: 130001},
                {from: 130000, to: 130002},
                {from: 130000, to: 130003},
            {from: 100000, to: 140000},
                {from: 140000, to: 140001},
                {from: 140000, to: 140002},
                {from: 140000, to: 140003},
            {from: 100000, to: 150000},
            {from: 100000, to: 160000},
                {from: 160000, to: 160001},
                {from: 160000, to: 160002},
                {from: 160000, to: 160003},
            

            {from: 200000, to: 210000},
                {from: 210000, to: 210001},
                {from: 210000, to: 210002},
                {from: 210000, to: 210003},
                {from: 210000, to: 210004},
            
            {from: 200000, to: 220000},
            {from: 200000, to: 230000},
                {from: 230000, to: 230001},
                {from: 230000, to: 230002},
            {from: 200000, to: 240000},

            {from: 300000, to: 300001},
            {from: 300000, to: 300002},

        ]);

        let nodes = new vis.DataSet([
            // 학교알리미
            { id: 0, label: "학생", shape: "square" },
                { id: 100, label: "나이스", shape: "diamond", color: 'pink' },
                    { id: 101, label: "생활기록부", shape: "ellipse", size: 12, color: 'green' },
                    { id: 102, label: "독서활동", shape: "ellipse", size: 12, color: 'green' },
                    { id: 103, label: "창체활동", shape: "ellipse", size: 12, color: 'green' },

                { id: 200, label: "WP", shape: "diamond", color: 'pink' },   
                    { id: 201, label: "상담기록", shape: "ellipse", size: 12, color: 'green' },
                    // { id: 202, label: "수납기록", shape: "ellipse", size: 12, color: 'green' },
                    { id: 203, label: "출결기록", shape: "ellipse", size: 12, color: 'green' },
                    { id: 204, label: "커리큘럼", shape: "ellipse", size: 12, color: 'green' },
                    { id: 205, label: "인적사항", shape: "ellipse", size: 12, color: 'green' },
                
                

                { id: 300, label: "성적", shape: "diamond", color: 'red' },   
                    { id: 301, label: "내신성적", shape: "ellipse", size: 12, color: 'red' },
                    { id: 302, label: "모의고사 성적", shape: "ellipse", size: 12, color: 'red' },
                    { id: 303, label: "진학정보", shape: "ellipse", size: 12, color: 'red' },

                { id: 400, label: "시험지", shape: "diamond", color: 'pink' },
                { id: 500, label: "컨설팅", shape: "diamond", color: 'pink' },
                    { id: 501, label: "Synology", shape: "ellipse", size: 12, color: 'green' },
                    { id: 502, label: "진학희망 학교", shape: "ellipse", size: 12, color: 'red' },
                

            { id: 100000, label: "학교", shape: "square" },
                { id: 110000, label: "기본정보", shape: "diamond", color: 'pink' },
                    { id: 110001, label: "학교기본정보", shape: "ellipse", size: 12, color: 'green' },
                    { id: 110002, label: "학사일정", shape: "ellipse", size: 12, color: 'green' },
                { id: 120000, label: "진학률", shape: "diamond", color: 'red' },
                    { id: 120001, label: "영재고", shape: "ellipse", size: 12, color: 'red' },
                    { id: 120002, label: "과학고", shape: "ellipse", size: 12, color: 'red' },
                { id: 130000, label: "교육과정", shape: "diamond", color: 'pink' },
                    { id: 130001, label: "수업일수", shape: "ellipse", size: 12, color: 'green' },
                    { id: 130002, label: "수업시수", shape: "ellipse", size: 12, color: 'green' },
                    { id: 130003, label: "교과진도 운영계획", shape: "ellipse", size: 12, color: 'green' },
                { id: 140000, label: "학업성취", shape: "diamond", color: 'pink' },
                    { id: 140001, label: "과목별 평균", shape: "ellipse", size: 12, color: 'green' },
                    { id: 140002, label: "성취도별분포비율", shape: "ellipse", size: 12, color: 'green' },
                    { id: 140003, label: "교과별(학년별) 평가계획", shape: "ellipse", size: 12, color: 'green' },
                { id: 150000, label: "시험지", shape: "diamond", color: 'red' },
                { id: 160000, label: "재원생 정보", shape: "diamond", color: 'pink' },
                    { id: 160001, label: "센터별 재원생 정보", shape: "ellipse", size: 12, color: 'green' },
                    { id: 160002, label: "영재학교 및 과학고 진학 학생", shape: "ellipse", size: 12, color: 'green' },
                    { id: 160003, label: "학교별 진학률", shape: "ellipse", size: 12, color: 'green' },



            { id: 200000, label: "지역", shape: "square" },
                { id: 210000, label: "사교육", shape: "diamond", color: 'pink' },
                    { id: 210001, label: "사교육비 총액", shape: "ellipse", size: 12, color: 'green' },
                    { id: 210002, label: "사교육비 월평균", shape: "ellipse", size: 12, color: 'green' },
                    { id: 210003, label: "참여율", shape: "ellipse", size: 12, color: 'green' },
                    { id: 210004, label: "행정구역별 사교육비", shape: "ellipse", size: 12, color: 'red' },
                
                { id: 220000, label: "소득", shape: "diamond", color: 'red' },

                { id: 230000, label: "재원생", shape: "diamond", color: 'pink' },
                    { id: 230001, label: "재원생 거주 분포", shape: "ellipse", size: 12, color: 'green' },
                    { id: 230002, label: "진학률", shape: "ellipse", size: 12, color: 'green' },
                
                { id: 240000, label: "진학률", shape: "diamond", color: 'red' },

                // { id: 300003, label: "학교기본정보", shape: "circle" },
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