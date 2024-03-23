<template>
    <div id="statVue">
        <div class="text-h6 faSB">지역별 학생 분포도(구를 선택해주세요.)</div>
        <div>
            <div id="map" style="height: 500px;">

            </div>
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
                for(let j=0; j<vm.schoolInfos.length; j++) {
                    let data = vm.schoolInfos[j];
                    let ORG_RDNMA = data.ORG_RDNMA;
                    if(ORG_RDNMA && ORG_RDNMA.includes(vm.gu_data[i]) == true) {
                        vm.schoolInfoDict[vm.gu_data[i]].push(data);
                    }
                }
            }
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
                    <div class='text-h6 faSB'>${busan_gu.features[i].id}</div>
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
            console.log("presentInfos:", vm.presentInfos);
            for(let i=0; i<vm.presentInfos.length; i++) {
                if(vm.presentInfos[i].SchoolLevel == 'middle') {
                    vm.presentInfoDict[vm.$store.state.center_dict[vm.presentInfos[i].CenterId]] += vm.presentInfos[i].count;
                }
            }
        },

    },
    mounted() {
        let vm = this;
        vm.$q.loading.show();
        setTimeout(() => {
            vm.initPresent();
            vm.initMap();
            vm.$q.loading.hide();
        }, 500);
    }
}
</script>