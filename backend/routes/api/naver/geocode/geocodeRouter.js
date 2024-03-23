var express = require('express');
var router = express.Router();
const axios = require('axios');
var atob = require('atob');

router.get('/api/naver/geocode', async (req, res, next) => {
    let address = req.query.query;

    let address_list = new Array();
    await axios.get(`https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode`, {
        params: {
            query: address,
            count: 20,
        },
        headers: {
            "X-NCP-APIGW-API-KEY-ID": "lirsakpzs5",
            "X-NCP-APIGW-API-KEY": "FGveGqJiDtRapbGCAg3bDU3ICyvwb7PfjpDk9upE",
        }
    }).then(function(res) {
        let data = res.data;
        if(data.status == "OK") {
            address_list = address_list.concat(data.addresses);
	        console.log("address_list:", address_list);
        } else {
            console.error(data);
        }
    }).catch(function(err) {
        console.log("err:", err.message);
    });

    return res.json({
        success: address_list.length > 0 ? 1 : 0,
        address_list: address_list,
    });
});

router.get('/api/naver/driving', async function(req, res, next) {
    let start = req.query.start;
    let end = req.query.end;
    let option = req.query.option;

    let return_message = 
    {
        0: "길찾기 성공",
        1: "출발지와 도착지가 동일",
        2: "출발지 또는 도착지가 도로 주변이 아닌 경우",
        3: "자동차 길찾기 결과 제공 불가",
        4: "경유지가 도로 주변이 아닌 경우",
        5: "요청 경로가 매우 긴 경우(경유지를 포함한 직선거리의 합이 1500km이상인 경우)",
    }
    // example
    // https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=127.1058342,37.359708&goal=129.075986,35.179470&
    await axios.get(`https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving`, {
        params: {
            start: start,
            goal: end,
            option: option,
        },
        headers: {
            "X-NCP-APIGW-API-KEY-ID": "lirsakpzs5",
            "X-NCP-APIGW-API-KEY": "FGveGqJiDtRapbGCAg3bDU3ICyvwb7PfjpDk9upE",
        }
    }).then((response) => {
        let data = response.data;
        
        if(data.code == 0) {
            console.log(data.route.trafast[0].path.length);
            for(var i=0; i<data.route.trafast[0].path.length; i++ ){
                console.log(data.route.trafast[0].path[i]);
            }
            return res.json({
                success: 1,
                data: data,
            });
        } else {
            return res.json({
                success: 0,
                message: return_message[data.code],
            });
        }
    }).catch(function(err) {
        console.log("err:", err.message);
    });
});

module.exports = router;
