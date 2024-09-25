![Header](https://capsule-render.vercel.app/api?type=rect&color=0f0f0f&text=COS&desc=코스%20제품%20데이터를%20저장하고%20JSON%20서버로%20처리한%20쇼핑몰%20앱&section=header&height=250&fontColor=ffffff&fontSize=60&fontAlignY=45&descAlignY=67&descSize=30)
<br><br>

## 📍프로젝트 소개
현재 위치 또는 주요 도시의 날씨 정보를 API로 실시간 제공하는 리액트 기반 날씨 앱 미니 프로젝트입니다. 리덕스를 사용해 전역 상태를 관리하며, 컴포넌트 간 데이터를 효율적으로 공유하고 UI를 일관되게 업데이트합니다.

## 📍개발기간
2024.07.22 ~ 08.05 (2주)

## 📍기술스택
<div>
	<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
	<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
	<img src="https://img.shields.io/badge/Redux Thunk-76B83F?style=for-the-badge&logo=redux&logoColor=white">
	<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
	<img src="https://img.shields.io/badge/Json Server-000000?style=for-the-badge&logo=json&logoColor=white">
	<img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white">
	<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white"> 
	<img src="https://img.shields.io/badge/API Call-E3695F?style=for-the-badge&logoColor=white"> 
</div>

## 📍주요기능

## 📍상세기능
### 1) 페이지 컴포넌트
#### 1-1) Home
```
dispatch(fetchProducts({ searchQuery, categoryQuery }));
```
- 홈페이지가 로드되면 로딩스피너가 나타났다가 서버에 저장된 모든 제품 데이터가 렌더링됩니다.
- 검색어(`searchQuery`)가 있거나 카테고리를 선택한 경우(`categoryQuery`)는 URL에 쿼리가 추가되어 특정 제품만을 렌더링합니다.
- **`useSearchParams`**: URL의 쿼리 파라미터값을 가져오는 리액트 훅입니다. 이를 통해 위의 쿼리값들을 알아냅니다.
- 검색어나 카테고리를 지정하지 않은 경우는 홈페이지 상단에 프로모션 배너가 나타납니다.

#### 1-2) Detail
```
dispatch(fetchSingleProduct(id));
```
- 사용자가 선택한 제품의 id값을 `useParams`로 읽어와 디스패치합니다.
- **`useParams`**: URL의 파라미터 값을 객체로 가져오는 리액트 훅입니다.
- 해당 id를 가진 제품의 상세정보를 확인할 수 있는 페이지로 이동합니다.
- 그전에 로그인되지 않았다면 `PrivateRoute`로 인해 로그인 페이지로 이동합니다.
- 색상과 사이즈를 선택해야 장바구니 담기 버튼이 활성화됩니다.

#### 1-3) Login
```
dispatch(authenticateActions.loginSuccess({id, password}));
```
- 사용자가 아이디와 비밀번호를 입력하면 이는 지역 상태로 저장되었다가 디스패치됩니다.
- 그리고 리듀서를 통해 `authenticate`값이 true로 변경되어 로그인되어 있는 상태로 변합니다.
- 상품 상세정보를 확인하기 전에 거쳐야 하는 페이지입니다.

#### 1-4) PrivateRoute
```
return authenticate == true ? <Detail /> : <Navigate to="/login" />;
```
- 페이지를 보호하기 위한 리다이렉션 컴포넌트입니다.
- 현재 앱에서 구현하기 위해 '사용자는 로그인하지 않으면 상세페이지를 확인할 수 없다'는 로직을 설정하였습니다.
- 이는 로그인한 회원만 회원정보를 수정하는 페이지로 이동할 수 있는 것과 같습니다.
- 인증 슬라이스에 있는 `authenticate`가 `false`이면 로그인 페이지로 유도합니다.
- 반면 `authenticate`가 `true`이면 상세페이지에 정상적으로 접근할 수 있습니다.
- 리다이렉트를 도와주는 컴포넌트 `Navigate`를 함께 사용하여 라우팅 시스템을 구현합니다.
