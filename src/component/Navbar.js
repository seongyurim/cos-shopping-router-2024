import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({authenticate, setAuthenticate}) => {
  const menuList = [
    "신상품",
    "베스트",
    "S/S 데님 컬렉션",
    "여성",
    "남성",
    "탑/재킷",
    "트라우저",
    "백",
    "슈즈"
  ];

  const [width, setWidth] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const goToLogin = () => {
    if (!authenticate) {
      navigate('/login');
    }
    else {
      alert("로그아웃되었습니다.");
      setAuthenticate(false);
      navigate('/');      
    }
  }

  const search = (event) => {
    if (event.key === "Enter") {
      // 1. 사용자가 입력한 검색어를 읽어온다.
      let keyword = event.target.value;
      // 2. url을 바꿔준다.
      navigate(`?q=${keyword}`);
      // 3. 검색을 마쳤으니 input 상자에서 키워드를 삭제한다.
      setSearchKeyword("");
    }
  }

  const handleScroll = () => {
    if (window.scrollY > 80) {
      setIsScrolled(true);
    }
    else {
      setIsScrolled(false);
    }
  }

  const getCategory = (event) => {
    let keyword = event.target.textContent;
    navigate(`?category=${keyword}`);
    setWidth(0);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="navi">
      <div className="navi-wrapper">
        <div
          className={`dark-overlay ${width > 0 ? "active" : ""}`}
          onClick={() => setWidth(0)}></div>
        <div className="side-menu" style={{width: width}}>
          <button className='side-close' onClick={() => setWidth(0)}>&times;</button>
          <div className="side-menu-list">{menuList.map(menu => <div onClick={(event) => getCategory(event)}>{menu}</div>)}</div>
        </div>

        <div className="navi-top">
          <Link to ="/">
          <img className="logo" src="https://cdn.freelogovectors.net/wp-content/uploads/2023/12/cos-logo-freelogovectors.net_.png" alt="COS Logo" />
          </Link>
        </div>

        <div className={`navi-btm ${isScrolled ? "navi-fix" : ""}`}>
          <div className="burger-menu">
            <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
          </div>
          <ul className="menu-list">
            <li className={`logo-small-area ${isScrolled ? "" : "logo-small-hide"}`}>
              <Link to ="/">
              <img className="logo-small" src="https://cdn.freelogovectors.net/wp-content/uploads/2023/12/cos-logo-freelogovectors.net_.png" alt="COS Logo" />
              </Link>
            </li>
            {menuList.map(menu => <li onClick={(event) => getCategory(event)}>{menu}</li>)}
          </ul>
          <div className="navi-btm-right">
            <div className="search-bar">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
              <input type="text" className="navi-search" placeholder="제품 탐색" value={searchKeyword} onChange={(event) => setSearchKeyword(event.target.value)} onKeyDown={(event) => search(event)} />
            </div>
            <div className="login-box" onClick={goToLogin}>
              <FontAwesomeIcon icon={faUser} className="login-icon"/>
              <span>
                {authenticate ? "로그아웃" : "로그인"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
