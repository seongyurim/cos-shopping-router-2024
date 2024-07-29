import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from "react-bootstrap";
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom';
import Footer from '../component/Footer';

const Home = () => {

  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const [error, setError] = useState("");

  const filterProducts = (data, category) => {
    switch (category) {
      case "신상품":
        return data.filter(product => product.new === true);
      case "베스트":
        return data.filter(product => product.best === true);
      case "S/S 데님 컬렉션":
        return data.filter(product => product.title.includes("데님"));
      case "여성":
        return data.filter(product => product.gender === true);
      case "남성":
        return data.filter(product => product.gender === false);
      case "탑/재킷":
        return data.filter(product => product.title.includes("재킷") ||
                                      product.desc.includes("셔츠"));
      case "트라우저":
        return data.filter(product => product.title.includes("트라우저"));
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
      let response = await fetch(url);
      let data = await response.json();

      console.log("카테고리 필터링 전 데이터 배열: " + data);

      // 카테고리 필터링
      if (categoryQuery) {
        data = filterProducts(data, categoryQuery);
      }

      if (data.length < 1) {
        if (searchQuery != "") {
          setError(`${searchQuery}와 일치하는 상품이 없습니다.`);
        }
        else {
          throw new Error("결과가 없습니다.");
        }
      }
      setProductList(data);
    }
    catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    getProducts();
  }, [query]);

  return (
    <div>
      <Container className="home-container">
        {error ? (
          <Alert variant="danger" className="error-msg">{error}</Alert>
        ) : (
        <Row>
          {productList.length > 0 &&
           productList.map((item) => (
            <Col xs={12} md={6} lg={4}>
              <ProductCard item={item}/>
            </Col>
          ))}
        </Row>
        )}
      </Container>
      <Footer />      
    </div>
  );
};

export default Home;
