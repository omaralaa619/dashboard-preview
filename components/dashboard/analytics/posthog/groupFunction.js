export const groupFunction = (analytics, property) => {
  const groupedCounts = analytics.reduce((acc, obj) => {
    const key = obj.properties[property];
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key]++;
    return acc;
  }, {});

  const sortedCounts = Object.entries(groupedCounts)
    .map(([group, count]) => ({ group, count }))
    .sort((a, b) => b.count - a.count);

  return sortedCounts;
};

export const groupByDateFunction = (analytics) => {
  // Get the range of dates from the analytics data
  const datesSet = new Set();
  analytics.forEach((item) => {
    const date = new Date(item.properties.$sent_at);
    datesSet.add(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
  });

  // Convert the set of dates to an array and sort it
  const datesArray = Array.from(datesSet).sort((a, b) => a - b);

  // Initialize the grouped counts with 0 for each date
  const groupedCounts = datesArray.reduce((acc, date) => {
    acc[date.toISOString().split("T")[0]] = 0;
    return acc;
  }, {});

  // Update the counts based on the analytics data
  analytics.forEach((item) => {
    const date = new Date(item.properties.$sent_at);
    const key = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      .toISOString()
      .split("T")[0];
    groupedCounts[key]++;
  });

  // Convert the grouped counts to an array of objects
  const sortedCounts = Object.entries(groupedCounts).map(([group, count]) => ({
    group,
    count,
  }));

  return sortedCounts;
};
