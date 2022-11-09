import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactFlagsSelect from "react-flags-select";
import styled from "styled-components";

import Card from "./components/Card";
import { ICelebrity } from "./types/Celebrity";
import { setData } from "./features/celebrities/celebritiesSlice";
import { RootState } from "./stores/Celebrities";

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.celebrities.value);
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

  function fetchData() {
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

  if (loading)
    return (
      <>
        <h1>Celebrity Birthday</h1>
        <p>loading...</p>
      </>
    );

  if (error)
    return (
      <main>
        <h1>Celebrity Birthday</h1>
        <p>Sorry API isn't working :(.</p>
        <button onClick={() => window.location.reload()}>Refresh</button>
      </main>
    );

  return (
    <Main>
      <Header>Celebrity Birthday 🎂</Header>
      <CardList>
        {data.map((celebrity: ICelebrity) => (
          <Card key={celebrity.name} info={celebrity} />
        ))}
      </CardList>
      <FlagSelector>
        <ReactFlagsSelect
          selected={nationality}
          onSelect={(nat) => changeNationality(nat)}
          countries={nationalities}
          searchable
        />
      </FlagSelector>
      <p>
        {data.length > 1
          ? `${data.length} Celebrities were born this month.`
          : `${data.length} Celebrity was born this month.`}
      </p>
      <ListActions>
        <button onClick={clearAll}>🧼 Clear All</button>
        <Link to="/create">
          <button>🧼 Create New</button>
        </Link>
        <button onClick={fetchData}>🧼 Fetch Again</button>
      </ListActions>
    </Main>
  );
};

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.h1`
  font-size: 4rem;
  text-align: center;
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

  * {
    width: 100%;
    height: 2rem;
    background-color: #242424;
    color: white;
    font-size: 1.05rem;
    text-decoration: none;
  }
`;

const FlagSelector = styled.div`
  width: 30rem;
  margin-top: 0.75rem;
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
