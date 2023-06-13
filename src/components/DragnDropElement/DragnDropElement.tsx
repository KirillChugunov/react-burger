import React, { DetailedHTMLProps, FunctionComponent, HTMLAttributes, JSXElementConstructor, LegacyRef, ReactElement, ReactNode, useRef } from "react";
import { DragSourceMonitor, DropTargetHookSpec, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import { Tingredient, TingredientAndUnicID } from "../../services/types/types";

interface IDragnDropElementProps {
  children: ReactNode;
  index: number;
  moveDraggedElements: Function;
  type: string;
  element: TingredientAndUnicID;
}

export const DragnDropElement: FunctionComponent<IDragnDropElementProps> = ({
  children,
  index,
  moveDraggedElements,
  type,
  element,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "dragged",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [spec, dropRef] = useDrop({
    accept: "dragged",
    hover: (item:TingredientAndUnicID, monitor:DropTargetMonitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect: any = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset()!.y - hoverBoundingRect.top;

      // if dragging down, continue only when hover is smaller than middle Y
      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      // if dragging up, continue only when hover is bigger than middle Y
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveDraggedElements(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef<HTMLElement>(null);
  const dragDropRef:any = dragRef(dropRef(ref));
  const opacity = isDragging ? 0 : 1;

  return <div ref={dragDropRef}>{children}</div>;
};
