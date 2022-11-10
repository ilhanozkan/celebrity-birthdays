import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Header from "../../components/Header";
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
          age: target.age.value < 0 ? 0 : target.age.value,
          is_alive: target.alive.checked,
          gender: target.gender.value,
        },
      ])
    );

    navigate("/");
  };

  return (
    <Main>
      <Header />
      <Instruction>Please fill out these fields.</Instruction>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Fullname: </label>
          <input type="text" id="name" name="name" ref={inputEl} required />
        </div>
        <div>
          <label htmlFor="age">Age: </label>
          <input type="number" id="age" name="age" min="0" required />
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
        <ListButton type="submit">Create New</ListButton>
        <Link to="/">
          <p>🔙 Back to the list.</p>
        </Link>
      </form>
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Instruction = styled.h2`
  margin-top: 0.825rem;
  font-weight: normal;
`;

const ListButton = styled.button`
  width: 100%;
  padding-block: 0.35rem;
  background-color: #2c2c2c;
  color: white;
  font-size: 1.05rem;
  text-decoration: none;
  border-radius: 0.25rem;

  &:active {
    box-shadow: 0px 0px 8px 2px #6b6b6b inset;
  }
`;

export default CreateNew;
