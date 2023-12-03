import React from "react";

const CommentCard = ({ comment }) => {
  return (
    <div className="w-ful text-white border-b-2" key={comment._id}>
      <div className="m-3">
        <div className="">
          <p className="">{comment.author.nameAuthor}</p>
        </div>
        <p className="">{comment.description}</p>
      </div>
    </div>
  );
};

export default CommentCard;
