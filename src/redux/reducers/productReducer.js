let initialState = {
  productList: [], // Home(전체 제품 목록)
  listLoading: false,
  listError: null,
  selectedItem: null, // Detail(단일 제품 상세 페이지)
  singleLoading: false,
  singleError: null
};

function productReducer(state = initialState, action) {
  let { type, payload } = action;
  switch(type) {
    case "GET_PRODUCT_LIST_REQUEST":
      return { ...state, listLoading:true, listError:null};
    case "GET_PRODUCT_LIST_SUCCESS":
      return { ...state, listLoading:false, productList:payload.data};
    case "GET_PRODUCT_LIST_FAILURE":
      return { ...state, listLoading:false, listError:payload.error};
    case "GET_SINGLE_PRODUCT_REQUEST":
      return { ...state, singleLoading:true, singleError:null};
    case "GET_SINGLE_PRODUCT_SUCCESS":
      return { ...state, singleLoading:false, selectedItem:payload.data};
    case "GET_SINGLE_PRODUCT_FAILURE":
      return { ...state, singleLoading:false, singleError:payload.error};
    default:
      return { ...state };
  }
}

export default productReducer;