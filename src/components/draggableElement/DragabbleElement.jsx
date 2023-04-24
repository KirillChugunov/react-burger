import React from "react";
import { useDrag } from "react-dnd";

export const DraggableElement = ({ element, children }) => {
  const { _id, type } = element;
  const [{ isDrag }, dragRef] = useDrag({
    type: `${type}`,
    item: { ...element },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return <div ref={dragRef}>{children}</div>;
};
