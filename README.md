# Project SJG
![image](https://github.com/wecode-bootcamp-korea/47-1st-SujeongGwa-backend/assets/131442242/5566dafb-5223-4c4a-8d16-0d37cef2aab9)



#### \*[aesop](https://www.aesop.com/kr/) 웹사이트를 모델링한 프로젝트입니다.

## 🐱 개발 기간 및 인원

- 개발 기간 : 2023/06/26 ~ 2023/07/07
  
- 개발 인원 : 프론트엔드 2명 , 백엔드 4명
  - Product Manager: 김수정(F)<a href="https://github.com/Kimsu10"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/Kimsu10"/></a>
  - Project Manager: 김상원(B)<a href="https://github.com/Teachsue"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/Teachsue"/></a>
  - Teammates: </br>
서동희(B)<a href="https://github.com/donghee9"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/donghee9"/></a></br>
이주현(B)<a href="https://github.com/sioscorial"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/sioscorial"/></a></br>
정성남(B)<a href="https://github.com/jseongnam"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/jseongnam"/></a></br>
최진이(F)<a href="https://github.com/jjinichoi"><img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white&link=https://github.com/jjinichoi"/></a></br>

- 깃헙 레포지토리
  - [Frontend](https://github.com/wecode-bootcamp-korea/47-1st-SujeongGwa-frontend)
  - [Backend](https://github.com/wecode-bootcamp-korea/47-1st-SujeongGwa-backend)


## 💡 서비스 소개
- 서비스명 : SJG
- 판매상품 : 타일(Porcelain, Walltile, Floortile)
- 고객 : 인테리어에 관심이 많은 개인 구매자, 대리구매를 하는 타일 사업자
- 컨셉
  - 이솝 사이트를 기본 베이스를 하여 친환경에 초첨을 두며 만들었습니다.
  - 이솝 사이트의 레이아웃을 토대로 최대한 비슷하게 만들었으며
실제 사이트를 사용했을때 불편한점을 저희가 기능을 추가하여 사용자의 편의성을 상승시켰습니다.
    

## 💻 구현 기능
|기능|FE|BE|
|---|:---:|:---:|
|회원가입|최진이|서동희| 
|로그인|최진이|이주현| 
|메인페이지|최진이|| 
|상품리스트|최진이|정성남|
|세부상품조회|김수정|정성남|
|데이터베이스관리|ALL|김상원,정성남|
|회원가입email전송|최진이|서동희|
|회원정보, 주문내역 조회|김수정,최진이|서동희|
|장바구니 등록 및 수정|최진이|이주현|  
|상품 결제 및 주문서|김수정|이주현| 
|장바구니 수정 및 삭제|최진이|정성남|


## 📚 기술 스택


### Frontend
|JavaScript|React|esLint|Prettier|
|:---:|:---:|:---:|:---:
| <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/eslint-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/prettier-icon.svg" alt="icon" width="65" height="65" /> |

### Backend

|JavaScript|Node.js|MySQL|
|:---:|:---:|:---:|
| <img src="https://techstack-generator.vercel.app/js-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/nginx-icon.svg" alt="icon" width="65" height="65" /> | <img src="https://techstack-generator.vercel.app/mysql-icon.svg" alt="icon" width="65" height="65" /> </div> |


## ⚙️ 협업툴

<div>
<img src="https://img.shields.io/badge/Git-F05032?style=flat&logo=Git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/Slack-4A154B?style=flat&logo=Slack&logoColor=white"/>
<img src="https://img.shields.io/badge/Trello-0052CC?style=flat&logo=Trello&logoColor=white"/>
<img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white"/>
<img src="https://img.shields.io/badge/VSCode-007ACC?style=flat&logo=Visual Studio Code&logoColor=white"/>
</div>

## 구현기능

# 상품리스트, 세부 상품 조회

- 각 각, sub_category_id가 변경, 상품 이름이 변경 될 때마다, query문을 js에서 실행할 수 있도록, 내 로컬 mysql와 내 로컬 repositiory을 연결한 후, query를 실행해주었습니다. 그리고 그 것으로 추출된 data를 프론트에게 전달, data가 저장되어있는 url도 전달함으로써, 이미지를 띄울 수 있게 하였습니다.

# 데이터베이스관리

- 상원님께서 개인 github에 저장해주신, image 데이터들의 url을 받고, 각각의 data들의 성분을 받아, 자동적으로 데이터들이 개개인의 database 에 들어갈 수 있도록, js로 자동화 코드를 작성하였습니다. 이를 통해, 데이터를 database에 저장하는 시간이 감소되었습니다. 이 데이터들을 모두 github에 올려주신 상원님의 노고에 감사드립니다.

# 장바구니 수정 및 삭제

- 장바구니에 담겨져 있는 data들을, 수정하거나 삭제할 때, patch, delete 를 사용하여 구현하였습니다. 이 과정에서, 프론트엔드와 소통의 중요성을 느끼게 되었습니다. patch 하는 과정에서 맨 처음에 데이터들을 한개만 수정할 수 있도록 구현하였고, 이것으로 인해, 에러핸들링 과정이 길어졌습니다. 그 이후, 데이터들을 여러개 input으로 받을 수 있게 수정하게 되었고(주현님이 도와주셨습니다.), 그로 인해, patch 기능을 완전히 구현하였습니다. 이로 인해, 장바구니 수정 및 삭제를 완전히 구현하였습니다. 