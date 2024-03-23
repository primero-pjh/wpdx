<div align="center">
    <h1>👫 YBR - Couple Application #Prototype</h1>
</div>

<div align="left">

## :bookmark_tabs: 목차
- 🔗 [링크](#-링크)
- ✨ [프로젝트설명](#-프로젝트-설명)
- 📜 [미리보기](#-미리보기)
- 🛠 [기술 스택](#-기술-스택)
- ⚡ [서버 실행](#-서버-실행)
- 💾 [ERD](#-erd)
- 🔀 [시스템 흐름도](#-시스템-흐름도)
- ⭐ [기능 소개](#-기능-소개)

## **🔗 링크**
### 1️⃣ &nbsp; 사용자 페이지 - <a href="http://ybr.pritras.com" target="_blank">바로가기</a>
### 2️⃣ &nbsp; Swagger - <a href="http://pritras.com:3000/swagger" target="_blank">바로가기</a>

## **✨ 프로젝트 설명**
```
커플 간의 관계를 향상시키고 일상 생활을 보다 효율적으로 관리하는 데 도움을 주는 웹 애플리케이션입니다.
4가지 핵심 기능을 통해 다음과 같은 장점을 가집니다.

1. 캘린더 기능을 통해 일정을 조율하고 협업할 수 있습니다.
2. 채팅 기능을 통해 즉각적인 소통을 가능하게 합니다.
3. 앨범 기능을 통해 추억을 공유할 수 있습니다.
4. 프로필 기능을 통해 커플만이 가지는 개성을 표현할 수 있습니다.
```

## **🔍 미리보기**

<details>
    <summary><h3>로그인 페이지</h3></summary>
    <table>
        <tr><td colspan="2">로그인 페이지</td></tr>
        <tr>
            <td><kbd><img src="https://github.com/primero-pjh/ybr/assets/58695375/5ff903e6-0467-4192-8178-be7a05dfc9e7" /></kbd></td>
            <td >
                <div><h3>📃 설명</h3></div>
                <div>
                    :one: &nbsp;YBR 서비스를 이용하기 위한 로그인 페이지 입니다.
                    <br>
                    :two: 일반 로그인과 카카오 로그인을 제공합니다.
                    <br>
                    :three: 회원가입을 통해 서비스를 이용할 수 있습니다.   
                </div>
            </td>
        </tr>
        <tr><td colspan="2">회원가입 페이지</td></tr>
        <tr>
            <td><kbd><img src="https://github.com/primero-pjh/ybr/assets/58695375/57c4da07-d487-4c56-b66a-1e6ae9a2b1da" /></kbd></td>
            <td >
                <div><h3>📃 설명</h3></div>
                <div>
                    :one: &nbsp;YBR 서비스를 이용하기 위한 일반 유저의 회원가입 페이지 입니다.
                    <br>
                    :two: 프로필 사진을 등록하고,
                    <br>
                    :three: 아이디와 패스워드를 입력하여 계정을 생성합니다.
                </div>
            </td>
        </tr>
    </table>
</details>
<details>
    <summary><h3>홈 페이지</h3></summary>
    <table>
        <tr><td colspan="2">홈 페이지</td></tr>
        <tr>
            <td><kbd><img src="https://github.com/primero-pjh/ybr/assets/58695375/e88565ec-5a10-43b8-af55-804164ffd9bb" /></kbd></td>
            <td>
                <div><h3>📃 설명</h3></div>
                <div>
                    :one: YBR 서비스의 기본이 되는 Index 페이지입니다.
                    <br>
                    :two: 커플과 함께 꾸민 배경사진을 볼 수 있습니다.
                    <br>
                    :three: 등록한 일정을 쉽게 찾아볼 수 있습니다.
                    <br>
                    :four: 등록한 앨범을 볼 수 있습니다.
                </div>
            </td>
        </tr>
        <tr><td colspan="2">일정의 우측상단 버튼 - 일정 타임라인</td></tr>
        <tr>
            <td><kbd><img src="https://github.com/primero-pjh/ybr/assets/58695375/66f48382-3ace-4005-98db-9a2dfcd5111d" /></kbd></td>
            <td>
                <div><h3>📃 설명</h3></div>
                <div>
                    :one: 커플이 등록한 일정을 간편하게 볼 수 있도록 기능을 제공합니다.
                    <br>
                    :two: 등록한 일정의 시간순으로 나타냅니다.
                    <br>
                    :three: 좌측 원은 일정 유형의 색깔을 나타냅니다.
                </div>
            </td>
        </tr>
        <tr><td colspan="2">일정의 icon:place 버튼 - 네이버 지도</td></tr>
        <tr>
            <td><kbd><img src="https://github.com/primero-pjh/ybr/assets/58695375/5d9d16bc-beac-4629-a6f0-d8cefe3214e5" /></kbd></td>
            <td>
                <div><h3>📃 설명</h3></div>
                <div>
                    :one: 장소를 지정하면 버튼이 나타납니다.
                    <br>
                    :two: 사용자가 입력한 장소를 네이버 지도로 출력합니다.
                    <br>
                </div>
            </td>
        </tr>
    </table>
</details>
<details>
    <summary><h3>캘린더 페이지</h3></summary>
    <table>
        <tr><td colspan="2">캘린더 페이지</td></tr>
        <tr>
            <td><kbd><img src="https://github.com/primero-pjh/ybr/assets/58695375/7125168e-eff4-4438-be75-83ddae8584d1" /></kbd></td>
            <td>
                <div><h3>📃 설명</h3></div>
                <div>
                    :one: YBR 서비스에서 제공하는 캘린더 페이지입니다.
                    <br>
                    :two: 커플과 함께 일정을 등록, 수정 및 삭제 할 수 있는 페이지입니다.
                    <br>
                    :three: 일정을 유형별로 볼 수 있는 캘린더 필터 기능을 제공합니다.
                    <br>
                    :four: 월간, 주간, 일간 단위로 조회가 가능합니다.
                </div>
            </td>
        </tr>
    </table>
</details>
<details>
    <summary><h3>채팅 페이지</h3></summary>
    <table>
        <tr><td colspan="2">채팅 페이지</td></tr>
        <tr>
            <td><kbd><img src="https://github.com/primero-pjh/ybr/assets/58695375/38a9f8d2-c562-43cb-8792-2f43df9ec7d0" /></kbd></td>
            <td>
                <div><h3>📃 설명</h3></div>
                <div>
                    :one: YBR 서비스에서 제공하는 채팅 페이지입니다.
                    <br>
                    :two: 커플과 즉각적인 소통을 가능하게 합니다.
                    <br>
                </div>
            </td>
        </tr>
    </table>
</details>
<details>
    <summary><h3>앨범 페이지</h3></summary>
    <table>
        <tr><td colspan="2">앨범뷰</td></tr>
        <tr>
            <td><kbd><img src="https://github.com/primero-pjh/ybr/assets/58695375/e9ef8395-9690-47f9-8710-e266f1f702d1" /></kbd></td>
            <td>
                <div><h3>📃 설명</h3></div>
                <div>
                    :one: YBR 서비스에서 제공하는 앨범 페이지입니다.
                    <br>
                    :two: 우측 하단의 Fab Button을 통해 앨범을 추가할 수 있습니다.
                    <br>
                    :three: 등록한 앨범을 조회하고, 수정할 수 있습니다.
                </div>
            </td>
        </tr>
        <tr><td colspan="2">이미지뷰</td></tr>
        <tr>
            <td><kbd><img src="https://github.com/primero-pjh/ybr/assets/58695375/a016536d-7497-45ef-9029-34d06975c4fb" /></kbd></td>
            <td>
                <div><h3>📃 설명</h3></div>
                <div>
                    :one: 앨범에 속한 이미지들의 리스트를 뷰로 나타내며 이미지를 클릭 시 해당 앨범의 수정창을 출력합니다.
                    <br>
                </div>
            </td>
        </tr>
    </table>
</details>
<details>
    <summary><h3>프로필 페이지</h3></summary>
    <table>
        <tr><td colspan="2">프로필 페이지</td></tr>
        <tr>
            <td><kbd><img src="https://github.com/primero-pjh/ybr/assets/58695375/11765721-5ddf-41e2-9e57-ed07f8626ab1" /></kbd></td>
            <td>
                <div><h3>📃 설명</h3></div>
                <div>
                    :one: YBR 서비스에서 제공하는 프로필 페이지입니다.
                    <br>
                    :two: 좌측 Layer으로 각 Components를 드래그하여 아이템들을 배치할 수 있습니다.
                    <br>
                    :three: 우측 Layer에 Tools로 배경이미지를 삽입하거나, 텍스트를 배치할 수 있고 미리볼 수 있습니다.
                    <br>
                </div>
            </td>
        </tr>
    </table>
</details>

## **🛠 기술 스택**

### **:one: Language**
<img src="https://img.shields.io/badge/nodejs-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> 
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> 
<br>

### **:two: FE - Frameworks**
<img src="https://img.shields.io/badge/Vue-4FC08D?style=for-the-badge&logo=Vue.js&logoColor=white"> 
<img src="https://img.shields.io/badge/Quasar-050A14?style=for-the-badge&logo=Quasar&logoColor=white">
<img src="https://img.shields.io/badge/SocketIO-010101?style=for-the-badge&logo=socketdotio&logoColor=white">
<img src="https://img.shields.io/badge/AXIOS-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/Toast-000000?style=for-the-badge&logo=&logoColor=white">
<br>

### **:three: BE - Frameworks**
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=&logoColor=white">    
<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white">
<br>
<img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=white"> 
<img src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"> 
<img src="https://img.shields.io/badge/letsencrypt-003A70?style=for-the-badge&logo=letsencrypt&logoColor=white"> 
<br>

### **:four: RESTAPI**
<img src="https://img.shields.io/badge/kakao-FFCD00?style=for-the-badge&logo=kakao&logoColor=white">
<img src="https://img.shields.io/badge/naver-03C75A?style=for-the-badge&logo=naver&logoColor=white">
<img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white">
<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
<br>

### **:five: API Document**
<img src="https://img.shields.io/badge/swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=white">
</div>

## **⚡ 서버 실행**

### 1. 개발서버 
```
$ npm run build-dev // Frontend 데이터를 Backend로 build 합니다.
$ npm run start     // Backend 실행
```
### 2. 리얼서버
```
$ npm run build     // Frontend 데이터를 Backend로 build 합니다.
$ npm start         // Backend 실행
```
    
## **💾 ERD**
<kbd>
    <img src="https://github.com/primero-pjh/ybr/assets/58695375/6fb45a06-23bf-459f-932a-fb81a1da2939" />
</kbd>

## **🔀 시스템 흐름도**
<kbd>
    <img src="https://github.com/primero-pjh/ybr/assets/58695375/6e8569f9-f1ff-4f47-96e0-7495e6342767" />
</kbd>

<details>
    <summary><h3>상세 설명</h3></summary>
    1. 클라이언트는 YBR의 Nginx을 통해 제공되는 FE(Vue)를 통해 커플 웹 서비스를 이용할 수 있습니다.<br>
    2. 서버는 Node-Express-Framework를 사용하여 모든 요청을 응답합니다.<br>
    3. 올바른 사용자 검증을 위해 모든 Rest-API 요청에 JWT Token을 포함하여 전송합니다.<br>
    4. 서버는 모든 요청의 JWT Token을 검증합니다. <br>
    5. 올바른 요청에서의 데이터를 조회하고 저장하며 사용자의 요청을 성공, 실패를 반환합니다.<br>
</details>

## ⭐ 기능 소개

### **:one: MVC 패턴과 디렉토리 구조**
<kbd><img src="https://github.com/primero-pjh/ybr/assets/58695375/0b865988-f9ad-44eb-b689-7f1aaa036a20" width="30%" /><img src="https://github.com/primero-pjh/ybr/assets/58695375/7a28f15a-b882-4979-bdeb-6d851c59d202" /></kbd>

<b>YBR 프로젝트는 MVC 패턴을 따라 디렉토리 구조를 설계하였습니다.</b><br>    
<b>M</b>odel - NodeJs 특성상 자료형이 자유롭기 때문에 생략하였습니다.<br>
<b>V</b>iew - /ybr/backend/public/index.html<br>
- /ybr/frontend의 파일들이 build가 되며 /ybr/backend/public으로 들어오게 됩니다. :arrow_forward: 📌 [코드 보기](https://github.com/primero-pjh/ybr/blob/master/frontend/vue.config.js)
- YBR의 Client에게 제공되는 UI/UX입니다.
  
<br>

<b>C</b>ontroller - /ybr/backend/routes
- 사용자의 요청에 따라 응답하게 되는 Controller(Router) 디렉토리입니다.
- axios: /ybr/backend/routes/api
- socket-io: /ybr/backend/routes/socket



### **:two: 통신 규약**

### **🔎 Axios : 서버와 통신을 위해 사용되는 Promise 기반 HTTP 비동기 통신 라이브러리**
1. Server에 요청하기 전에 Headers에 Token(JWT)를 첨부하여 서버에 요청합니다. :arrow_forward: 📌 [코드 보기](https://github.com/primero-pjh/ybr/blob/master/frontend/src/main.js#L18)
```javascript
axios.interceptors.request.use((config) => {
    let token = $c.getCookie('token'); // Browser-Cookie에 저장된 token을 가져온다.
    config.headers["Authorization"] = token;
    return config;
}, (error) => {
    return Promise.reject(error);
});
```
2. 서버에서 응답을 받고, 각 페이지에 응답되기 전에 에러가 있다면 분기문을 통해 처리합니다. :arrow_forward: 📌 [코드 보기](https://github.com/primero-pjh/ybr/blob/master/frontend/src/main.js#L25)
```javascript
axios.interceptors.response.use((res) => {
    let data = res.data;
    if(data.success == 0 && Object.prototype.hasOwnProperty.call(data, "isLogged")) { // Jwt 토큰 검증에 실패한 경우 에러코드 출력 후 Login 페이지로 이동
        alert(data.message);
        window.location = "/#/login";
    } else if (data.success == 0 && Object.prototype.hasOwnProperty.call(data, "code")) { // couple의 정보가 잘못된 경우 에러코드 출력 후 Login 페이지로 이동
        if(data.code == "COUPLE_EMPTY_ERROR") {
            alert(data.message);
            window.location = "/#/login";
        }
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});
```
3. 서버의 <b>Middleware</b> 코드→ 사용자가 요청한 end-point로 도달하기 전에 Header에 담겨진 JWT-Token의 유효성을 검사를 합니다. :arrow_forward: 📌 [코드 보기](https://github.com/primero-pjh/ybr/blob/master/backend/app.js#L22)
```javascript
app.all('/api/*', async (req, res, next) => {
    let url = req.url;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
    /* 
        url의 요청이 login이 아니라면
        사용자가 추가한 authorization의 jwt token 값의 유효성을 검사한다.
    */
    if(url != '/api/user/login') {
        let token = req.headers.authorization;
        let resJwt = await jwtFunc.verify(token);
        if(!resJwt) {
            return res.json({
                success: 0,
                isLogged: false,
                message: CRT_ERROR_CODE["LOGIN_TOKEN"],
            });
        }
        req.self = resJwt;  // 에러가 없는 경우 req 인자에 self 필드를 추가합니다.
    }
    next(); // 사용자가 요청한 end-point로 전송합니다.
});
```

### **🔎 Socket.IO : 웹 소켓 연결을 통해 클라이언트와 서버간에 실시간 양방향 통신을 가능하게 하는 라이브러리**

1. 로그인 성공 후 handshake-auth에 JWT-Token을 포함하여 socket에 연결하는 코드 :arrow_forward: 📌 [코드 보기](https://github.com/primero-pjh/ybr/blob/master/frontend/src/views/login.vue#L83)
```javascript
const socket = io(`${vm.$store.state.host}`, {
    auth: { token, },
});
```
2. 서버의 <b>Middleware</b> 코드→ 사용자가 요청한 end-point로 도달하기 전에 Header에 담겨진 JWT-Token의 유효성을 검사를 합니다. :arrow_forward: 📌 [코드 보기](https://github.com/primero-pjh/ybr/blob/master/backend/bin/www#L44)
```javascript
io.use((socket, next) => {
let token = socket.handshake.auth.token;
    if(token) {
        jwtFunc.verify(token).then((res) => {
            if(!res) {
                socket.emit('/error', {
                    message: '로그인 토큰 만료!\n'
                });
            }
        });
        next(); // 이상이 없는 경우 end-point로 이동한다.
    } else {
        console.error('\u001b[41m', 'jwt token error', '\x1b[40m');
        socket.emit('/error', {
            message: '로그인 토큰 만료!\n'
        });
        next(); // 잘못된 데이터로 error를 반환한다.
    }
});
```

### **:three: 배포 자동화**
### **🔎 Crontab을 이용한 배포 자동화 서비스**
1. 매일 새벽 1시에 sh 파일을 실행하고 log 기록
```sh
0 1 * * * /var/www/html/cron/running_ybr.sh >> /var/www/html/cron/running_ybr.log 2>&1
```
2. running_ybr.sh code
```sh
cd /var/www/html/ybr            # director로 이동
npm install                     # library 설치
sudo forever stopall            # 동작되고 있는 모든 서버 종료
sudo forever start ./bin/www    # 서버 시작
```

### **:four: Nginx Code**
1. http://ybr.pritras.com 로 들어오는 URL 요청을 내부의 127.0.0.1:3000 으로 proxy pass 해줍니다.
2. root directory를 /ybr/public으로 지정하며 static 한 파일으로 설정합니다.
3. certbot을 통해 https 를 지원합니다. (letsencrypt)
```sh
server {
        listen 80;
        server_name ybr.pritras.com;
        root /var/www/html/ybr/public;
        client_max_body_size 100m;
        location ~* \.(py|pyc|tmpl|cfg|pem|~)$ { deny all; }
        location ~* /~/ { deny all; }
        location ~* \.\w+$ {}
        location / {
       		proxy_http_version 1.1;
       		proxy_pass       http://127.0.0.1:3000;
       		proxy_redirect   off;
       		proxy_set_header   X-Scheme $scheme;
       		proxy_set_header Host $http_host;
       		proxy_set_header Upgrade $http_upgrade;
       		proxy_set_header Connection "upgrade";
       		proxy_set_header REMOTE_ADDR $remote_addr;
     		proxy_read_timeout 300s;
        }

        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/ybr.pritras.com/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/ybr.pritras.com/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
```

## 성능 개선안

**1. DB-Table의 Index Key 설정**<br>
Calendar 페이지의 List를 들고오는 raw-data가 많습니다.<br>따라서 sql query의 조건으로 사용자가 보는 date 및 userId를 Index로 설정하여
이분탐색을 하도록 테이블의 인덱스 키로 설정하였습니다.<br>
[SQL 코드]
```sql
CREATE TABLE `schedules` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`coupleInfoId` INT(11) NOT NULL DEFAULT '0',
	`calendarId` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`title` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`body` VARCHAR(500) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`isAllday` INT(11) NOT NULL DEFAULT '0',
	`start` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`end` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`location` VARCHAR(500) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`attendees` TEXT NOT NULL COLLATE 'utf8mb4_general_ci',
	`category` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`classification` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`dueDateClass` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'utf8mb4_general_ci',
	`isVisible` INT(11) NOT NULL DEFAULT '0',
	`isPending` INT(11) NOT NULL DEFAULT '0',
	`isFocused` INT(11) NOT NULL DEFAULT '0',
	`isPrivate` INT(11) NOT NULL DEFAULT '0',
	`status` INT(11) NOT NULL DEFAULT '1',
	`dateAdded` DATETIME NOT NULL,
	`dateDeleted` DATETIME NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `coupleInfoId` (`start`, `end`, `coupleInfoId`) USING BTREE
)
COMMENT='커플들의 일정관리'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=1000052
;
```
2. 서버 업그레이드
현재 사용하고 있는 서버의 사양입니다.<br>
![image](https://github.com/primero-pjh/ybr/assets/58695375/5ec3b9a0-8e45-498a-be49-e3c6f6f09f8b)

CI/CD를 위해 Java로 8080 포트의 서버를 열어야 하는데 부족한 메모리로 인하여<br>
Jenkins의 성능이 많이 저하되고 있습니다. 따라서 서버의 사양을 조금 더 업그레이드 하여 서비스를 진행하면 좋을 것 같습니다.<br>
![image](https://github.com/primero-pjh/ybr/assets/58695375/335bfaed-4b98-446c-9b73-2340f5a17cb2)


## 추가 개발안
- 커플과 같은 화면을 공유할 수 있는 Live Shared 기능을 추가하여 생산성 높은 웹 애플리케이션을 만들고 싶습니다.
- 인스타그램와 같이 다른 사람에게 나(커플)의 '앨범'을 공유하는 시스템을 도입하여 좋아요,댓글 등 커뮤니케이션 기능을 추가하고 싶습니다.
- 현대적이고 높은 집중도와 생산성을 만들어내는 UI/UX를 제공하고 싶습니다.
- Docker를 도입하여 서버의 보안성을 늘리고 Jenkins를 사용하여 배포 자동화를 갖추고 싶습니다.


