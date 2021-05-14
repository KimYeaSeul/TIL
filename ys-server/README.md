# TIL
## Today I Learn
### 2021 May 2nd Week

#### Building the Basics of the Backend
  * Using Koa Web Framework
    * Reference : https://edykim.com/ko/post/introducing-javascript-generator-and-koa.js/
  * Using REST API
  * Separated API
  * Using Method
  * Separated API handler
  * Using MongoDB
    * Reference : https://mongoosejs.com/docs/queries.html
  * Using Mongoose
    * Reference : https://velog.io/@ckstn0777/Mongoose-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0
  * Load environment variable from the env file
    * Using dotenv Library
    * Reference : https://www.daleseo.com/js-dotenv/

#### 210513 Issue
  * NODE_PATH Setting Erro Message
    * 'cross-env' is not recognized as an internal or external command, operable program or batch file.
  * 환경변수를 사용하기 위해서 dotenv or cross-env 를 활용할 수 있음.
  * cross-env 는 error가 뜸으로 dotenv 를 사용하기로 한다..
  * Create Database Schema & Model
  * Studing data Create & Select

#### 210514 Issue
  * Studying data delete, update, replace.
  * REST API Test 끝!
  * 회원인증 시스템 시작!
    * POST/api/register/local: 회원가입 API
    * POST /api/login/local: 로그인 API
    * GET /exists/:key/:value: 이메일 / 아이디 중복확인
    * POST /logout: 로그아웃
  * sha256을 이용하여 password 암호화
  * 모델메소드 만들기( statics or methods )
