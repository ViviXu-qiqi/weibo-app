import { EditOutlined, UserOutlined } from '@ant-design/icons'; //用户图标
import { Affix, Row } from 'antd';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroller'; //无限滚动加载
import { Link } from 'react-router-dom';
import { useDispatch, useMappedState } from 'redux-react-hook';
import { getPublicTimeline } from '../../actions/timeline';
import { LOGIN_URL } from '../../constants';
import CommentsList from './components/commentsList';
import Post from './components/post';
import styles from './index.module.scss';

const mapStateTimeline = state => state.timeline;

export const Home = () => {
  const dispatch = useDispatch();
  const {
    home: { posts = [], page } = {},
    current
  } = useMappedState(mapStateTimeline);
  
  const handleInfiniteOnLoad = () => { 
    dispatch(getPublicTimeline({ page: page + 1 }));
  };

  return (
    <div className={styles.container}>
      <Affix offsetTop={0} >    
        <Row   
          className={styles.appbar} //Affix是固定bar在滑动时依然在顶上的，offsettop是距离顶部的位置，appbar是顶部操作的bar
          justify="space-between"
          align="middle"
        > 
          <a href={LOGIN_URL}><UserOutlined className={styles.icon} /></a>
          <div className={styles.appTitle}>Weibo</div>
          <Link to="/new"><EditOutlined className={styles.icon} /></Link>
        </Row>
      </Affix>
      <InfiniteScroll  //包裹整个列表
        initialLoad  //上来加载
        pageStart={1}
        loadMore={handleInfiniteOnLoad} //滚动到底会触发这个事件
        hasMore //可以一直往下翻
      >
        {
          posts.map(({
            id,
            ...rest
          }) => (
              <div key={id}>
                <Post
                  id={id}
                  isCurrent={current === id}
                  {...rest}
                />
                {
                  current === id &&
                  <CommentsList id={current} />
                }
              </div>
            ))
        }
      </InfiniteScroll>
    </div>
  );
};

export default Home;