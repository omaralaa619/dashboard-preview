"use client";

import Card from "../../UI/Card";

import classes from "./OrdersTable.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import Skeleton from "../../UI/Skeleton";
import { useSearchParams } from "next/navigation";
import ArrowBackSVG from "@/svgs/ArrowBackSVG";
import CloseX from "@/svgs/CloseX";
import SelectOptions from "../SelectOptions";
import Modal from "../../UI/Modal";
import SearchBar from "../SearchBar";
import Pagination from "../Pagination";
import OrdersList from "./OrdersList";

const OrdersTable = () => {
  const searchParams = useSearchParams();
  searchParams.get("page");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  ////// status filter ///////
  const [filter, setFilter] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);

  ////// selected orders //////
  const [checkedOrders, setCheckedOrders] = useState([]);

  /////// search value and actual search const /////////
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");

  /////////// pagination variables  //////////////
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  ///////////// Modal states //////////////////////////

  // const [deleteModal, setDeleteModal] = useState(false);

  ////////////  fetching orders //////////
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/orders/?page=${page}&search=${search}&status=${filter}`,
        {
          method: "GET",
        }
      );

      if (response) {
        const data = await response.json();
        setOrders(data.orders);
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
    setCheckedOrders([]);
    fetchOrders();
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

  const ordersId = orders.map((order) => {
    return order._id;
  });
  const allHandler = (e) => {
    if (e.target.checked) {
      setCheckedOrders(ordersId);
    } else {
      setCheckedOrders([]);
    }
  };

  const handleCheckboxes = (e) => {
    if (e.target.checked) {
      console.log(e.target.checked);

      setCheckedOrders([...checkedOrders, e.target.value]);
      console.log(checkedOrders);
    } else {
      setCheckedOrders((checkedOrders) =>
        checkedOrders.filter((order) => order !== e.target.value)
      );
    }
  };

  return (
    <Card className={classes.main}>
      <form onSubmit={submitHandler}>
        <div className={classes.top}>
          <div className={classes.cta}>
            <div className={`${classes.buttonsLeft}`}>
              <button
                className={`${filter == "all" ? classes.buttonSelected : ""} ${
                  classes.filterButton
                } `}
                onClick={() => {
                  setFilter("all");
                }}
              >
                All orders
              </button>
              <button
                className={`${
                  filter == "unfulfilled" ? classes.buttonSelected : ""
                } ${classes.filterButton}`}
                onClick={() => setFilter("unfulfilled")}
              >
                Unfulfilled
              </button>

              <SelectOptions
                checkedOrders={checkedOrders}
                fetchOrders={fetchOrders}
                setCheckedOrders={setCheckedOrders}
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

        {!loading && (
          <>
            <OrdersList
              orders={orders}
              handleCheckboxes={handleCheckboxes}
              checkedOrders={checkedOrders}
              allHandler={allHandler}
            />
            {orders.length === 0 && (
              <p className={classes.notFound}>No Orders Found!</p>
            )}
          </>
        )}
      </form>
      {!(orders.length === 0) && (
        <Pagination
          page={page}
          pageCount={pageCount}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          setPage={setPage}
        />
      )}
    </Card>
  );
};

export default OrdersTable;
