import React from "react";
import { useDrop } from "react-dnd";

export const DropTarget = (props) => {
  const [, dropRef] = useDrop({
    accept: "sauce",
    drop(item) {
      props.onDropHandler(item);
    },
  });

  return (
    <div ref={dropRef}>
      <p>ssssssss</p>
    </div>
  );
};

export default DropTarget;
