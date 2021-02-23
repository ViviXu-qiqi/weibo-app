import { getAccess } from 'actions/account';
import Loading from 'components/Loading';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useDispatch } from 'redux-react-hook';

export const Login = () => {
  const dispatch = useDispatch();
  const { query: { code } } = queryString.parseUrl(window.location.href);
  useEffect(() => {
    code && dispatch(getAccess({ code }));
  }, [code, dispatch]); //code发生变化，就dispatch
  return <Loading tip="登录中，请稍候……" />;
};

export default Login;