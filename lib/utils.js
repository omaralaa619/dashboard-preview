export const formatter = (num) => {
  const formatted = Intl.NumberFormat("en", {
    useGrouping: true, // Enables grouping (e.g., commas)
    minimumFractionDigits: 2, // Ensures at least 2 decimal places
    maximumFractionDigits: 2, // Ensures no more than 2 decimal places
  });

  return formatted.format(num);
};
