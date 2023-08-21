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
    <div className="w-screen min-h-screen flex flex-col justify-start items-center p-4 space-y-4 bg-gray-800 py-8">
      <h1 className="font-bold text-4xl mb-6 container mx-auto text-center text-white">
        COUNTRIES OF THE WORLD! 🌎
      </h1>
      <div className="space-y-4 flex flex-col">
        {/* <select>
          {fetchedData.map((country, index) => (
            <option key={index}>{country.name}</option>
          ))}
        </select> */}
        <button
          onClick={handleFetchedData}
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6 rounded-lg focus:outline-none font-semibold"
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
            className="w-6 h-6 animate-spin mx-auto text-orange-500"
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
            <div className="grid grid-cols-3 gap-y-2 text-white font-semibold">
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
        className="border bg-orange-500 text-white p-2 ml-4 rounded-md hover:bg-orange-600 focus:outline-none transition-all"
      >
        {fetchCountryState === "loading" ? "fetching" : "more info"}
      </button>
    </>
  );
};

const CountryCard = ({ countryData, setFetchCountryState }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800/70">
      <div className="bg-white w-[550px] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Country Information Card</h2>
          <button
            className="hover:underline p-2 text-white focus:outline-none border px-4 bg-gray-800 rounded-md"
            onClick={() => setFetchCountryState("pending")}
          >
            Close
          </button>
        </div>
        <div>
          <p className="font-bold text-xl">
            {countryData[0].name.common} {countryData[0].flag}
          </p>
          <p className="italic text-gray-400/80 text-sm mb-2">
            {countryData[0].name.official}
          </p>
          <p className="text-gray-600 mb-2">
            Capital: {countryData[0].capital}
          </p>
          <p className="text-gray-600 mb-2">
            Continent: {countryData[0].continents[0]}
          </p>
          <p className="text-gray-600 mb-2">
            Population: {countryData[0].population.toLocaleString()} people
          </p>
          <span className="text-gray-600 mb-4">Google Maps: </span>
          <a
            href={countryData[0].maps.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-800 hover:underline"
          >
            {countryData[0].maps.googleMaps}
          </a>
          <div className="border overflow-hidden mt-4">
            <img
              src={countryData[0].flags.svg}
              alt="Flag"
              className="w-full h-auto"
            />
            <p className="text-center py-2 text-2xl">
              Flag of {countryData[0].name.official}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
