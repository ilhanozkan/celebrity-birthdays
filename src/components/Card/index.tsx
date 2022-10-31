import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { ICelebrity, Props } from "../../types/Celebrity";
import { setData } from "../../features/celebrities/celebritiesSlice";
import { RootState } from "../../stores/Celebrities";

const Card: React.FC<Props> = ({ info }) => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.celebrities.value);

  const removeFromList = () => {
    dispatch(
      setData(
        data.filter((celebrity: ICelebrity) => celebrity.name !== info.name)
      )
    );
    localStorage.setItem("celebrities.data", "[]");
  };

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
        <span style={{ fontSize: "1.5rem" }} onClick={removeFromList}>
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
