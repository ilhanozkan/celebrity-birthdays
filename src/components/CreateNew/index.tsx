import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setData } from "../../features/celebrities/celebritiesSlice";
import { RootState } from "../../stores/Celebrities";

const CreateNew = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.celebrities.value);

  useEffect(() => {
    inputEl.current!.focus();
  }, []);

  return (
    <main>
      <h1>Celebrity Birthday</h1>
      Please fill this fields.
      <input type="text" ref={inputEl} />
      <Link to="/">
        <button
          onClick={() =>
            dispatch(
              setData([
                ...data,
                {
                  name: "ilhan",
                  birthday: "10.10.2010",
                  age: 10,
                  is_alive: true,
                  gender: "male",
                },
              ])
            )
          }
        >
          Create New
        </button>
      </Link>
    </main>
  );
};

export default CreateNew;
