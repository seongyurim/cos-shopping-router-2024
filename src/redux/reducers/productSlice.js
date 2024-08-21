import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

let initialState = {
  productList: [], // Home(전체 제품 목록)
  listLoading: false,
  listError: null,
  selectedItem: null, // Detail(단일 제품 상세 페이지)
  singleLoading: false,
  singleError: null
};

export const fetchProducts = createAsyncThunk(
  'product/fetchAll',
  async ({ searchQuery, categoryQuery }, thunkApi) => {
    try {
      let url = `https://my-json-server.typicode.com/seongyurim/cos-shopping-router-2024/products`;

      if (searchQuery || categoryQuery) {
        url += `?`;
        if (searchQuery) {
          url += `q=${searchQuery}`;
        }
        if (categoryQuery) {
          url += `category=${categoryQuery}`;
        }
      }

      let response = await fetch(url);
      let data = await response.json();

      if (categoryQuery) {
        data = filterProducts(data, categoryQuery);
      }

      return data;
    }
    catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

function filterProducts(data, category) {
  switch (category) {
    case "여성 신상품":
      return data.filter(product => product.gender == true &&
                                    product.new == true);
    case "남성 신상품":
      return data.filter(product => product.gender == false &&
                                    product.new == true);
    case "신상품":
      return data.filter(product => product.new === true);
    case "베스트":
      return data.filter(product => product.best === true);
    case "데님 컬렉션":
      return data.filter(product => product.title.includes("데님"));
    case "여성":
      return data.filter(product => product.gender === true);
    case "남성":
      return data.filter(product => product.gender === false);
    case "탑/재킷":
      return data.filter(product => product.title.includes("재킷") ||
                                    product.title.includes("가디건") ||
                                    product.desc.includes("셔츠"));
    case "트라우저":
      return data.filter(product => product.title.includes("트라우저"));
    case "스커트":
      return data.filter(product => product.title.includes("스커트") ||
                                    product.title.includes("드레스"));
    case "백":
      return data.filter(product => product.title.includes("백"));
    case "슈즈":
      return data.filter(product => product.title.includes("슈즈"));
    default:
      return data;
  }
};

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingle',
  async (id, thunkApi) => {
    try {
      let url = `https://my-json-server.typicode.com/seongyurim/cos-shopping-router-2024/products/${id}`;
      let response = await fetch(url);

      if(!response.ok) {
        throw new Error("제품을 불러오는 중에 오류가 발생했습니다.");
      }

      return await response.json();
    }
    catch (error) {
      thunkApi.rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name:"product",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.listLoading = true;
        state.listError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.productList = action.payload;
        state.listLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.listLoading = false;
        state.listError = action.payload;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleLoading = true;
        state.singleError = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.selectedItem = action.payload;
        state.singleLoading = false;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.singleLoading = false;
        state.singleError = action.payload;
      })
  }
});

export default productSlice.reducer; // 리듀서 내보내기

