"use client";
import React, { useEffect, useState } from "react";
import DiscountsEmpty from "../../discounts/DiscountsEmpty";
import Card from "../../UI/Card";

import classes from "./NewsletterTable.module.css";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";
import SelectOptions from "../SelectOptions";
import Skeleton from "../../UI/Skeleton";

import SelectOptionsDiscounts from "../SelectOptionsDiscounts";
import NewsletterList from "./NewsletterList";
import { useRouter } from "next/navigation";

const NewsletterTable = () => {
  const router = useRouter();
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  ////// status filter ///////
  const [filter, setFilter] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);

  ////// selected orders //////
  const [checkedNewsletters, setCheckedNewsletters] = useState([]);

  /////// search value and actual search const /////////
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");

  /////////// pagination variables  //////////////
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  ////////////  fetching discounts //////////
  const fetchNewsletters = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/newsletter/?page=${page}&search=${search}&status=${filter}`,
        {
          method: "GET",
        }
      );

      if (response) {
        const data = await response.json();
        setNewsletters(data.newsletters);
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
    setCheckedNewsletters([]);
    fetchNewsletters();
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

  const NewsletterIds = newsletters.map((order) => {
    return order._id;
  });
  const allHandler = (e) => {
    if (e.target.checked) {
      setCheckedNewsletters(NewsletterIds);
    } else {
      setCheckedNewsletters([]);
    }
  };

  const handleCheckboxes = (e) => {
    if (e.target.checked) {
      console.log(e.target.checked);

      setCheckedNewsletters([...checkedNewsletters, e.target.value]);
      console.log(checkedNewsletters);
    } else {
      setCheckedNewsletters((checkedNewsletters) =>
        checkedNewsletters.filter((discount) => discount !== e.target.value)
      );
    }
  };

  return (
    <>
      <Card className={classes.main}>
        <form onSubmit={submitHandler}>
          <div className={classes.top}>
            <div className={classes.cta}>
              <div className={`${classes.buttonsLeft} opacity-0`}>
                <SelectOptionsDiscounts
                  checkedOrders={checkedNewsletters}
                  fetchOrders={fetchNewsletters}
                  setCheckedOrders={setCheckedNewsletters}
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

          {newsletters.length != 0 && !loading && (
            <>
              <NewsletterList
                newsletters={newsletters}
                handleCheckboxes={handleCheckboxes}
                checkedNewsletters={checkedNewsletters}
                allHandler={allHandler}
              />
            </>
          )}
          {newsletters.length == 0 && !loading && (
            <div className={classes.containerr}>
              <p className={classes.title}>No newsletters created</p>
              <p className={classes.subtitle}>
                Create and send newsletters to your customers to keep them
                informed about your latest updates, offers, and news.
              </p>
              <button
                className={classes.button}
                onClick={() => router.push(`/dashboard/newsletter/new`)}
              >
                New Newsletter
              </button>
            </div>
          )}
        </form>
        {newsletters.length != 0 && !loading && (
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

export default NewsletterTable;
