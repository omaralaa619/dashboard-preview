"use client";

import SearchSVG from "@/svgs/SearchSVG";
import TextInput from "../../UI/inputs/TextInput";
import LoadingSpinner from "../../UI/LoadingSpinner";
import classes from "../DiscountsForm.module.css";
import DropDown from "./DropDown";
import { useEffect, useRef, useState } from "react";

const Search = ({ setProductsList, selectedProducts = [] }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const debounceRef = useRef();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setProducts([]);
      setOpen(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setSearchLoading(true);

      try {
        const res = await fetch(
          `/api/products?search=${encodeURIComponent(searchQuery)}`,
        );

        const data = await res.json();
        const fetchedProducts = data.products || [];

        // Filter out already selected products
        const selectedIds = selectedProducts.map((p) => p._id || p.id);

        const filteredProducts = fetchedProducts.filter(
          (product) => !selectedIds.includes(product._id || product.id),
        );

        setProducts(filteredProducts);
        setOpen(true);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }

      setSearchLoading(false);
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [searchQuery]);

  return (
    <div className={classes.inputContainer}>
      <label>Search products</label>

      <div className="relative">
        <TextInput
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {searchLoading ? (
            <LoadingSpinner size={14} color="white" dark />
          ) : (
            <div className={classes.black}>
              <SearchSVG />
            </div>
          )}
        </div>
      </div>

      <DropDown
        open={open}
        setOpen={setOpen}
        products={products}
        setSearchQuery={setSearchQuery}
        setProductsList={setProductsList}
      />
    </div>
  );
};

export default Search;
