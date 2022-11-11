import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { XCircleIcon } from "@heroicons/react/24/outline";

import { ICelebrity, Props } from "../../types/Celebrity";
import { setData } from "../../features/celebrities/celebritiesSlice";
import { celebritiesSelector } from "../../stores/Celebrities";

const Card: React.FC<Props> = ({ info }) => {
  const dispatch = useDispatch();
  const data = useSelector(celebritiesSelector);

  const deleteFromList = () => {
    dispatch(
      setData(
        data.filter((celebrity: ICelebrity) => celebrity.name !== info.name)
      )
    );
    localStorage.setItem("celebrities.data", "[]");
  };

  return (
    <Container>
      <Image
        draggable="false"
        src={`./images/${info.gender}.png`}
        alt={info.name}
      />
      <Info>
        <Top>
          <Name>{info.name}</Name>
          <RemoveButton onClick={deleteFromList}>
            <XCircleIcon />
          </RemoveButton>
        </Top>
        <Bottom>
          <p>{info.age} years</p>
          <p>
            Is
            {info.gender &&
              (info.gender === "male"
                ? " he "
                : info.gender === "female" && " she ")}
            alive: {info.is_alive ? "Yes" : "No 😔"}
          </p>
        </Bottom>
      </Info>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  padding-inline: 1rem;
  padding-block: 0.825rem;
  margin-top: 1rem;
  width: 30rem;
  background-color: #ffffffca;
  border-radius: 0.5rem;
  border: 1px solid #171717;
  transition: background-color 150ms ease-in;
  box-shadow: 17px 22px 27px -17px rgba(41, 41, 41, 0.5);
  cursor: pointer;

  &:hover {
    background-color: #ffffff;
  }
`;

const Info = styled.article`
  margin-left: 1rem;
  width: 100%;
`;

const Image = styled.img`
  margin: 0.5rem;
  width: 4rem;
  height: 4rem;
`;

const Name = styled.h2`
  text-transform: capitalize;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Bottom = styled.div``;

const RemoveButton = styled.button`
  width: 2rem;
  margin-top: 0.2rem;
  margin-right: 0.2rem;
  background: none;
  outline: none;
  border: none;
`;

export default Card;
