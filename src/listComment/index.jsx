import React from 'react';

const ListComment = (props) => {
  console.log('ListComment');
  console.log(props.data);
  React.useEffect(() => {
    props.subscribeToNewComments();
  }, [props.subscribeToNewComments, props]);
  if (props.loading) return 'Loading...';
  if (props.error) return `Error! ${props.error.message}`;
  return (
    <div>
      <li>
        {props.data &&
          props.data.findAllCommentHotel.map((item, index) => {
            return (
              <ul key={item.id}>
                content: {item.content} - hotel:{item.hotel.name} - user:
                {item.user.userName}
              </ul>
            );
          })}
      </li>
    </div>
  );
};

export default ListComment;
