import { useDrop } from "react-dnd";
import { FunctionComponent } from "react";

interface IDropTargetProps {
  onDropHandler: Function;
}

export const DropTarget: FunctionComponent<IDropTargetProps> = ({
  onDropHandler,
}) => {
  const [, dropRef] = useDrop({
    accept: "sauce",
    drop(item) {
      onDropHandler(item);
    },
  });

  return (
    <div ref={dropRef}>
      <p></p>
    </div>
  );
};

export default DropTarget;
