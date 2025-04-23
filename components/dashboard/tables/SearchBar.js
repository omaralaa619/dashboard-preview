import { motion } from "framer-motion";

import classes from "./SearchBar.module.css";
import SearchSVG from "@/svgs/SearchSVG";
import CloseX from "@/svgs/CloseX";

const SearchBar = ({
  searchHandler,
  searchOpen,
  setSearchOpen,
  setSearchValue,
}) => {
  return (
    <div className={classes.search}>
      <input
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        className={classes.input}
      />

      <button className={classes.searchButton} onClick={searchHandler}>
        <SearchSVG />
      </button>
    </div>
  );
};

export default SearchBar;
