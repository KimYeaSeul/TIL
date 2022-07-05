# restApi Practice

## used tool
### table plus : database를 보기 좋게 하는 GUI Tool
### postman : http 통신(get, post, delete, update)을 도와주는 Tool

## npm install
### express : 노드로 구현한 웹서버 라이브러리
### mysql
### nodemon : nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## 실행 순서
### 1. mysql server실행
#### mysql.server start
### 2. 웹서버 실행
#### nodemon 파일이름.js
### 3. postman 실행
#### Get, Post, Delete, Update 테스트. JSON 형태로 전송해야함.
### 4. table plus 실행
#### 로컬호스트 접속 후, postman 으로 실행한 CRUD 결과 table 확인.