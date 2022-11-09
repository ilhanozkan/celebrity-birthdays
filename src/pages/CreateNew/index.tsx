import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setData } from "../../features/celebrities/celebritiesSlice";
import { RootState } from "../../stores/Celebrities";

const CreateNew = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.celebrities.value);
  const navigate = useNavigate();

  useEffect(() => {
    inputEl.current!.focus();
  });

  const handleSubmit = (e: any) => {
    const target = e.target.elements;
    e.preventDefault();

    if (!target.name.value.trim() || !target.age.value) return;

    dispatch(
      setData([
        ...data,
        {
          name: target.name.value,
          birthday: "",
          age: target.age.value,
          is_alive: target.alive.checked,
          gender: target.gender.value,
        },
      ])
    );

    navigate("/");
  };

  return (
    <main>
      <h1>Celebrity Birthday</h1>
      <p>Please fill these fields.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Fullname: </label>
          <input type="text" id="name" name="name" ref={inputEl} />
        </div>
        <div>
          <label htmlFor="age">Age: </label>
          <input type="number" id="age" name="age" />
        </div>
        <div>
          <label htmlFor="female">
            <span>Female </span>
            <input type="radio" id="female" name="gender" value="female" />
          </label>
          <span> </span>
          <label htmlFor="male">
            <span>Male </span>
            <input type="radio" id="male" name="gender" value="male" />
          </label>
        </div>
        <div>
          <label htmlFor="alive">
            <span>Is alive: </span>
            <input type="checkbox" value="alive" name="alive" id="alive" />
          </label>
        </div>
        <button type="submit">Create New</button>
        <Link to="/">
          <p>🔙 Back to the list.</p>
        </Link>
      </form>
    </main>
  );
};

export default CreateNew;
