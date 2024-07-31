import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from "react-bootstrap";
import ProductCard from '../component/ProductCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../component/Footer';
import ClipLoader from "react-spinners/ClipLoader";
import Promotion from '../component/Promotion';

const Home = () => {

  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
  }

  // API 호출
  const getProducts = async() => {
    try {
      let searchQuery = query.get('q') || "";
      let categoryQuery = query.get('category') || "";
      let url = `https://my-json-server.typicode.com/seongyurim/cos-shopping-router-2024/products?q=${searchQuery}&category=${categoryQuery}`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();

      console.log("카테고리 필터링 전 데이터 배열: " + data);

      // 카테고리 필터링
      if (categoryQuery) {
        data = filterProducts(data, categoryQuery);
      }

      if (data.length < 1) {
        if (searchQuery != "") {
          setError(`${searchQuery}(와)과 일치하는 상품이 없습니다.`);
        }
        else {
          throw new Error("결과가 없습니다.");
        }
      }
      setProductList(data);
      setLoading(false);
    }
    catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getProducts();
  }, [query]);

  const hasCategoryQuery = query.get('category') != null;

  return (
    <div>
      {loading ? (
        <Container className="home-container loading-spinner-area">
          <ClipLoader color="#888" loading={loading} size={50} className="loading-spinner"/>
          <div className="loading-spinner-txt">잠시만 기다려주세요</div>
        </Container>
      ) : (
        <div>
          <Container className="home-container">
            {error ? (
              <Alert variant="danger" className="error-msg">{error}</Alert>
            ) : (
              <div>
                {!hasCategoryQuery && (
                  <div>
                    <Row><Promotion /></Row>
                    <Row className="home-intro">지금 바로 COS의 고유한 컬렉션을 탐험해보세요</Row>
                  </div>
                )}
                <Row>
                  {productList.length > 0 &&
                  productList.map((item) => (
                    <Col xs={12} md={6} lg={4}>
                      <ProductCard item={item}/>
                    </Col>
                  ))}
                </Row>

              </div>
            )}
          </Container>
          <Footer />
        </div>   
      )}
    </div>
  );
};

export default Home;
