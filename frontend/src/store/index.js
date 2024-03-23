import { createStore } from "vuex";
import axios from "axios";
import router from "../router"

// state, getters, mutations, actions, modules
const store = createStore({
    state : {
        schoolInfos: [],
        presentInfos: [],

        center_dict: {
            14: '해운대구', 
            15: '동래구',
            16: '사하구',
        },

        goto_page(url) {
            router.push(url);
        },
        open_new_tab(url) {
            window.open(url);
        },
        /* useful function */
        getCookie: function (name) {
            //APP_ACC_TKN
            let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
            return value? value[2] : null;
        },
        setCookie: function (name, value, exp) {
            let date = new Date();
            date.setTime(date.getTime() + exp*24*60*60*1000);
            document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
        },
        setError: function(obj, err) {
            for(let key in err) {
                if(Object.prototype.hasOwnProperty.call(obj, key)) { 
                    obj[key] = err[key];
                }
            }
        },
        clearError: function(obj) {
            for(let key in obj) {
                obj[key] = "";
            }
        },
        formatDate(date, type) {
            date = new Date(date);
            let month = date.getMonth() + 1;
            month = month >= 10 ? month : `0${month}`;
            let day = date.getDate();
            day = day >= 10 ? day : `0${day}`;
        
            let hours = date.getHours();
            hours = hours >= 10 ? hours : `0${hours}`;
            let min = date.getMinutes();
            min = min >= 10 ? min : `0${min}`;
            let sec = date.getSeconds();
            sec = sec >= 10 ? sec : `0${sec}`;
            if(type == 'date') {
                return `${date.getFullYear()}-${month}-${day}`; 
            } else if (type == 'date_ko') {
                return `${date.getFullYear()}년 ${month}월 ${day}일`; 
            } else if (type == 'date_2') {
                return `${month}.${day}`; 
            } else {
                return `${date.getFullYear()}-${month}-${day} ${hours}:${min}:${sec}`; 
            }
        }
    },
    getters: {
    },
    mutations: {
        loadSchoolInfo(state) {
            let vm = this;
            axios.get(`/api/datasets/schoolInfo`, {

            }).then((res) => {
                let data = res.data;
                if(data.success) {
                    let rows = data.rows;
                    state.schoolInfos = JSON.parse(rows);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        loadWPPresent(state) {
            let vm = this;
            axios.get(`/api/lms`, {

            }).then((res) => {
                let data = res.data;
                if(data.success) {
                    state.presentInfos = data.rows;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
    },
});

export default store;