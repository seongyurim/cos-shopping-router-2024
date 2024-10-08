import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({item}) => {
  
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const showDetail = () => {
    navigate(`/product/${item.id}`);
  }

  const addCommasToNumber = (num) => {
    let number = (num != null) ? num : 0;
    return number.toLocaleString() + "원";
  }

  return (
    <div
      className="productCard font-sm"
      onClick={showDetail}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="card-image-area">
        <img src={item?.img_d} className={`card-image ${isHovered ? "img-hide" : "img-show"}`}/>
        <img src={item?.img_m} className={`card-image ${isHovered ? "img-show" : "img-hide"}`}/>
        <div className="card-like"><FontAwesomeIcon icon={faHeart} size="lg" className="card-like-icon"/></div>
        <div className="card-tag">
          <div className={`font-sm ${item?.new == true ? "card-new-show" : "card-hidden"}`}>
            {item?.new == true ? "NEW" : ""}
          </div>
          <div className={`font-sm ${item?.best == true ? "card-best-show" : "card-hidden"}`}>
            {item?.best == true ? "BEST" : ""}
          </div>
        </div>
      </div>


      <div className="card-info">
        <div>{item?.title}</div>
        <div>{`${addCommasToNumber(item?.price)}`}</div>
        <div className="card-info-detail">{item?.color.length}색상</div>
        <div className="card-info-detail">{item?.size.length}사이즈</div>
      </div>
    </div>
  );
};

export default ProductCard;
