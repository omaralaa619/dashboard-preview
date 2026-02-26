"use client";

import Card from "../../UI/Card";

import classes from "./CollectionTable.module.css";
import { useEffect, useState } from "react";
import SelectOptionsCollection from "./SelectOptionsCollection";
import SearchBar from "../SearchBar";
import ProductTableLoading from "../products/ProductTableLoading";
import CollectionList from "./CollectionList";
import Pagination from "../Pagination";

const CollectionTable = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  ////////// status filter //////////
  const [filter, setFilter] = useState("active");
  const [searchOpen, setSearchOpen] = useState(false);

  //////// selected collections //////////
  const [checkedCollections, setCheckedCollections] = useState([]);

  /////// search value and actual search const /////////
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");

  /////////// pagination variables  //////////////
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/collections/?page=${page}&search=${search}`,
        {
          method: "GET",
        },
      );

      if (response) {
        const data = await response.json();
        setCollections(data.collections);
        setPageCount(data.pageCount);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /////////////// refetch every page or search change /////////
  useEffect(() => {
    setCheckedCollections([]);
    fetchCollections();
  }, [page, search, filter]);

  ///////// inc and dec pages  //////////////////

  const handlePrevious = () => {
    setPage((p) => {
      if (p === 1) return p;
      return p - 1;
    });
  };

  const handleNext = () => {
    setPage((p) => {
      if (p === pageCount) return p;
      return p + 1;
    });
  };

  /////////// search SVG behaviour ///////

  const searchHandler = (e) => {
    if (!searchOpen) {
      setSearchOpen(true);
    } else {
      setSearch(searchValue);
    }

    console.log(search);
  };

  ///////// on submit change search value /////////
  const submitHandler = (e) => {
    e.preventDefault();
    setSearch(searchValue);
    setPage(1);
  };

  const productsId = collections.map((product) => {
    return product._id;
  });

  const allHandler = (e) => {
    if (e.target.checked) {
      setCheckedCollections(productsId);
    } else {
      setCheckedCollections([]);
    }
  };

  const handleCheckboxes = (e) => {
    if (e.target.checked) {
      console.log(e.target.checked);

      setCheckedCollections([...checkedCollections, e.target.value]);
      console.log(checkedCollections);
    } else {
      setCheckedCollections((checkedCollections) =>
        checkedCollections.filter((product) => product !== e.target.value),
      );
    }
  };

  return (
    <Card className={classes.main}>
      <form onSubmit={submitHandler}>
        <div className={classes.top}>
          <div className={classes.cta}>
            <div className={`${classes.buttonsLeft}`}>
              <SelectOptionsCollection
                checkedCollections={checkedCollections}
                fetchCollections={fetchCollections}
                status={filter}
              />
            </div>
          </div>

          <SearchBar
            setSearchOpen={setSearchOpen}
            setSearchValue={setSearchValue}
            searchOpen={searchOpen}
            searchHandler={searchHandler}
          />
        </div>

        {loading && <ProductTableLoading />}

        {!loading && (
          <>
            <CollectionList
              collections={collections}
              handleCheckboxes={handleCheckboxes}
              checkedCollections={checkedCollections}
              allHandler={allHandler}
              setCollections={setCollections}
            />
            {collections.length === 0 && (
              <p className={classes.notFound}>No Collections Found</p>
            )}
          </>
        )}
      </form>
      {/* {!(collections.length === 0) && (
        <Pagination
          page={page}
          pageCount={pageCount}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          setPage={setPage}
        />
      )} */}
    </Card>
  );
};

export default CollectionTable;
