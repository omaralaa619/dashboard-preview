import { Star } from "lucide-react";
import React from "react";

const CommentItem = ({ comment }) => {
  return (
    <div className="     bg-neutral-200/60 w-full p-6 rounded-md">
      <div className="flex gap-1 mb-4">
        <Star size={15} fill="#ffb74a" stroke="none" />
        <Star size={15} fill="#ffb74a" stroke="none" />
        <Star size={15} fill="#ffb74a" stroke="none" />
        <Star size={15} fill="#ffb74a" stroke="none" />
        <Star size={15} fill="#ffb74a" stroke="none" />
      </div>
      <p style={{ lineHeight: 3 }}>{comment}</p>
    </div>
  );
};

export default CommentItem;
