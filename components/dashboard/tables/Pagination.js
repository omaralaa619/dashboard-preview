import ArrowBackSVG from "@/svgs/ArrowBackSVG";

import classes from "./Pagination.module.css";

const Pagination = ({
  page,
  pageCount,
  handleNext,
  handlePrevious,
  setPage,
}) => {
  return (
    <div className={classes.container}>
      <button
        disabled={page === 1}
        onClick={handlePrevious}
        className={classes.paginationButton}
      >
        <ArrowBackSVG />
        Prev
      </button>

      <select
        className={classes.paginationSelect}
        value={page}
        onChange={(event) => {
          setPage(+event.target.value);
        }}
      >
        {Array(pageCount)
          .fill(null)
          .map((_, index) => {
            return <option key={index}>{index + 1}</option>;
          })}
      </select>

      <button
        disabled={page === pageCount}
        onClick={handleNext}
        className={classes.paginationButton}
      >
        Next
        <div className={classes.paginationNext}>
          <ArrowBackSVG />
        </div>
      </button>
    </div>
  );
};

export default Pagination;
