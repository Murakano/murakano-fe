![3](https://github.com/user-attachments/assets/020f202a-16a1-4d49-8522-9ace6ee9b4de)

# 목차

1. [**서비스 소개**](#1-서비스-소개)
2. [**기획 배경**](#2-기획-배경)
3. [**개발 기간 및 작업 관리**](#3-개발-기간-및-작업-관리)
4. [**기능 소개**](#4-기능-소개)
5. [**기술 스택**](#5-기술-스택)
6. [**시스템 아키텍처**](#6-시스템-아키텍처)
7. [**프로젝트 관리**](#7-프로젝트-관리)
8. [**프로젝트 산출물**](#8-프로젝트-산출물)
9. [**팀원별 역할 및 회고**](#9-팀원별-역할-및-회고)

## 1. 서비스 소개

### 개요

- `머라카노`는 개발 용어의 발음 정보를 제공하는 서비스 입니다.
- 검색을 통해 발음이 헷갈리는 개발 용어의 발음 정보를 찾아볼 수 있습니다.
- 등록을 원하는 단어를 등록 요청 기능을 통해 해당 개발 용어 발음 정보를 요청할 수 있습니다.

### 타겟

- 신입 개발자 및 주니어 개발자
- 개발자 취업 준비생
- 개발을 공부하는 학생

### 서비스 주소 :  🔗[https://app.murakano.site](https://app.murakano.site/words)

## 2. 기획 배경

### 문제 인식

카카오테크 부트캠프 수강 중 딥다이브, 프로젝트 발표 등을 진행하면서 특정 개발 용어의 발음을 읽는 것에 어려움을 느낌

### 문제 정의

개발 용어 발음 검색 서비스의 부재로
다른 수강생들과 많은 주니어들이 같은 문제를 겪고 있다는 것을 알게됨

### 문제 해결

개발 단어 발음을 검색할 수 있는 서비스를 개발하여 문제를 해결

## 3. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 : 2024-06-17 ~ 2024-07-20

### 작업 관리

- 작업 현황 및 앞으로의 작업 순서 및 방향성에 대한 내용을 데일리 스크럼 및 주간회의를 통해 공유했습니다.
- 노션의 칸반보드를 활용하여 팀원 모두의 작업 현황을 공유했습니다.

## 4. 기능 소개

### [메인 검색창]

![11](https://github.com/user-attachments/assets/415f54de-96ee-4092-af27-59d9e16b42f2)


### [검색 결과]

![12](https://github.com/user-attachments/assets/88f38183-9384-4f91-aac1-f4ecab57c706)


### [용어 등록/수정 요청]

![13](https://github.com/user-attachments/assets/cad2870f-1b91-40c8-8102-d37dc5986227)


### [전체 용어 목록]

![14](https://github.com/user-attachments/assets/878275e6-901c-4db8-95b5-ef12c0f542b1)

### [전체 요청 목록]

![전체요청목록](https://github.com/user-attachments/assets/d6b86292-5a5b-4d98-98eb-b5db1ed64ed1)

### [로그인]

![15](https://github.com/user-attachments/assets/121957db-939c-488b-a5cd-eb309ede9e4b)

### [회원가입]

![16](https://github.com/user-attachments/assets/2dadfd5e-4e25-4488-ac12-c88de5e42932)

## 5. 기술 스택

![image](https://github.com/user-attachments/assets/9c6f9da9-2f41-490a-a92d-f26ee474fb18)

- Front : React, Next.js, Zustand, styled-components
- Back-end : Express.js, MongoDB, Redis, Elastic Beanstalk, CodePipeline
- 버전 및 이슈관리 : Github, Github Issues, Notion, Webhook
- 협업 툴 : Discord, Notion, Slack
- 서비스 배포 환경 : Netlify, AWS Elastic Beanstalk
- 디자인 : Figma

### MERN 스택 사용 이유

![image](https://github.com/user-attachments/assets/91eb007b-94e9-4854-ad8b-c10010b96cf7)


MongoDB는 기본적으로 JSON 데이터를 저장하도록 설계 되었기 때문에, MongoDB-Express.js-React.js의 결합은 JSON 데이터가 front에서 back으로 자연스럽게 흐르게 만듭니다. 따라서 디버깅이 쉬워지고 만들기 쉽습니다. 또한 가장 큰 장점은 단 하나의 프로그래밍 언어인 JavaScript와 JSON 구조만 알면 전체 시스템 이해가 가능해집니다. 모두 공통으로 사용 가능한 언어가 JS뿐이었던 상황에서, 빠르게 개발을 시작할 수 있는 선택이었습니다.

### FE

- React
    - 팀원 모두 사용한 경험이 있습니다.
    - 컴포넌트화를 통해 추후 유지보수와 재사용성을 고려했습니다.
    - JSX를 사용하여 훨씬 간결하고 가독성이 뛰어납니다.
- Next.js
    - CSR의 첫 페이지 로딩속도저하, 검색 노출 어려움 문제 보임
- styled-components
    - React의 컴포넌트 기반 개발 방식과 잘 맞아 코드의 가독성과 유지보수성을 높여줍니다.
    - Js를 사용하여 동적으로 스타일링을 사용할 수 있어, 다양한 조건에 따른 스타일 변화를 쉽게 구현할 수 있었습니다.
    - 빌드될 때 고유한 클래스 이름이 부여되어 네이밍 컨벤션을 정하는 비용을 절약할 수 있었습니다.
- Zustand
    - 상태관리를 제대로 사용해본적이 없는 상황을 고려하여 비교적 러닝커브가 낮은 Zustand를 도입했습니다.
    - 상태 변경 시 불필요한 리랜더링을 일으키지 않도록 제어하기 쉽습니다.

### BE

- Express.js
    - **팀원들 과제 수행여부** : 시작할 때 시점에서 모두 Express 구현은 완료했으나, 스프링 과제를 시작한 사람이 없었습니다.
    - **모두 풀스택 개발** : 모두가 **프론트+백**을 함께 개발하기 때문에 **동일한 언어인 JS로 구현**하는 것이 생산성이 뛰어납니다.
    - 복잡한 로직이 없는 우리 어플리케이션의 경우, CPU 사용량이 적기 때문에 IO속도나 메모리 사용량, 시작 시간 모두 Node.js를 사용하는 것이 스프링을 사용하는 것 보다 압도적으로 높은 퍼포먼스를 가질 수 있습니다.
        - 스프링은 사용자가 요청한 Request마다 스레드가 생성되고 동접이 늘어날 수록 스레드가 갯수가 늘어나서 context switching이 빈번하게 발생 → 성능 저하
    - **결론** : 스프링 경험자는 없지만, 다섯명 모두 익스프레스 경험자입니다. 각자 프론트/백을 3주안에 구현해야하는 상황이므로 러닝커브가 낮고 과제와 별도로 진행하는 만큼 부담이 적은 Express.js로 진행했습니다.
- MongoDB
    - 데이터 구조가 유연해서, 언제든 요구사항이 바뀔 수 있는 우리 상황에 적합
    - 데이터 변경이 많이 이뤄지지 않기 때문에 적합

## 6. 시스템 아키텍처

![시스템 아키텍처](https://github.com/user-attachments/assets/23cb846c-c604-4bde-83e4-55df4f48f2d1)


## 7. 프로젝트 관리

### 프로젝트 일정

![image](https://github.com/user-attachments/assets/9880759c-7be5-4162-9262-a618d9e6da7c)


### Git flow

- Git-flow 전략을 기반으로 main, dev 브랜치와 feature 브랜치를 운용했습니다.
    - **main** 브랜치는 프로덕션 배포 단계에서만 사용하는 브랜치입니다.
    - **develop** 브랜치는 `main` 브랜치에 모든 변경사항이 병합되기 이전에, 변경사항을 합치는 브랜치 입니다. 모든 작업은 `dev` 브랜치를 기준으로 분기되어 작업되고, 작업 결과는 `dev` 브랜치로 병합합니다.
    - **Feature** 브랜치는 개발할 때에 `dev` 브랜치를 기준으로 `feature/기능이름` 의 형태로 분기하여 작업했습니다.
- Commit Rules
    - 커밋 메시지만으로 어떤 변경사항이 발생했는지 유추하기 위해 커밋 단위를 최소한으로 쪼갰습니다.
    - 커밋 제목은 Gitmoji를 사용하여 좀 더 직관적으로 만들었습니다. VSCode의 Gitmoji를 사용했습니다.
    - Gitmoji를 제외한 커밋의 제목 메세지는 `목적: 상세내용` 의 형태로 작성했습니다.

## 8. 프로젝트 산출물

### 피그마

![image](https://github.com/user-attachments/assets/5b5b03a3-cedf-45e1-892c-050a052ed2c0)


### DB 설계

![디비설계](https://github.com/user-attachments/assets/69b30a5b-20ae-4256-ae89-0cfcf462f783)

### API 문서 - notion

![노션api문서](https://github.com/user-attachments/assets/06fffc85-bcfb-48a6-8b5a-ba3be6edb635)

### API 문서 - swagger

![swagger](https://github.com/user-attachments/assets/55da40de-bba7-4552-ac27-b6e05c3402ed)


### API Rules

1. RESTful API의 기준을 최대한 사용한다.
    1. GET(조회), POST(입력), PUT(전체수정), PATCH(부분수정), DELETE(삭제)
    2. PUT ⇒ key 값을 기준으로 모든 파라미터를 업데이트(그 외는 default 값으로 업데이트), 요청 key값이 없는 경우 Insert
    3. PATCH ⇒ 특정 파라미터만 업데이트 가능, 요청 key값이 없는 경우 오류
2. 정확한 상태코드를 사용한다
    - 200 OK : 요청이 성공했습니다.
    - 201 Created : 요청이 성공했고 결과적으로 새 리소스가 생성되었습니다. (일반적으로 POST요청 또는 일부 PUT요청 후에 전송되는 응답)
    - 204 No Content : 요청에 대해서 보내줄 수 있는 콘텐츠는 없지만, 응답이 정상적으로 이루어졌습니다.
    - 400 Bad Request : 요청을 처리할 수 없거나 처리하지 않을 것입니다. (ex. 잘못된 요청구문, 잘못된 요청메세지 등)
    - 401 Unauthorized : 사용자가 인증되지 않은 상태입니다. (로그인하지 않은 상태)
    - 403 Forbidden : 사용자는 인증되어있지만 해당 요청에 대한 권한이 없습니다.
    - 404 Not Found : 서버가 요청한 리소스를 찾을 수 없습니다.
    - 409 Conflict : 현재 서버의 상태와 충돌됩니다. (이메일 중복체크 등)
    - 500 Internal Server Error : 서버에서 처리방법을 알 수 없는 상황이 발생했습니다.
3. 모든 API는 swagger를 이용하여 문서화 한다.
4. API 접근 권한을 명확히 정리한다.
5. naming 규칙을 준수한다.
    1. 파일명 : kebab-case
    2. 변수, 메소드명 : camelCase (user_id, user_name 등 X)
6. path는 명사로만 표현한다. (행위는 Http Method로 표현)
7. 조회, 수정, 삭제시에 주요 key값(자원의 주체 id)은 path로(/item/:id), 나머지 상세 값들은 query 또는 body로 처리한다.
8. request의 query, param, body는 반드시 util함수인 request-validator를 이용해서 타입검증을 실시한다.

### 기획 명세서

![기획명세서](https://github.com/user-attachments/assets/365d8cbb-9a53-4f53-b2d2-fae062ef80da)

## 9. 팀원별 역할 및 회고

### 팀원별 역할

![8](https://github.com/user-attachments/assets/2002d6a7-4242-4789-8178-72e61e78b8e7)

**🍊 Jikky (김윤직)**

- **UI**
    - 페이지 : 로그인, 회원가입, 회원탈퇴 페이지
    - 공통 컴포넌트 : Button, Input
- **기능**
    - React, Express의 요청/응답 공통 모듈을 초기에 구현하여 팀원 모두가 같은 형식으로 http 통신을 할 수 있게 함
    - 백엔드 개발 및 아키텍처 설계 : CI/CD 자동화 및 무중단 배포
    - [🔗API 쓰로틀링 구현](https://www.notion.so/220931b9c2104b56b29531e2380cc886?pvs=21)
    - 인증 인가 전략 설계 : [🔗silent-refresh & refresh token rotation 적용](https://velog.io/@jikky/JWT-%EC%A0%80%EC%9E%A5-%EC%9C%84%EC%B9%98%EC%99%80-%EC%9D%B8%EC%A6%9D%EC%9D%B8%EA%B0%80-%EC%A0%84%EB%9E%B5RTR)
    - 연관 검색어 정렬 알고리즘 구현
    - API 문서 작성 : swagger & notion
    - 유저 관련 API 개발 : 로컬 / 소셜 로그인 및 회원가입, 회원 탈퇴, Refresh Token API

**👻 Sean (김준호)**

- **UI**
    - 페이지 : 사용자 및 관리자 요청페이지, 등록 및 수정 요청 모달
    - 공통 컴포넌트 : Modal Button, Modal Title
- **기능**
    - DB설계 : MongoDB 스키마 설계 / 다이어그램 작성
    - 요청 목록 필터링 및 정렬 : 요청 상태, 요청 유형별 필터링 및 정렬
    - 모달 인풋 유효성 검사 : 요청 유형 및 인풋 유형 별 유효성 검증
    - 사용자 요청 관련 API 개발 : 요청 목록 조회, 사용자 역할 조회, 사용자 요청 삭제, 사용자 요청 수정, 등록 단어 중복 검사
    - 관리자 요청 관련 API 개발 : 전체 요청 목록 조회, 사용자 요청 상태 변경, 승인 단어 등록

**🐰 Seny (박세은)**

- **UI**
    - 페이지 : 메인 검색페이지, 이용약관/개인정보보호 페이지
    - 공통 컴포넌트 : 헤더, 푸터, 검색 컴포넌트
- **기능**
    - FE 프로젝트 세팅 및 배포
    - 공통 헤더 컴포넌트 로그인 유무별 조건부 렌더링
    - 인증 인가 전략 설계
    - 서버의 부하를 줄이기 위해 디바운싱 적용
    - Figma 디자인 전체 구현
    - API 문서 작성 : swagger & notion
    - 검색 API 개발 : 최근/인기/연관 검색어, 검색결과 API

**😇 Rhea (추연수)**

- **UI**
    - 페이지 : 전체용어 페이지
    - 공통 컴포넌트 : 탑 버튼, 셀렉트 박스
- **기능**
    - 전체 용어 페이지 정렬 : DB 의 용어들을 알파벳 오름차순, 알파벳 내림차순, 인기순, 최신순 으로 정렬
    - 전체 용어 페이지 무한스크롤 : Intersection Observer API 이용
    - 전체 용어 페이지 스크롤 저장 : session storage에 스크롤 위치 저장하여, 다른 페이지로 이동 후 전체 용어 페이지로 돌아오는 경우 스크롤 위치 복구
    - 전체 용어 조회 관련 API 개발 : 전체 용어 목록 조회

**🗺️ True (최진실)**

- **UI**
    - 페이지 : 검색 결과 페이지
    - 공통 컴포넌트 : 탑배너, 하단 모달창
- **기능**
    - 검색 결과 페이지
        - 검색 결과가 있는 경우 그 단어에 대한 결과 페이지 출력 : 일반적인 발음, 어색한 발음, 추가정보, 작성 날짜, 카테고리, 기여자
        - 검색 결과가 없는 경우 등록 요청이 가능한 페이지 출력
    - 수정 요청 API 개발 : 검색 단어에 대한 수정을 요청을 할 수 있는 API 개발, 중복 단어 요청 검사
    - 등록 요청 API 개발 : 없는 단어에 대한 등록 요청을 할 수 있는 API 개발, 중복 단어 요청 검사

### 팀원별 회고

**🍊 Jikky (김윤직)**

초기 목표로 했던 요구사항을 모두 구현하고, 서로 감정 상하는 일 없이 무사히 프로젝트를 마무리 하는 것이 가장 큰 목표였는데, 그것을 이루게 되어서 행복합니다.

프론트엔드 코드를 짜면서 스파게티 코드가 된 부분이 많아서 아쉽습니다. 조금 더 이해하기 쉬운 코드를 짜기 위해 노력하겠습니다. 프로젝트 초기에 공용으로 쓰일 컴포넌트 및 요청/응답 모듈 등을 더 확장성 있게 짯어야 했는데, 그부분도 아쉬움에 남습니다. 다음 프로젝트 부터는 설계에 더 많은 시간을 쏟아야 할 것 같습니다.
2024년 한 해 동안 가장 열심히 살았던 한 달인 것 같습니다. 각자의 팀과 제주도에서 파이널 프로젝트를 하게 될, 앞으로의 3달은 더 열심히 살아야겠지만,팀원 모두 고생했고 함께 해주어 고맙다는 말을 전합니다🧡

---

**👻 Sean (김준호)**

처음 시작할 때는 멀게만 보였던 목표를 이루어서 먼저 매우 기쁩니다. 첫 팀 프로젝트였기에 애정도 많이 가고, 프로젝트 기간 동안 정말 많은 것을 배웠습니다. 혼자서는 할 수 없었던 일들이기에 팀원들에게 정말 고마운 마음을 전하고 싶습니다.

기획 단계에서 떠올랐던 여러 가지 아이디어를 개발 기간과 미숙한 실력으로 인해 모두 구현하지 못한 점이 아쉽습니다. 또한 첫 팀 프로젝트라 구현하는 데 급급하여 트러블슈팅이나 새로 배운 내용, 개발 도중 발생한 이슈들을 체계적으로 기록하지 못한 것도 아쉬운 부분입니다. 다음에 있을 프로젝트 때는 프로젝트 때 있었던 이슈들을 기록하는 것도 신경을 많이 써야할 것 같습니다.

앞으로 있을 파이널 팀 프로젝트에 대한 걱정이 많았는데, 이번 팀 프로젝트를 통해 불안감을 많이 덜 수 있었습니다. 함께 프로젝트를 진행한 팀원들 모두 정말 감사하고 앞으로도 화이팅입니다!

---

**🐰 Seny (박세은)**

팀 프로젝트를 시작하면서 초기 기획 단계에서의 체계적인 설계의 중요성을 깊이 느꼈습니다. 앞으로는 더 체계적이고 효율적으로 프로젝트를 진행할 수 있도록 꾸준히 발전해 나가고 싶습니다. 카카오테크 부트캠프를 수강하면서 짧은 시간에 몰입하여 별도로 팀 프로젝트를 병행하게 되었고, 이를 통해 정말 열심히 몰입하는 경험을 하게 되었습니다. 초기 기획된 기능을 모두 구현하고 프로젝트를 잘 마무리할 수 있어서 매우 기쁩니다.

단순하게 생각했던 이슈들이 반복되며 자잘한 문제들이 발생했는데, 이를 더 디테일하게 정리해놓지 못한 점이 아쉽습니다. 그러나 팀 프로젝트를 통해 개발 과정에서 도전과 고민을 꾸준히 할 수 있었던 점은 매우 긍정적인 경험이었습니다. 팀 프로젝트가 처음인 팀원들도 있었지만, 모두 자신의 목표를 잘 수행해줘서 정말 감사했습니다. 최고의 팀원들과 함께했던 이 경험을 통해 많은 것을 배웠고, 앞으로도 함께 목표를 이뤄나가고 싶습니다. 

---

**😇 Rhea (추연수)**

처음으로 참여한 팀 프로젝트여서 모르는 점도 많고 부족한 점도 많았지만 팀원들 덕분에 해낼 수 있었고, 많은 것을 배울 수 있었습니다. 프로젝트에 대해 경험해 볼 수 있어서 재미있었고 다음 번 프로젝트에선 어떻게 해야할지 방향성을 잡을 수 있을 것 같습니다. 자바스크립트 언어가 익숙한 언어는 아니여서 걱정이 많이 들기도 했었지만, 팀원들과 함께 개발해나가면서 모르는 부분들을 많이 배울 수 있어서 좋았습니다. 

다음 프로젝트에서는 더 많은 역할을 해낼 수 있을 것 같습니다. 프로젝트 기간동안 많은 도움을 주셔서 감사하고, 많이 배웠습니다! 그동안 정말 고생 많으셨습니다. 앞으로도 잘 부탁드립니다!

---

**🌸 True (최진실)**

처음으로 참여한 개발 팀 프로젝트였습니다. 많이 부족하고 모르는 부분이 많았는데, 팀원들 덕분에 많은 것을 배울 수 있었고 개발을 할 수 있었습니다. 
저의 부족한 부분을 파악할 수 있는 아주 중요한 경험이었습니다.
처음 써보는 도구들이 있어서 어려웠지만, 재미있게 배웠습니다. 좀 더 개발을 한 경험이 있는 상태에서 개발을 했다면 더 많은 것을 배울 수 있었던 프로젝트였을 것 같아서 그 부분이 아쉽습니다.
더 발전하여 다음 프로젝트에서는 많은 역할을 맡도록 노력하겠습니다. 
한달동안 부족한 저를 잘 알려주시고 이끌어주셔서 감사합니다. 정말 많은 것을 배워갑니다!
앞으로도 같이 앞으로 나아갑시다! 한달동안 정말 수고 많으셨어요. 우리 꽃길만 걸어요🌸

