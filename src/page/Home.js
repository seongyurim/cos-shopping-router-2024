import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingSpinner from '../component/LoadingSpinner';
import ProductCard from '../component/ProductCard';
import Promotion from '../component/Promotion';
import Footer from '../component/Footer';
import { productAction } from "../redux/actions/productAction";

const Home = () => {
  const { productList, listLoading, listError } = useSelector(state => state.product);
  const [query, setQuery] = useSearchParams();
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
      {listLoading ? (
        <LoadingSpinner listLoading={listLoading} />
      ) : (
        <div>
          <Container className="home-container">
            {listError ? (
              <Alert variant="danger" className="error-msg">{listError}</Alert>
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
