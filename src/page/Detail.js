import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../component/LoadingSpinner';
import { fetchSingleProduct } from '../redux/reducers/productSlice';

const Detail = () => {

  let { id } = useParams();
  const { selectedItem, singleLoading, singleError } = useSelector(state => state.product);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const isAddToCartEnabled = (selectedSize != null) && (selectedColor != null);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(productAction.getProductDetail(id)); // old
    dispatch(fetchSingleProduct(id)); // new
  }, [id, dispatch]);

  const handleColorClick = (idx) => {
    setSelectedColor(idx);
  }

  const handleSizeClick = (idx) => {
    setSelectedSize(idx);
  }

  const addCommasToNumber = (num) => {
    let number = (num != null) ? num : 0;
    return number.toLocaleString() + "원";
  }

  return (
    <div>
      {singleLoading ? (
        <LoadingSpinner singleLoading={singleLoading} />
      ) : (
        <Container className="detail-container">
          {singleError ? (
            <Alert variant="danger" className="error-msg">{singleError}</Alert>
          ) : (
            <Row className="detail-wrapper">
              <Col xs={12} md={12} lg={7} className="img-area">
                <div className="img-area-inner">
                  <img src={selectedItem?.img_d} className="detail-img" />
                  <img src={selectedItem?.img_m} className="detail-img "/>
                  <div className="card-like">
                    <FontAwesomeIcon icon={faHeart} size="lg" className="card-like-icon"/>
                  </div>
                </div>
              </Col>
              <Col xs={12} md={12} lg={5} className="info-area">
                <div className="card-tag">
                  <div className={`font-sm ${selectedItem?.new == true ? "card-new-show" : "card-hidden"}`}>
                    {selectedItem?.new == true ? "NEW" : ""}
                  </div>
                  <div className={`font-sm ${selectedItem?.best == true ? "card-best-show" : "card-hidden"}`}>
                    {selectedItem?.best == true ? "BEST" : ""}
                  </div>
                </div>

                <div className="product-name">{selectedItem?.title}</div>
                <div>{`${addCommasToNumber(selectedItem?.price)}`}</div>

                <div className="color-area">
                  <div className="select-txt">색상</div>
                  <div className="select-boxes">
                    {selectedItem?.color?.map((item, idx) => (
                      <div
                        key={idx}
                        className={`select-box ${selectedColor == idx ? "selected" : ""}`}
                        onClick={() => handleColorClick(idx)}>
                          {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="size-area">
                  <div className="select-txt">사이즈</div>
                  <div className="select-boxes">
                    {selectedItem?.size?.map((item, idx) => (
                      <div
                        key={idx}
                        className={`select-box ${selectedSize == idx ? "selected" : ""}`}
                        onClick={() => handleSizeClick(idx)}>
                          {item}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="select-txt">제품 설명</div>
                <div className="card-desc">{selectedItem?.desc}</div>

                <button
                  className={`add-to-cart-btn ${isAddToCartEnabled ? "enabled" : ""}`}
                  disabled={!isAddToCartEnabled}>
                    {isAddToCartEnabled ? (
                      <>
                        장바구니에 담기
                        <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
                      </>
                        ) : ("색상과 사이즈를 선택해 주세요")}
                </button>
                <div className="card-delivery">
                모든 상품은 무료배송이며 CJ대한통운을 통해 배송됩니다.<br/>
                배송은 영업일 기준 3~5일 소요됩니다. (주말, 공휴일 제외)
                </div>
              </Col>
            </Row>
          )}
        </Container>
      )}
    </div>
  );
};

export default Detail;
