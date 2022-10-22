import { useEffect, useState } from "react";
import axios from "axios";

import Card from "./components/Card";
import { ICelebrity } from "./types/Celebrity";

const App = () => {
  const [data, setData] = useState<ICelebrity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nationality = navigator.language.split("-")[0] || "tr";
    const month = new Date().getMonth() + 1;

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
      .then((celebrities) =>
        setData(
          celebrities.filter(
            (celebrity: ICelebrity) =>
              celebrity.birthday.split("-")[1]?.replace(/^0+/, "") ===
              month.toString()
          )
        )
      );
  }, []);

  if (loading)
    return (
      <>
        <h1>Celebrity Birthday</h1>
        <p>loading...</p>
      </>
    );

  return (
    <div className="App">
      <h1>Celebrity Birthday</h1>
      <ul>
        {data.map((celebrity: ICelebrity) => (
          <li key={celebrity.name}>
            <Card info={celebrity} setData={setData} />
          </li>
        ))}
      </ul>
      <div>
        <span>
          {data.length > 1
            ? `${data.length} Celebrities born this month.`
            : `${data.length} Celebrity born this month.`}
        </span>
        <button onClick={() => setData([])}>Clear All</button>
        <button>Create New</button>
      </div>
    </div>
  );
};

export default App;
