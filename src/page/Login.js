import React, { useState } from 'react';
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authenricateAction } from '../redux/actions/authenticateAction';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const loginUser = (event) => {
    event.preventDefault();
    dispatch(authenricateAction.login(id, password));
    navigate('/');
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-title">로그인</div>
        <div className="login-guide font-sm">제품 상세정보는 로그인 후에 확인할 수 있습니다.</div>
        <Form onSubmit={(event) => loginUser(event)}>
          <Form.Group>
            <Form.Label className="login-txt font-sm">
              아이디*
            </Form.Label>
            <Form.Control
              type="text"
              className="login-inputs"
              placeholder="ID"
              onChange={(event) => setId(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="login-txt font-sm">
              비밀번호*
            </Form.Label>
            <Form.Control
              type="password"
              className="login-inputs"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Button type="submit" className="login-btn font-sm">
            로그인
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
