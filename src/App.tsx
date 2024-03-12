import { useState } from "react";
// import { allCountries } from "country-region-data";
import "./App.css";

interface CountryItem {
  name: string;
  checked: boolean;
  countryCode: string;
}

// Mock all countries array
const allCountries = [
  ["India", "IN"],
  ["USA", "US"],
  ["France", "FR"],
];

// Generate a map object to facilitate the access to the country data
const countryMap = new Map(
  allCountries.map((country) => [
    country[1],
    { name: country[0], checked: false, countryCode: country[1] },
  ])
);

function App() {
  // Append the country data to the state
  const [countries, setCountries] =
    useState<Map<string, CountryItem>>(countryMap);

  // Handle when a single country is selected
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const countryCode = e.target.value;
    setCountries((prevCountries) => {
      const newCountriesMap = new Map(prevCountries);
      const country = newCountriesMap.get(countryCode);
      if (country) {
        newCountriesMap.set(countryCode, {
          ...country,
          checked: !country.checked,
        });
      }
      return newCountriesMap;
    });
  };

  // Handle when all countries are selected
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setCountries((prevCountries) => {
      const newCountriesMap = new Map(prevCountries);
      newCountriesMap.forEach((country) => {
        country.checked = isChecked;
      });
      return newCountriesMap;
    });
  };

  const countriesArray = [...countries.values()];

  // Check if all countries are selected (for select all checkbox)
  const isCheckedAll = countriesArray.every(
    (country: CountryItem) => country.checked
  );

  return (
    <>
      <h1>Country List</h1>
      <ul className="unstyled-list text-align-left">
        <li>
          <input
            type="checkbox"
            value="all"
            name="all"
            id="id-all"
            checked={isCheckedAll}
            onChange={handleSelectAll}
          />
          <label htmlFor="id-all">Select All</label>
        </li>
        {countriesArray.map((country) => (
          <li key={country.countryCode}>
            <input
              type="checkbox"
              value={country.countryCode}
              name={country.name}
              id={`id-${country.countryCode}`}
              checked={country.checked}
              onChange={handleCheck}
            />
            <label htmlFor={`id-${country.countryCode}`}>{country.name}</label>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
