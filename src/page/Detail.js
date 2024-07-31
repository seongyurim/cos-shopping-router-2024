import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Detail = () => {

  let {id} = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const isAddToCartEnabled = selectedSize != null && selectedColor != null;

  const getProductDetail = async() => {
    let url = `https://my-json-server.typicode.com/seongyurim/cos-shopping-router-2024/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    // console.log("data: " + data);
    setProduct(data);
  }

  useEffect(() => {
    getProductDetail();
  }, []);

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
      <Container className="detail-container">
        <Row className="detail-wrapper">
          <Col xs={12} md={12} lg={7} className="img-area">
            <img src={product?.img_d} className="detail-img"/>
            <img src={product?.img_m} className="detail-img"/>
          </Col>
          <Col xs={12} md={12} lg={5} className="info-area">
            <div className="card-tag">
              <div className={`font-sm ${product?.new == true ? "card-new-show" : "card-hidden"}`}>
                {product?.new == true ? "NEW" : ""}
              </div>
              <div className={`font-sm ${product?.best == true ? "card-best-show" : "card-hidden"}`}>
                {product?.best == true ? "BEST" : ""}
              </div>
            </div>

            <div className="product-name">{product?.title}</div>
            <div>{`${addCommasToNumber(product?.price)}`}</div>

            <div className="color-area">
              <div className="select-txt">색상</div>
              <div className="select-boxes">
                {product?.color.map((item, idx) => (
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
                {product?.size.map((item, idx) => (
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
            <div className="card-desc">{product?.desc}</div>

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
      </Container>
    </div>
  );
};

export default Detail;
