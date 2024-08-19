function getProducts(searchQuery, categoryQuery) {
  return async (dispatch) => {
    dispatch({type:"GET_PRODUCT_REQUEST"}); // 로딩 시작

    try {
      let url = `https://my-json-server.typicode.com/seongyurim/cos-shopping-router-2024/products?q=${searchQuery}&category=${categoryQuery}`;
      let response = await fetch(url);
      let data = await response.json();

      if (categoryQuery) {
        data = filterProducts(data, categoryQuery);
      }

      if (data.length < 1) {
        throw new Error(
          searchQuery
            ? `${searchQuery}(와)과 일치하는 상품이 없습니다.`
            : "결과가 없습니다."
        );
      }

      dispatch({type:"GET_PRODUCT_SUCCESS", payload:{data}}); // 성공
    }
    catch (error) {
      dispatch({type:"GET_PRODUCT_FAILURE", payload:{error:error.message}}); // 실패
    }
  };
};

const filterProducts = (data, category) => {
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

export const productAction = { getProducts };