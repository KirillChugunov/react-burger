import React, { FunctionComponent, ReactNode } from "react";
import { useDrag } from "react-dnd";
import PropTypes from "prop-types";
import { TingredientAndUnicID } from "../../services/types/types";

interface IDraggableElementProps {
  element: TingredientAndUnicID;
  children: ReactNode;
}

export const DraggableElement: FunctionComponent<IDraggableElementProps> = ({
  element,
  children,
}) => {
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
