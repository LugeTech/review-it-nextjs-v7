import React from "react";
interface iTag {
  tag: string;
}

const TagView = (props: iTag) => {
  return (
    <div>
      <input
        type="checkbox"
        key={props.tag}
        value={props.tag}
        className="w-4"
      />
      {props.tag}
    </div>
  );
};

export default TagView;
