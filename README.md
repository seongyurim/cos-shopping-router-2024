![Header](https://capsule-render.vercel.app/api?type=rect&color=0f0f0f&text=COS&desc=코스%20제품%20데이터를%20저장하고%20JSON%20서버로%20처리한%20쇼핑몰%20앱&section=header&height=250&fontColor=ffffff&fontSize=60&fontAlignY=45&descAlignY=67&descSize=30)
<br><br>

## 📍프로젝트 소개
코스(COS) 제품 데이터를 저장하고 JSON 서버로 처리하는 쇼핑몰 앱 프로젝트입니다. 리덕스 및 리덕스 툴킷을 사용하여 상태 관리를 최적화하고, 비동기 작업을 통해 사용자 요청에 따라 데이터를 실시간으로 처리합니다.

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
- **리덕스 기반 상태관리**: 리덕스 툴킷을 이용해 더욱 효율적으로 상태를 관리합니다.
- **컴포넌트 세분화**: 구조를 페이지별 및 기능별로 구분하여 독립적인 컴포넌트로 구성합니다.
- **제품 카테고리화 및 검색**: 사용자가 제품을 쉽게 찾을 수 있도록 카테고리별로 분류하고 검색 기능을 제공합니다.
- **리다이렉션**: 특정 페이지를 보호하기 위해 로그인 여부를 기준으로 페이지를 리다이렉션합니다.
- **반응형 설계**: 다양한 디바이스에서도 동일한 사용자 경험이 가능하도록 반응형 레이아웃을 직접 설계합니다.

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
- 이는 실제 사이트에서 로그인한 회원만 회원정보를 수정하는 페이지로 이동할 수 있는 것과 같습니다.
- 인증 슬라이스에 있는 `authenticate`가 `false`이면 로그인 페이지로 유도합니다.
- 반면 `authenticate`가 `true`이면 상세페이지에 정상적으로 접근할 수 있습니다.
- 리다이렉트를 도와주는 컴포넌트 `Navigate`를 함께 사용하여 라우팅 시스템을 구현합니다.

### 2) 그외 주요 컴포넌트
#### 2-1) NavBar
- 검색: 키워드를 쿼리 파라미터에 넣어 검색 결과를 업데이트합니다.
- 카테고리 버튼: 카테고리명을 쿼리 파라미터에 넣어 상품 목록을 필터링합니다.
- 로그인 버튼: 로그인이 되어 있지 않으면 '로그인'으로, 반대이면 '로그아웃'으로 나타납니다.
- 내비게이션 고정: 스크롤이 어느정도 내려가면 내비게이션의 하단부터 고정됩니다.
- 햄버거 메뉴: 디바이스 너비가 작아지면 햄버거 메뉴가 나타나고 클릭하면 `width` 상태가 250으로 변합니다.
- 사이드 메뉴: 0이었던 너비가 위의 클릭 이벤트로 인해 250이 되어 디스플레이됩니다.

#### 2-2) Promotion
- 홈페이지 상단에 나타나는 프로모션 배너입니다.
- 검색어나 카테고리 키워드가 있는 경우에는 나타나지 않습니다.
- 개별 배너를 클릭하면 각각 연결되어 있는 카테고리 메뉴로 이동할 수 있습니다.
- URL에 해당 카테고리를 키워드 파라미터로 추가하여 결과를 보여줍니다.

#### 2-3) ProductCard
- 서버에 저장되어 있는 상품들을 하나씩 보여주는 카드 컴포넌트입니다.
- 기본 이미지는 제품 사진이며, 영역을 호버하면 제품을 착용한 모델 사진을 보여주어 다양한 시각적 정보를 제공합니다.
- 특정 제품을 클릭하면 그 제품의 id가 URL의 쿼리 파라미터로 추가되어 상세페이지로 이동합니다.
- 카드 내용으로는 사진, 제품명, 색상 및 사이즈 개수가 있습니다.


## 📍코드 구조 개선
### 1) 비동기 작업 개선
#### 1-1) [Redux-Thunk](https://github.com/reduxjs/redux-thunk)
![Redux-Thunk](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FZY8UA%2FbtsI6Q8nduy%2F5X7e0sSp2WKkKIljwXbweK%2Fimg.jpg)
- Redux와 함께 사용되는 미들웨어 라이브러리의 일종으로, 비동기 작업을 처리할 수 있도록 도와줍니다.
- 액션 생성자가 함수를 반환할 수 있게 해주며, 이 함수는 비동기 작업을 수행한 후 상태를 업데이트할 수 있습니다.
- 기존 코드를 redux-thunk 버전으로 바꾸면서 비동기 작업을 redux action 파일 내부로 이동시킵니다.
- 액션 내부에서 비동기 작업이 이루어진 후에 상태가 업데이트됩니다.
- 기존 코드를 분리했던 위치에는 디스패치 구문만 남습니다.
- 이렇게 Redux-Thunk를 활용하면 비동기 작업을 간편하게 관리하고 애플리케이션의 상태를 일관되게 유지할 수 있습니다.

#### 1-2) [createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)
- Redux-Thunk 코드 역시 더욱 깔끔하게 정리할 수 있도록 도와주는 리덕스 툴킷의 함수입니다.
- API를 호출할 때 반드시 필요한 pending(요청), fulfilled(성공), rejected(실패) 케이스를 제공합니다.
- 또한 기존에 분리되어 있던 action, reducer 파일을 slice로 결합하여 관리하도록 하는 공식을 제안합니다.
- `createSlice`에 정의된 리듀서는 두 가지 케이스로 구분할 수 있습니다.
	- `reducers`: 내부에서 dispatch되는 액션을 처리합니다.
 	- `extraReducers`: 외부(ex: createAsyncThunk)에서 발생하는 비동기 액션을 처리합니다.

### 2) 상태 관리 및 스토어 구성
#### 2-1) [combineReducers](https://lunit.gitbook.io/redux-in-korean/recipes/structuringreducers/usingcombinereducers)
```
export default combineReducers({
  auth: authenticateReducer,
  product: productReducer
});
```
- 현재 프로젝트처럼 리듀서를 컨셉 별로 구별하여 여러개의 파일을 구성했을 때 필요한 유틸리티입니다.
- `store`에 복수의 리듀서를 등록하기 위해 index.js파일을 생성하여 리듀서를 결합합니다.
- 이렇게 결합한 리듀서를 `store`에 `rootReducer`로 수입해와서 적용합니다.
- 앞으로 `useSelector`를 통해 상태를 가져올 때에는 이때 정의한 리듀서의 key를 사용해야 합니다.
 
#### 2-2) [createSlice](https://redux-toolkit.js.org/api/createSlice)
```
const productSlice = createSlice({
  name:"product",
  initialState,
  reducers:{
    getAllProducts(state, action) {
      state.productList = action.payload.data;
    },
    getSingleProduct(state, action) {
      state.selectedItem = action.payload.data;
    }
  }
});
```
- 리듀서의 복잡한 정의(if or switch문 사용, 유니크한 케이스명 설정 등)를 개선해주는 함수입니다.
- createSlice는 아래와 같은 세개의 values가 필요합니다.
	- `name`: slice에 대한 이름으로, 유니크한 액션명을 만드는데 name의 value가 prefix로 사용됩니다.
	- `initialState`: 처음에 정의해두었던 객체를 그대로 사용합니다.
	- `reducers`: 기존 로직을 함수로 재구성합니다. 이제는 번거로운 return문과 ..state 구문을 생략할 수 있습니다.

#### 2-3) [configureStore](https://redux-toolkit.js.org/api/configureStore)
```
const store = configureStore({
  reducer:{
    auth: authenticateSlice,
    product: productSlice
  }
})
```
- 리덕스 버전이 업그레이드됨에 따라 더이상 createStore를 지원하지 않게 되면서 대안으로 나타난 함수입니다.
- 올드 리덕스에서는 네 가지 요소(`combineReducer`, `thunk`, `applyMiddleware`, `composedWithDevTools`)를 store에 반드시 수입해와서 구성해야 했습니다.
- 하지만 configureStore는 이 네 가지 요소를 모두 포함하기 때문에 기존 코드를 대체할 수 있습니다.
- 기존에 combineReducer를 별도의 파일로 생성했던 것도 삭제하여 코드를 간소화할 수 있게 됩니다.



## 📍Json Server
```
{
  "posts": [
    { "id": "1", "title": "a title", "views": 100 },
    { "id": "2", "title": "another title", "views": 200 }
  ],
  "comments": [
    { "id": "1", "text": "a comment about post 1", "postId": "1" },
    { "id": "2", "text": "another comment about post 1", "postId": "1" }
  ],
  "profile": {
    "name": "typicode"
  }
}
```
```
json-server --watch db.json --port 4000
```
- 홈페이지에서 보여줄 데이터들을 어디에 저장하고 불러올 것인지 정해야 합니다.
- 개인 프로젝트용, 즉 소규모 데이터를 저장하기 편리한 [Json Server](https://www.npmjs.com/package/json-server/v/0.17.0)에 데이터를 저장하기로 합니다.
- 프로젝트의 루트 디렉토리에 `db.json`을 생성하여 데이터를 json 형식으로 입력합니다.
- 기존 포트번호와 겹치지 않는 넘버(ex: 4000)를 지정하여 서버를 동작시킬 수 있습니다.
