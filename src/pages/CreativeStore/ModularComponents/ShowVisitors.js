import { Fragment, useCallback, useMemo } from "react";
import { showDisplayName } from "../../../utils/functions/global";
import Avatar from "react-avatar";

const ShowVisitor = (props) => {
  return useMemo(
    () => (
      <div className="creative-store-visitor-user cursor-pointer">
        <Avatar
          style={{ cursor: "pointer" }}
          size={40}
          round={true}
          title={showDisplayName(props.value)}
          name={showDisplayName(props.value)}
        />
        <div className="creative-store-visitor-user-text-container">
          <label className="light-color cursor-pointer">
            {showDisplayName(props.value)}
          </label>
          <small>
            {props.value.details &&
              props.value.details.statusMessage}
          </small>
        </div>
      </div>
    ),
    [props.value]
  );
};

const ShowVisitors = (props) => {
  // generate display name
  // render the visitors
  const render = useCallback(
    () => (
      <Fragment>
        <div className="creative-store-scrollable-visitor-container">
          {props.datas &&
            Object.entries(props.datas).map(
              ([key, obj]) => {
                return (
                  <ShowVisitor
                    key={`creative-store-visitor-user-${key}`}
                    value={obj}
                  />
                );
              }
            )}
        </div>
      </Fragment>
    ),
    [props.datas]
  );
  // return the memoized render function
  return render();
};

export default ShowVisitors;
