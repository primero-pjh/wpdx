<template>
    <div id="statVue">
        <div class="text-h6 faSB">지역별 학생 분포도(구를 선택해주세요.)</div>
        <div>
            <div id="map" style="height: 500px;">

            </div>
        </div>
        <div class="q-mt-sm "  style="width: 300px;">
            <q-input placeholder="검색할 학교명을 입력하세요." class="faSB" filled dense
                @update:model-value="inputSearchSchoolName">
                <template v-slot:prepend>
                    <q-icon name="search" />
                </template>
            </q-input>
        </div>
        <div class="q-mt-sm " style="border: 1px solid #eee;">
            <q-scroll-area style="height: 400px; max-width: 300px; ">
                <q-list bordered style="width: 300px;" class="bg-white">
                    <q-item clickable v-ripple v-for="row, idx in fiilterSchool" :key="idx">
                        <q-item-section>{{ row.name }}</q-item-section>
                        <q-item-section avatar>
                            {{ row.count }}명
                        </q-item-section>
                    </q-item>
                    <q-separator />
                </q-list>
            </q-scroll-area>
        </div>
        <template v-if="false">
            <div v-if="isShow['사하구']">
                <q-table
                    :rows="schoolInfoDict['사하구']">
                </q-table>
            </div>
            <div v-if="isShow['해운대구']">
                <q-table
                    :rows="schoolInfoDict['해운대구']">
                </q-table>
            </div>
            <div v-if="isShow['동래구']">
                <q-table
                    :rows="schoolInfoDict['동래구']">
                </q-table>
            </div>
        </template>
    </div>
</template>

<script>
import axios from "axios";
import busan_gu from "../../assets/busan_gu.json"

export default {
    name: 'statVue',
    computed: {
        middleSchools() {
            return this.$store.state.middleSchools;
        },
        schoolInfos() {
            return this.$store.state.schoolInfos;
        },
        presentInfos() {
            return this.$store.state.presentInfos;
        },
    },
    components: {
    },
    data() {
        return {
            gu_data: ['사하구', '해운대구', '동래구'],

            middleSchoolDict: {},

            originFilterSchool: [],
            fiilterSchool: [],

            isShow: {
                '사하구': false,
                '해운대구': false,
                '동래구': false,
            },

            schoolInfoDict: {
                '사하구': [],
                '해운대구': [],
                '동래구': [],
            },
            presentInfoDict: {
                '사하구': 0,
                '해운대구': 0,
                '동래구': 0,
            },
        }
    },
    methods: {
        setSchoolInfoDict() {
            let vm = this;
            for(let i=0; i<vm.gu_data.length; i++) {
                for(let j=0; j<vm.middleSchools.length; j++) {
                    let data = vm.middleSchools[j];
                    let ORG_RDNMA = data.ORG_RDNMA;
                    if(ORG_RDNMA && ORG_RDNMA.includes(vm.gu_data[i]) == true) {
                        vm.schoolInfoDict[vm.gu_data[i]].push(data);
                    }
                }
            }
        },
        inputSearchSchoolName(args) {
            let vm = this;
            vm.fiilterSchool = JSON.parse(JSON.stringify(vm.originFilterSchool));    
            if(!args) {
                return;
            }
            vm.fiilterSchool = vm.fiilterSchool.filter((x) => x.name.includes(args));
        },
        initMap() {
            let vm = this;
            
            const L = window.L;
            let sajik = [35.2002922, 129.0643557];
            let saha_cms = [35.103891, 128.9735843];
            let hw = [35.168676, 129.177398];

            let busan_central = [35.1369222, 129.05562775];
            let map = L.map('map').setView(busan_central, 11);

            vm.setSchoolInfoDict();
            
            let wpIcon = L.icon({
                iconUrl: '/images/wp-logo2.png',
                // shadowUrl: '/images/wp-logo.png',

                iconSize:     [24, 24], // size of the icon
                // shadowSize:   [50, 64], // size of the shadow
                // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                // shadowAnchor: [4, 62],  // the same for the shadow
                // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
            });

            L.marker(saha_cms, {icon: wpIcon}).addTo(map);
            L.marker(sajik, {icon: wpIcon}).addTo(map);
            L.marker(hw, {icon: wpIcon}).addTo(map);

            let set_color = {
                '사하구': 'red',
                '해운대구': 'yellow',
                '동래구': 'blue',
            }

            vm.middleSchools.map((x) => {
                if(x.ORG_RDNMA.includes("사하구") || x.ORG_RDNMA.includes("해운대구") || x.ORG_RDNMA.includes("동래구") ) {
                    L.marker([x.latitude, x.longitude]).addTo(map).bindPopup(`
                        <div class="text-h6 faSB">${x.SCHUL_NM}</div>
                        <table class="faSB text-body1" style="width: 200px;">
                            <tr>
                                <th>타입</th>
                                <th>값</th>
                            </tr>
                            <tr>
                                <td>재원생 수</td>
                                <td>${vm.middleSchoolDict[x.SCHUL_NM]}</td>
                            </tr>
                        </table>
                        <style>
                            table{ border-collapse : collapse; }
                            th{background-color: #eee;}
                            th,td{
                                text-align: center;
                                border: 1px solid #000;
                                
                                vertical-align: top;	/* 위 */
                                vertical-align: bottom;   /* 아래 */
                                vertical-align: middle;   /* 가운데 */
                            }
                        </style>
                    `);
                }
            });

            for(let i=0; i<busan_gu.features.length; i++) {
                let data = busan_gu.features[i].geometry.coordinates;
                let polygon_data = [];
                for(let j=0; j<data[0].length; j++) {
                    polygon_data.push([
                        data[0][j][1],
                        data[0][j][0],
                    ]);
                }
                var polygon = L.polygon(
                        polygon_data,
                        {
                            color: set_color[busan_gu.features[i].id],
                            id: busan_gu.features[i].id,
                        },
                ).addTo(map);
                polygon.bindPopup(`
                    <div class='text-h6 faSB'>${busan_gu.features[i].id} 중학교 통계</div>
                    <table class="faSB text-body1" style="width: 200px;">
                        <tr>
                            <th>타입</th>
                            <th>값</th>
                        </tr>
                        <tr>
                            <td>학교수</td>
                            <td>${vm.schoolInfoDict[busan_gu.features[i].id].length}</td>
                        </tr>
                        <tr>
                            <td>재원생 수</td>
                            <td>${vm.presentInfoDict[busan_gu.features[i].id]}</td>
                        </tr>
                        <!--
                        <tr>
                            <td>평균 진로</td>
                            <td>15</td>
                        </tr>
                        <tr>
                            <td>평균 성적</td>
                            <td>15</td>
                        </tr>
                        -->
                    </table>
                    <style>
                        table{ border-collapse : collapse; }
                        th{background-color: #eee;}
                        th,td{
                            text-align: center;
                            border: 1px solid #000;
                            
                            vertical-align: top;	/* 위 */
                            vertical-align: bottom;   /* 아래 */
                            vertical-align: middle;   /* 가운데 */
                        }
                    </style>
                `);
            }

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {      
                maxZoom: 19,     
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
            }).addTo(map);

            // function onMapClick(e) {
            //     console.log(e);
            // }
            // map.on('click', onMapClick);
            map.on('popupopen', (e) => {
                let args = e.popup._source;
                let id = args.options.id;
                vm.isShow[id] = true;
            });
        },
        initPresent() {
            let vm = this;

            vm.middleSchoolDict = new Object();
            vm.middleSchools.map((x) => {
                vm.middleSchoolDict[x.SCHUL_NM] = 0;
            });
            
            for(let i=0; i<vm.presentInfos.length; i++) {
                if(vm.presentInfos[i].SchoolLevel == 'middle') {
                    vm.presentInfoDict[vm.$store.state.center_dict[vm.presentInfos[i].CenterId]] += vm.presentInfos[i].count;
                    if(Object.prototype.hasOwnProperty.call(vm.middleSchoolDict, vm.presentInfos[i].SchoolName)) {
                        vm.middleSchoolDict[vm.presentInfos[i].SchoolName] += vm.presentInfos[i].count;
                    }
                }
            }
            
            vm.fiilterSchool = [];
            for(var k in vm.middleSchoolDict) {
                vm.originFilterSchool.push({
                    name: k,
                    count: vm.middleSchoolDict[k],
                });
                vm.fiilterSchool.push({
                    name: k,
                    count: vm.middleSchoolDict[k],
                });
            }
        },
        Kakaogeometry() {
            let vm = this;
            const kakao = window.kakao;
            console.log("kakao:", kakao);
            var geocoder = new kakao.maps.services.Geocoder();

            let data = [];

            for(let i=0; i<vm.middleSchools.length; i++) {
                let x = vm.middleSchools[i];
                geocoder.addressSearch(x.ORG_RDNMA, async (result, status) => {
                    // console.log("result:", result);
                    data.push({
                        SCHUL_NM: x.SCHUL_NM,
                        SD_SCHUL_CODE: x.SD_SCHUL_CODE,
                        ORG_RDNMA: x.ORG_RDNMA,
                        ORG_TELNO: x.ORG_TELNO,
                        HMPG_ADRES: x.HMPG_ADRES,
                        latitude: result[0].y,
                        longitude: result[0].x,
                    });
                });
            }

            setTimeout(() => {
                axios.post(`/api/schoolInfos/lat/long`, {
                    data,
                }).then((res) => {

                });
                console.log("data:", data);
            }, 1000);
           
        },
    },
    mounted() {
        let vm = this;
        vm.$q.loading.show();
        
        setTimeout(() => {
            // vm.Kakaogeometry();
            vm.initPresent();
            vm.initMap();
            vm.$q.loading.hide();
        }, 500);
    }
}
</script>