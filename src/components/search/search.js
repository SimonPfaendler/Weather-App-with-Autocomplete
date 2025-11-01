import { AsyncPaginate } from "react-select-async-paginate";
import { useState } from "react";
import { GEO_API_URL, geoApiOptions } from "../../api";

const Search = ({ onSearchChange, theme }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    if (!inputValue) return { options: [] };

    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${encodeURIComponent(inputValue)}`,
        geoApiOptions
      );

      const result = await response.json();

      return {
        options: result.data.map((city) => ({
          value: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        })),
      };
    } catch (error) {
      console.error("Error fetching city data:", error);
      return { options: [] };
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
      borderColor: state.isFocused 
        ? (theme === "dark" ? "#4ea8ff" : "#1e90ff")
        : (theme === "dark" ? "#334155" : "#cccccc"),
      color: theme === "dark" ? "#e6eef8" : "#0f172a",
      boxShadow: state.isFocused ? (theme === "dark" ? "0 0 0 1px #4ea8ff" : "0 0 0 1px #1e90ff") : "none",
    }),
    input: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#e6eef8" : "#0f172a",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#94a3b8" : "#666666",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#e6eef8" : "#0f172a",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
      borderColor: theme === "dark" ? "#334155" : "#cccccc",
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? theme === "dark" ? "#334155" : "#e0e0e0"
        : state.isFocused
        ? theme === "dark" ? "#334155" : "#f5f5f5"
        : theme === "dark" ? "#1e293b" : "#ffffff",
      color: theme === "dark" ? "#e6eef8" : "#0f172a",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#e6eef8" : "#0f172a",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: theme === "dark" ? "#334155" : "#cccccc",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: theme === "dark" ? "#e6eef8" : "#0f172a",
    }),
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
      styles={customStyles}
    />
  );
};

export default Search;

