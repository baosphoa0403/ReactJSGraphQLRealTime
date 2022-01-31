import { gql, useMutation } from '@apollo/client';
import React from 'react';

const CreateComment = () => {
  const [comment, setComment] = React.useState('');

  const ADD_COMMENT = gql`
    mutation createComment($content: String, $idHotel: String) {
      createComment(
        createCommentInput: { content: $content, hotelID: $idHotel }
      ) {
        content
      }
    }
  `;
  const [addComment, { data, loading, error }] = useMutation(ADD_COMMENT);
  const handleChange = (e) => {
    // console.log(e.target.value);
    setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('comment', comment);
    addComment({
      variables: {
        content: comment,
        idHotel: '799c2c19-31e1-47d7-a2c5-35a0ebc2d891',
      },
    });
    console.log(data);
    // alert(data);
  };
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  return (
    <div>
      <form  onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder="What's on your mind?"
          name='comment'
          onChange={handleChange}
        />
        <input type='submit' />
      </form>
    </div>
  );
};

export default CreateComment;
