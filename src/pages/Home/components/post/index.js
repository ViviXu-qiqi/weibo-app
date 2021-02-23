import { LikeOutlined, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { setCurrentPost } from 'actions/timeline';
import { Card } from 'antd';
import { APP_URI } from '../../../../constants';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'redux-react-hook';
import styles from './index.module.scss';

export const getPostTitle = (
  user,
  created_at,
  source,
) => (
  <div className={styles.user}>
    <img
      src={user.profile_image_url}
      className={styles.avatar}
      alt={user.screen_name}
    />
    <div className={styles.userInfo}>
      <div>{user.screen_name}</div>
      <div className={styles.extra}>
        {moment(new Date(created_at)).fromNow()} 来自 <span dangerouslySetInnerHTML={{ __html: source }} />
      </div>
    </div>
  </div>
);

const Post = ({
  id,
  text,
  user,
  created_at,
  source,
  pic_urls,
  reposts_count,
  attitudes_count,
  comments_count,
  retweeted_status,
  type,
  isCurrent,
}) => {
  const dispatch = useDispatch();
  const handleClickComment = () => {
    if (!comments_count) {
      window.location.href = `${APP_URI}/comments/${id}`; //没有评论的新页面
    } else {
      dispatch(setCurrentPost({ id: isCurrent ? null : id }));
    }
  };

  return (
    <Card
      type={type}
      className={styles.post}
      bordered={false}
      hoverable
      title={
        getPostTitle(
          user,
          created_at,
          source,
        )
      }
      actions={type ? [] : [
        <div key="retweet">
          <RetweetOutlined />
          <span> {reposts_count || ''}</span>
        </div>,
        <div key="like">
          <LikeOutlined />
          <span> {attitudes_count || ''}</span>
        </div>,
        <div onClick={handleClickComment} key="message">
          <MessageOutlined />
          <span> {comments_count || ''}</span>
        </div>,
      ]}
    >
      <div className={styles.content}>
        <div className={styles.text}>
          {text}
          {
            retweeted_status &&
            <Post type="inner" {...retweeted_status} />  //post的都是转发一条，不需要传key
          }
        </div>
        <ul className={styles.images}>
          {
            pic_urls.map(({ thumbnail_pic }) => (
              <li key={thumbnail_pic} className={styles.imgWrapper}>
                <div className={styles.imgContainer}>
                  <img src={thumbnail_pic}
                    alt={thumbnail_pic}
                    onError={({ currentTarget }) => currentTarget.src = `/${process.env.PUBLIC_URL ? process.env.PUBLIC_URL + '/' : ''}404.svg`}
                  />
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </Card>
  );
};

export default Post;