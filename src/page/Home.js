import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from '../component/ProductCard';
import { useSearchParams } from 'react-router-dom';

const Home = () => {

  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();

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
        return data.filter(product => product.title.includes("재킷") || product.desc.includes("셔츠"));
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

  // API 호출(검색)
  const getProducts = async() => {
    let searchQuery = query.get('q') || "";
    // console.log("searchQuery: " + searchQuery);
    let categoryQuery = query.get('category') || "";
    // console.log("categoryQuery: " + categoryQuery);
    let url = `http://localhost:4000/products/?q=${searchQuery}&category=${categoryQuery}`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log("data: " + data);

    // 카테고리 필터링
    if (categoryQuery) {
      data = filterProducts(data, categoryQuery);
    }

    setProductList(data);
  }

  useEffect(() => {
    getProducts();
  }, [query]);

  return (
    <div>
      <Container className="home-container">
        <Row>
          {productList.map((item) => (
            <Col xs={12} md={6} lg={3}>
              <ProductCard item={item}/>
            </Col>
          ))}
        </Row>
      </Container>
      
    </div>
  );
};

export default Home;
