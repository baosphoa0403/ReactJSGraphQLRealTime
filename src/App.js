import './App.css';
import ListComment from './listComment';
import LoginPage from './loginPage';
import React from 'react';
import CreateComment from './CreateComment';
import { gql, useQuery } from '@apollo/client';
import LatestComment, {
  COMMENTS_SUBSCRIPTION,
} from './latestComment/latestComment';
import ReactFacebookLogin from 'react-facebook-login';
function App({ id = '799c2c19-31e1-47d7-a2c5-35a0ebc2d891' }) {
  const COMMENTS_QUERY1 = gql`
    query FindAllCommentHotel($idHotel: String) {
      findAllCommentHotel(id: $idHotel) {
        id
        content
        hotel {
          name
          id
        }
        user {
          userName
        }
      }
    }
  `;
  const { subscribeToMore, ...result } = useQuery(COMMENTS_QUERY1, {
    variables: { idHotel: id },
  });
  const responseFacebook = (response) => {
    console.log(response);
  };
  return (
    <div className='App'>
      <LoginPage />
      <ListComment
        {...result}
        subscribeToNewComments={() =>
          subscribeToMore({
            document: COMMENTS_SUBSCRIPTION,
            variables: { HotelID: '799c2c19-31e1-47d7-a2c5-35a0ebc2d891' },
            updateQuery: (prev, { subscriptionData }) => {
              console.log(prev.findAllCommentHotel);
              console.log(subscriptionData);
              if (!subscriptionData.data) return prev;
              const newFeedItem = subscriptionData.data.commentAdded;
              console.log(prev.findAllCommentHotel.comments);
              return Object.assign({}, prev, {
                findAllCommentHotel: {
                  comments: [newFeedItem, ...prev.findAllCommentHotel.comments],
                },
              });
            },
          })
        }
      />
      <CreateComment />
      <LatestComment hotelID='799c2c19-31e1-47d7-a2c5-35a0ebc2d891' />
      <ReactFacebookLogin
        appId='270408001747066'
        autoLoad={true}
        version='3.1'
        fields='name,email,picture'
        // onClick={componentClicked}
        callback={responseFacebook}
      />
      ,
    </div>
  );
}

export default App;
