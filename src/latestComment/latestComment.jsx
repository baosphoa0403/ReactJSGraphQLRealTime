import { gql, useSubscription } from '@apollo/client';

export const COMMENTS_SUBSCRIPTION = gql`
  subscription CommentAdded($HotelID: String!) {
    commentAdded(HotelID: $HotelID) {
      content
      hotel {
        id
      }
      user {
        userName
      }
    }
  }
`;

function LatestComment({ hotelID }) {
  console.log(hotelID);
  const { data, loading, error } = useSubscription(COMMENTS_SUBSCRIPTION, {
    variables: { HotelID: '799c2c19-31e1-47d7-a2c5-35a0ebc2d891' },
  });
  console.log(data);
  //   console.log(loading);
  if (loading) return 'Loading...';
  if (error) return `Error! ${data.error.message}`;
  return (
    <>
      <h4>New comment: {!loading && data.commentAdded.content}</h4>;
    </>
  );
}
export default LatestComment;
