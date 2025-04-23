"use client";

import Card from "../../UI/Card";

import classes from "./ProductsTable.module.css";
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

import ProductsList from "./ProductsList";
import ProductTableLoading from "./ProductTableLoading";
import SelectOptionsProducts from "./SelectOptionsProducts";

const ProductsTable = () => {
  const searchParams = useSearchParams();

  searchParams.get("page");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  ////////// status filter //////////
  const [filter, setFilter] = useState("active");
  const [searchOpen, setSearchOpen] = useState(false);

  //////// selected products //////////
  const [checkedProducts, setCheckedProducts] = useState([]);

  /////// search value and actual search const /////////
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");

  /////////// pagination variables  //////////////
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/products/?page=${page}&search=${search}&status=${filter}`,
        {
          method: "GET",
        }
      );

      if (response) {
        const data = await response.json();
        setProducts(data.products);
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
    setCheckedProducts([]);
    fetchProducts();
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

  const productsId = products.map((product) => {
    return product._id;
  });

  const allHandler = (e) => {
    if (e.target.checked) {
      setCheckedProducts(productsId);
    } else {
      setCheckedProducts([]);
    }
  };

  const handleCheckboxes = (e) => {
    if (e.target.checked) {
      console.log(e.target.checked);

      setCheckedProducts([...checkedProducts, e.target.value]);
      console.log(checkedProducts);
    } else {
      setCheckedProducts((checkedProducts) =>
        checkedProducts.filter((product) => product !== e.target.value)
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
                className={`${
                  filter == "active" ? classes.buttonSelected : ""
                } ${classes.filterButton} `}
                onClick={() => {
                  setFilter("active");
                }}
              >
                Active
              </button>
              <button
                className={`${
                  filter == "archived" ? classes.buttonSelected : ""
                } ${classes.filterButton}`}
                onClick={() => setFilter("archived")}
              >
                Archived
              </button>

              <SelectOptionsProducts
                checkedProducts={checkedProducts}
                fetchProducts={fetchProducts}
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
            <ProductsList
              products={products}
              handleCheckboxes={handleCheckboxes}
              checkedProducts={checkedProducts}
              allHandler={allHandler}
            />
            {products.length === 0 && (
              <p className={classes.notFound}>No Products Found!</p>
            )}
          </>
        )}
      </form>
      {!(products.length === 0) && (
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

export default ProductsTable;
