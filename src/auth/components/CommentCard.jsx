import React from "react";

const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card" key={comment._id}>
      <h3>{comment.author.nameAuthor}</h3>
      <p>{comment.description}</p>
    </div>
  );
};

export default CommentCard;
