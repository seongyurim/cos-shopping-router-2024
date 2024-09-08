import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Promotion = () => {

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const showPromotion = (event) => {
    let keyword = event.currentTarget.textContent;
    console.log("showPromotion with: " + keyword);
    navigate(`?category=${keyword}`);
  }

  return (
    <div>
      <Container className="promotion-container">
        <Row>
          <Col xs={12} md={12} lg={6}>
            <div className="promotion-img-area">
              <div className="promotion-title" onClick={(event) => showPromotion(event)}>여성 신상품</div>
              <img
                className="promotion-img"
                src="https://syr-cos.netlify.app/promotion-women.jpg"
                alt="Women Promotion"
              />
              <div className="promotion-overlay"></div>
            </div>
          </Col>
          <Col xs={12} md={12} lg={6}>
            <div className="promotion-img-area">
              <div className="promotion-title" onClick={(event) => showPromotion(event)}>남성 신상품</div>
              <img
                className="promotion-img"
                src="https://syr-cos.netlify.app/promotion-men.jpg"
                alt="Men Promotion"
              />
              <div className="promotion-overlay"></div>
            </div>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Promotion;
