import { data } from "autoprefixer";
import { Fragment, useState } from "react";

function App() {
  // pending, loading, success ,error
  const [fetchAllCountryState, setFetchAllCountryState] = useState("pending");
  const [fetchedData, setfetchedData] = useState(undefined);

  const handleFetchedData = () => {
    // console.log("fetch");
    setFetchAllCountryState("loading");
    fetch(
      "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setfetchedData(data);
        setFetchAllCountryState("success");
      })
      .catch((error) => {
        console.log(error);
        setFetchAllCountryState("error");
      });
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-start items-center p-4 space-y-4">
      <h1 className="font-bold">Countries of the world</h1>
      <div className="space-y-4 flex flex-col">
        {/* <select>
          {fetchedData.map((country, index) => (
            <option key={index}>{country.name}</option>
          ))}
        </select> */}
        <button
          onClick={handleFetchedData}
          className="bg-zinc-800 text-gray-200 border border-zinc-700 rounded-lg py-2 px-6 hover:bg-zinc-700 focus:outline-none font-semibold"
        >
          fetch list of countries
        </button>
        {fetchAllCountryState === "loading" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 animate-spin text-orange-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        )}

        {fetchAllCountryState === "success" &&
          fetchedData &&
          Array.isArray(fetchedData) && (
            <div className="grid grid-cols-3 gap-y-2">
              {fetchedData.map((country, index) => (
                <Row country={country} key={index} index={index} />
              ))}
            </div>
          )}
        {fetchAllCountryState === "error" && (
          <p className="text-red-600">Oh no! Error encountered!</p>
        )}
      </div>
    </div>
  );
}

const Row = ({ country, index }) => {
  const [fetchCountryState, setFetchCountryState] = useState("pending");
  const [fetchedData, setfetchedData] = useState(undefined);
  const handleKnowMore = (country) => {
    console.log(country);
    setFetchCountryState("loading");
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setfetchedData(data);
        setFetchCountryState("success");
      })
      .catch((error) => {
        setFetchCountryState("error");
      });
  };
  return (
    <>
      {fetchCountryState === "success" && fetchedData && (
        <CountryCard
          setFetchCountryState={setFetchCountryState}
          countryData={fetchedData}
        />
      )}
      <span>{index + 1}</span>
      <span>{country.name}</span>
      <button
        onClick={() => {
          handleKnowMore(country.name);
        }}
        className="border bg-orange-500 text-white p-2 ml-4 rounded-md"
      >
        {fetchCountryState === "loading" ? "Fetching" : "More info"}
      </button>
    </>
  );
};

const CountryCard = ({ countryData, setFetchCountryState }) => {
  return (
    <div className="w-screen min-h-screen fixed top-0 left-0 flex justify-center items-center bg-orange-300/10">
      <div className="bg-white w-[400px] p-2">
        <div className="flex justify-between">
          <span>Info</span>
          <span
            className="underline text-blue-400 cursor-pointer"
            onClick={() => setFetchCountryState("pending")}
          >
            close
          </span>
        </div>
        <div>{JSON.stringify(countryData, null, 4)}</div>
      </div>
    </div>
  );
};

export default App;
