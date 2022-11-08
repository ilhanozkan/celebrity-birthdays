import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ReactFlagsSelect from "react-flags-select";

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
    <main>
      <h1>Celebrity Birthday</h1>
      <ul>
        {data.map((celebrity: ICelebrity) => (
          <li key={celebrity.name}>
            <Card info={celebrity} />
          </li>
        ))}
      </ul>
      <ReactFlagsSelect
        selected={nationality}
        onSelect={(nat) => changeNationality(nat)}
        countries={nationalities}
      />
      <div>
        <span>
          {data.length > 1
            ? `${data.length} Celebrities were born this month.`
            : `${data.length} Celebrity was born this month.`}
        </span>
        <button onClick={clearAll}>Clear All</button>
        <Link to="/create">
          <button>Create New</button>
        </Link>
        <button onClick={fetchData}>Fetch Again</button>
      </div>
    </main>
  );
};

export default App;
