import React from "react";

import { ICelebrity, Props } from "../../types/Celebrity";

const Card: React.FC<Props> = ({ info, setData }) => {
  return (
    <article>
      <div
        style={{
          width: "20rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2 style={{ textTransform: "capitalize" }}>{info.name}</h2>
        <span
          style={{ fontSize: "1.5rem" }}
          onClick={() =>
            setData((data: ICelebrity[]) =>
              data.filter(
                (celebrity: ICelebrity) => celebrity.name !== info.name
              )
            )
          }
        >
          x
        </span>
      </div>
      <p>{info.age} years</p>
      <p>
        Is
        {info.gender &&
          (info.gender === "male"
            ? " he "
            : info.gender === "female" && " she ")}
        alive: {info.is_alive ? "Yes" : "No 😔"}
      </p>
    </article>
  );
};

export default Card;
