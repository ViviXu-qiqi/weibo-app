import Loading from 'components/Loading';
import { Route, Switch } from 'react-router-dom';
import React, { lazy, Suspense } from 'react'; //页面的按需加载 Suspense载入容器 原始的会一次性加载好



const Home = lazy(() => import('../pages/Home'));//动态引入
const Login = lazy(() => import('../pages/Login'));
const New = lazy(() => import('../pages/New'));

const Router = () => (
  <Suspense
    fallback={<Loading />}
  >
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/new" component={New} />
      <Route exact path="/comments/:id" component={New} />
    </Switch>
  </Suspense>
);


export default Router;