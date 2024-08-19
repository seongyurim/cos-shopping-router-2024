import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from "react-bootstrap";
import ProductCard from '../component/ProductCard';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Footer from '../component/Footer';
import ClipLoader from "react-spinners/ClipLoader";
import Promotion from '../component/Promotion';
import { productAction } from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const { productList, loading, error } = useSelector(state => state.product);
  const [query, setQuery] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let searchQuery = query.get('q') || "";
    let categoryQuery = query.get('category') || "";
    dispatch(productAction.getProducts(searchQuery, categoryQuery));
  }, [query, dispatch]);

  const hasCategoryQuery = query.get('category') != null;
  const hasSearchQuery = query.get('q') != null;
  const showPromotion = !hasCategoryQuery && !hasSearchQuery;

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
                {showPromotion && (
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
