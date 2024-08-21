import React from 'react';
import { Container } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingSpinner = (loading) => {
  return (
    <div>
      <Container className="home-container loading-spinner-area">
        <ClipLoader color="#888" loading={loading} size={50} className="loading-spinner"/>
        <div className="loading-spinner-txt">잠시만 기다려주세요</div>
      </Container>
    </div>
  )
};

export default LoadingSpinner;
