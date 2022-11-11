import { useEffect, useState, CSSProperties } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactFlagsSelect from "react-flags-select";
import styled from "styled-components";
import { PuffLoader } from "react-spinners";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";

import SwipeToDelete from "react-swipe-to-delete-component";
import "./styles/swipe-to-delete.css";

import Card from "./components/Card";
import Header from "./components/Header";
import { ICelebrity } from "./types/Celebrity";
import { setData } from "./features/celebrities/celebritiesSlice";
import { celebritiesSelector, newCreatedSelector } from "./stores/Celebrities";
import { setNewCreated } from "./features/celebrities/newCreatedCelebritySlice";

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector(celebritiesSelector);
  const newCreated = useSelector(newCreatedSelector);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const nationalityFromBrowser = navigator.language.split("-")[0].toUpperCase();
  const [nationality, setNationality] = useState<string>(
    localStorage.getItem("celebrities.nationality") ||
      nationalityFromBrowser ||
      "TR"
  );
  const nationalities = [
    "TR",
    "US",
    "DE",
    "AU",
    "AR",
    "AZ",
    "ES",
    "UA",
    "BR",
    "CA",
    "NL",
  ].sort();
  const month = new Date().getMonth() + 1;

  const spinOverride: CSSProperties = {
    margin: "3rem",
  };

  useEffect(() => {
    if (localStorage.getItem("celebrities.data")) {
      dispatch(
        setData(JSON.parse(localStorage.getItem("celebrities.data") || ""))
      );
      setLoading(false);
    } else fetchData();
  }, [nationality]);

  useEffect(() => {
    localStorage.setItem("celebrities.nationality", nationality);
  }, [nationality]);

  useEffect(() => {
    if (data.length > 0)
      localStorage.setItem("celebrities.data", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (newCreated) {
      console.log("duplicate", newCreated);
      toast("🥳 New celebrity added!");
      dispatch(setNewCreated(false));
    }
  }, [setNewCreated]);

  function fetchData() {
    setLoading(true);
    axios({
      method: "get",
      url: `https://api.api-ninjas.com/v1/celebrity?nationality=${nationality}`,
      headers: {
        "X-Api-Key": process.env.REACT_APP_API_KEY,
      },
    })
      .then((res) => {
        setLoading(false);
        return res.data;
      })
      .then((celebrities) => {
        dispatch(
          setData(
            celebrities.filter(
              (celebrity: ICelebrity) =>
                celebrity.birthday?.split("-")[1]?.replace(/^0+/, "") ===
                month.toString()
            )
          )
        );
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }

  const changeNationality = (newNationality: string) => {
    setNationality(newNationality);
    setLoading(true);
    localStorage.setItem("celebrities.data", "");
  };

  const clearAll = () => {
    dispatch(setData([]));
    localStorage.setItem("celebrities.data", "[]");
  };

  const deleteFromList = (item: ICelebrity) => {
    dispatch(
      setData(
        data.filter((celebrity: ICelebrity) => celebrity.name !== item.name)
      )
    );
    localStorage.setItem("celebrities.data", "[]");
  };

  if (error)
    return (
      <main>
        <Header />
        <Error>Error</Error>
        <ErrorMsg>Sorry API isn't working 😔.</ErrorMsg>
        <ListButton onClick={() => window.location.reload()}>
          <ArrowPathIcon />
          Refresh
        </ListButton>
      </main>
    );

  if (loading)
    return (
      <Main>
        <Header />
        <PuffLoader cssOverride={spinOverride} size="5rem" />
        <ListButton onClick={fetchData}>
          <ArrowPathIcon />
          Fetch Again
        </ListButton>
      </Main>
    );

  return (
    <Main>
      <Header />
      <CardList>
        {data.map((celebrity: ICelebrity) => (
          <SwipeToDelete
            key={celebrity.name}
            onDelete={() => deleteFromList(celebrity)}
            deleteSwipe={0.25}
          >
            <Card key={celebrity.name} info={celebrity} />
          </SwipeToDelete>
        ))}
      </CardList>
      <FlagSelector>
        <ReactFlagsSelect
          selected={nationality}
          onSelect={(nat: string) => changeNationality(nat)}
          countries={nationalities}
          searchable
        />
      </FlagSelector>
      <CelebritiesLength>
        {data.length > 1
          ? `${data.length} Celebrities were born this month.`
          : `${data.length} Celebrity was born this month.`}
      </CelebritiesLength>
      <ListActions>
        <ListButton onClick={clearAll}>
          <TrashIcon />
          Clear All
        </ListButton>
        <Link to="/create">
          <ListButton>
            <PlusCircleIcon />
            Create New
          </ListButton>
        </Link>
        <ListButton onClick={fetchData}>
          <ArrowPathIcon />
          Fetch Again
        </ListButton>
      </ListActions>
      <ToastContainer />
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListActions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 30rem;
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

const Error = styled.h2`
  font-size: 2rem;
`;

const ErrorMsg = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const CelebritiesLength = styled.p`
  margin-block: 1rem;
  font-size: 1.1rem;
`;

const FlagSelector = styled.div`
  width: 30rem;
  margin-top: 1.2rem;
  box-shadow: 11px 15px 23px -17px rgba(41, 41, 41, 0.5);

  div {
    padding-bottom: 0;
  }

  button {
    border: none;
    background-color: #ffffffca;
    border: 1px solid #171717;
    border-radius: 0.35rem;
    transition: background-color 120ms ease-in;
    color: #171717;

    &::after {
      border-top: 5px solid #171717;
    }

    &:hover {
      background-color: #ffffff;
    }
  }
`;

export default App;
