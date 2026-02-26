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
      <button className={classes.searchButton} onClick={searchHandler}>
        <SearchSVG />
      </button>
      <input
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        className={classes.input}
      />
    </div>
  );
};

export default SearchBar;
