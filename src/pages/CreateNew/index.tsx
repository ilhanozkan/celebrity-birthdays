import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  PlusCircleIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/outline";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import Header from "../../components/Header";
import { setData } from "../../features/celebrities/celebritiesSlice";
import { celebritiesSelector } from "../../stores/Celebrities";

const CreateNew = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const data = useSelector(celebritiesSelector);
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

    toast("🥳 New celebrity added!");
    navigate("/");
  };

  return (
    <Main>
      <Header />
      <Instruction>Please fill out these fields.</Instruction>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="name">Fullname: </Label>
          <Input type="text" id="name" name="name" ref={inputEl} required />
        </Field>
        <Field>
          <Label htmlFor="age">Age: </Label>
          <Input type="number" id="age" name="age" min="0" required />
        </Field>
        <Field>
          <Label>Gender: </Label>
          <Genders>
            <Label htmlFor="female">
              <span>Female </span>
              <input type="radio" id="female" name="gender" value="female" />
            </Label>
            <span> </span>
            <Label htmlFor="male">
              <span>Male </span>
              <input type="radio" id="male" name="gender" value="male" />
            </Label>
          </Genders>
        </Field>
        <Field>
          <Label htmlFor="alive">
            <span>Is alive: </span>
            <Checkbox type="checkbox" value="alive" name="alive" id="alive" />
          </Label>
        </Field>
        <ListButton type="submit">
          <PlusCircleIcon />
          Create New
        </ListButton>
        <Link to="/">
          <Back>
            <ArrowUturnLeftIcon />
            Back to the list.
          </Back>
        </Link>
      </Form>
      <ToastContainer />
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 20rem;
  margin-top: 0.5rem;
`;

const Field = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  padding: 0.8rem 0.6rem;
  font-size: 0.85rem;
  border: 1px solid #171717;
  border-radius: 0.35rem;
  outline-color: #171717;
  flex: 1;
`;

const Checkbox = styled.input`
  margin-left: 4rem;
`;

const Label = styled.label`
  flex: 1;
  font-size: 1.2rem;
`;

const Genders = styled.div`
  display: flex;
  justify-content: space-between;
  width: 12em;
`;

const Instruction = styled.h2`
  margin-top: 0.825rem;
  font-weight: normal;
`;

const ListButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 100%;
  padding-block: 0.35rem;
  background-color: #2c2c2c;
  color: #eaefff;
  font-size: 1.05rem;
  text-decoration: none;
  border-radius: 0.25rem;

  &:active {
    box-shadow: 0px 0px 8px 2px #6b6b6b inset;
  }

  svg {
    width: 1.1rem;
    color: #eaefff;
  }
`;

const Back = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  font-size: 1.025rem;
  color: #171717;
  text-decoration: underline;

  svg {
    width: 1.025rem;
  }
`;

export default CreateNew;
