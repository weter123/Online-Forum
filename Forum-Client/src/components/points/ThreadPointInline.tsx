import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./ThreadPoints.css";
import { gql, useMutation } from "@apollo/client";
import useUpdateThreadPoint from "../../hooks/useUpdateThreadPoints";
const UpdateThreadItemPoint = gql`
  mutation UpdateThreadItemPoint(
    $threadItemId: ID! 
    $increment: Boolean!) {
    updateThreadItemPoint(
      threadItemId: $threadItemId, 
      increment: $increment)
  }
`;
class ThreadPointsInLineProps {
  points: number = 0;
  threadId ?: string;
  threadItemId?: string;
  allowUpdatePoints?: boolean = false;
  refreshThread?: () => void;
}

const ThreadPointsInline: FC<ThreadPointsInLineProps> = ({
  points,
  threadId,
  threadItemId,
  allowUpdatePoints,
  refreshThread
}) => {
  const [execUpdateThreadItemPoint] = useMutation(UpdateThreadItemPoint);
  const {onClickDecThreadPoint, onClickIncThreadPoint} = useUpdateThreadPoint(
    refreshThread,
    threadId
  );

  const onClickIncThreadItemPoint = async (
    e:React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log( " ThreadId: ", threadItemId );
    await execUpdateThreadItemPoint({
      variables: {
        threadItemId,
        increment: true,
      }
    });
    refreshThread && refreshThread();
  }

  const onClickDecThreadItemPoint = async (
    e:React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.preventDefault();
    await execUpdateThreadItemPoint({
      variables: {
        threadItemId,
        increment: false,
      }
    });
    refreshThread && refreshThread();
  }

  return (
    <span className="threadpointsinline-item">
      <div
        className="threadpointsinline-item-btn"
        style={{ display: `${allowUpdatePoints? "block" : "none"}` }}
      >
        <FontAwesomeIcon
          icon={faChevronUp}
          className="point-icon"
          onClick={threadId ? onClickIncThreadPoint : onClickIncThreadItemPoint}
        />
      </div>
      {points}
      <div
        className="threadpointsinline-item-btn"
        style={{ display: `${allowUpdatePoints ? "block" : "none"}` }}
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          className="point-icon"
          onClick={threadId ? onClickDecThreadPoint : onClickDecThreadItemPoint}
        />
      </div>
      <div className="threadpointsinline-item-btn">
        <FontAwesomeIcon icon={faHeart} className="points-icon" />
      </div>
    </span>
   
  );
};

export default ThreadPointsInline;