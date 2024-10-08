import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {

  const footerList = [
    "고객 서비스",
    "매장 찾기",
    "배송 정보",
    "반품 및 환불",
    "결제 정보",
    "지속가능성",
    "협력 업체",
    "다양성 & 포용성",
    "제품 관리",
    "채용 정보",
    "프레스 문의",
    "고객 문의"
  ];

  // 배열 1/2 분할
  const halfwayIndex = Math.ceil(footerList.length / 2);
  const firstHalf = footerList.slice(0, halfwayIndex);
  const secondHalf = footerList.slice(halfwayIndex);

  return (
    <footer className="footer-container">
      <Container>
        <Row>
          <Col xs={12} md={4} lg={3} className="footer-sections footer-logo-area">
            <img className="footer-logo" src="https://cdn.freelogovectors.net/wp-content/uploads/2023/12/cos-logo-freelogovectors.net_.png" alt="COS Logo"/>
          </Col>
          <Col xs={12} md={4} lg={3} className="footer-sections footer-list">
            <div>{firstHalf.map((item, idx) => <li key={idx}>{item}</li>)}</div>
            <div>{secondHalf.map((item, idx) => <li key={idx}>{item}</li>)}</div>
          </Col>
          <Col xs={12} md={4} lg={3} className="footer-sections my-info">
            <li>
              <span className="my-info-sub">Developed</span>
              <span className="my-info-con">성유림</span>
            </li>
            <li>
              <span className="my-info-sub">Contact</span>
              <span className="my-info-con">+82-10-3051-0089</span>
            </li>
            <li>
              <span className="my-info-sub">E-Mail</span>
              <span className="my-info-con">miruyseong@gmail.com</span>
            </li>
            <li>
              <span className="my-info-sub">GitHub</span>
              <span className="my-info-con">
                <a href="https://github.com/seongyurim" target="_blank" className="my-info-link">github.com/seongyurim</a>
              </span>
            </li>
            <li>
              <span className="my-info-sub">Blog</span>
              <span className="my-info-con">
                <a href="https://garrypeggyngowan.tistory.com/" target="_blank" className="my-info-link">garrypeggyngowan.tistory.com</a>
              </span>
            </li>
          </Col>
          <Col xs={12} md={4} lg={3} className="footer-sections my-info my-info-desc">
            <div>이 페이지는 개인 포트폴리오용으로 제작되었습니다.</div>
            <div>This page was created as a personal portfolio and is not intended for commercial use.</div>
            <div>© seongyurim, August 2024</div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;