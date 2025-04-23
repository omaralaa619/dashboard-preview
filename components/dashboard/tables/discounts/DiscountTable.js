"use client";
import React, { useEffect, useState } from "react";
import DiscountsEmpty from "../../discounts/DiscountsEmpty";
import Card from "../../UI/Card";

import classes from "./DiscountTable.module.css";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";
import SelectOptions from "../SelectOptions";
import Skeleton from "../../UI/Skeleton";
import DiscountList from "./DiscountList";
import SelectOptionsDiscounts from "../SelectOptionsDiscounts";

const DiscountTable = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  ////// status filter ///////
  const [filter, setFilter] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);

  ////// selected orders //////
  const [checkedDiscounts, setCheckedDiscounts] = useState([]);

  /////// search value and actual search const /////////
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");

  /////////// pagination variables  //////////////
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  ////////////  fetching discounts //////////
  const fetchDiscounts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/discounts/?page=${page}&search=${search}&status=${filter}`,
        {
          method: "GET",
        }
      );

      if (response) {
        const data = await response.json();
        setDiscounts(data.discounts);
        setPageCount(data.pageCount);

        console.log(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCheckedDiscounts([]);
    fetchDiscounts();
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

  const discountsId = discounts.map((order) => {
    return order._id;
  });
  const allHandler = (e) => {
    if (e.target.checked) {
      setCheckedDiscounts(discountsId);
    } else {
      setCheckedDiscounts([]);
    }
  };

  const handleCheckboxes = (e) => {
    if (e.target.checked) {
      console.log(e.target.checked);

      setCheckedDiscounts([...checkedDiscounts, e.target.value]);
      console.log(checkedDiscounts);
    } else {
      setCheckedDiscounts((checkedDiscounts) =>
        checkedDiscounts.filter((discount) => discount !== e.target.value)
      );
    }
  };

  return (
    <>
      <Card className={classes.main}>
        <form onSubmit={submitHandler}>
          <div className={classes.top}>
            <div className={classes.cta}>
              <div className={`${classes.buttonsLeft}`}>
                <SelectOptionsDiscounts
                  checkedOrders={checkedDiscounts}
                  fetchOrders={fetchDiscounts}
                  setCheckedOrders={setCheckedDiscounts}
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

          {loading && <Skeleton rows={10} />}

          {discounts.length != 0 && !loading && (
            <>
              <DiscountList
                discounts={discounts}
                handleCheckboxes={handleCheckboxes}
                checkedDiscounts={checkedDiscounts}
                allHandler={allHandler}
              />
            </>
          )}
          {discounts.length == 0 && !loading && <DiscountsEmpty />}
        </form>
        {discounts.length != 0 && !loading && (
          <Pagination
            page={page}
            pageCount={pageCount}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            setPage={setPage}
          />
        )}
      </Card>
    </>
  );
};

export default DiscountTable;
