import React from "react";

export const Thumb = (props) => {
  const { selected, index, onClick, image } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <img src={image} alt="" />
      </button>
    </div>
  );
};
