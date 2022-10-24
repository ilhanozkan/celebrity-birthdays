import { useEffect, useState } from "react";
import axios from "axios";

import Card from "./components/Card";
import { ICelebrity } from "./types/Celebrity";

const App = () => {
  const [data, setData] = useState<ICelebrity[]>([]);
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
      setData(JSON.parse(localStorage.getItem("celebrities.data") || ""));
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
        setData(
          celebrities.filter(
            (celebrity: ICelebrity) =>
              celebrity.birthday?.split("-")[1]?.replace(/^0+/, "") ===
              month.toString()
          )
        );
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }

  const changeNationality = (e: any) => {
    setNationality(e.target.value);
    setLoading(true);
    localStorage.setItem("celebrities.data", "");
  };

  const clearAll = () => {
    setData([]);
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
            <Card info={celebrity} setData={setData} />
          </li>
        ))}
      </ul>
      <select onChange={changeNationality} value={nationality}>
        {nationalities.map((nat: string) => (
          <option key={nat} value={nat}>
            {nat}
          </option>
        ))}
      </select>
      <div>
        <span>
          {data.length > 1
            ? `${data.length} Celebrities born this month.`
            : `${data.length} Celebrity born this month.`}
        </span>
        <button onClick={clearAll}>Clear All</button>
        <button>Create New</button>
        <button onClick={fetchData}>Fetch Again</button>
      </div>
    </main>
  );
};

export default App;
