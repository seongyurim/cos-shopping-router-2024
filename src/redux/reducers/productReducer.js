let initialState = {
  productList: [],
  loading: false,
  error: null
};

function productReducer(state = initialState, action) {
  let { type, payload } = action;
  switch(type) {
    case "GET_PRODUCT_REQUEST":
      return { ...state, loading:true, error:null};
    case "GET_PRODUCT_SUCCESS":
      return { ...state, loading:false, productList:payload.data};
    case "GET_PRODUCT_FAILURE":
      return { ...state, loading:false, error:payload.error};
    default:
      return { ...state };
  }
}

export default productReducer;