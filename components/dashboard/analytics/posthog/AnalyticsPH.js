"use client";
import { useEffect, useState } from "react";
import { groupByDateFunction, groupFunction } from "./groupFunction";
import classes from "./AnalyticsPH.module.css";
import Card from "../../UI/Card";

import PageviewsChart from "./PageviewsChart";
import ListItem from "./ListItem";
import LoadingSkeleton from "./LoadingSkeleton";
import ExpandSVG from "@/svgs/ExpandSVG";
import ModalGen from "../../UI/ModalGen";
import ItemsModal from "./ItemsModal";
import { AnimatePresence } from "framer-motion";

const AnalyticsPH = ({ duration }) => {
  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - duration);

  const posthogAPI = process.env.POSTHOG_API_KEY;

  const [analytics, setAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const modalHandler = (content) => {
    setModal(true);

    setModalContent(content);
  };

  const fetchPH = async () => {
    try {
      const response = await fetch(
        `https://app.posthog.com/api/projects/53836/events?event=$pageview&after=${fromDate.toISOString()}&limit=10000000`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${posthogAPI}`,
          },
        }
      );
      const data = await response.json();
      console.log("asas", data.results);

      setAnalytics(data.results);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPH();
  }, [duration]);

  const groupByUrl = groupFunction(analytics, "$pathname");

  const groupByOs = groupFunction(analytics, "$os");
  const groupByBrowser = groupFunction(analytics, "$browser");
  const groupByReferring = groupFunction(analytics, "$referring_domain");
  const groupByCountry = groupFunction(analytics, "$geoip_country_name");

  const formatDate = (date) => {
    const dateOptions = { month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", dateOptions);
  };

  // Helper function to get a list of all dates for a given number of days before today
  const getDateRangeFromDaysAgo = (daysAgo) => {
    const dateArray = [];
    const endDate = new Date(); // Today's date
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - daysAgo); // Subtract days from today

    let currentDate = startDate;

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate)); // Clone the date object
      currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
    }

    return dateArray;
  };

  const groupByDayWithZeroes = (analytics, daysAgo) => {
    // Step 1: Extract all dates in YYYY-MM-DD format from the page views
    const dates = analytics.map((view) => formatDate(new Date(view.timestamp)));

    // Step 2: Get all dates between 'daysAgo' and today
    const allDates = getDateRangeFromDaysAgo(daysAgo);

    // Step 3: Create an object with each date initialized to 0
    const dailyPageViews = allDates.reduce((acc, date) => {
      const formattedDate = formatDate(date);
      acc[formattedDate] = 0;
      return acc;
    }, {});

    // Step 4: Populate the object with actual page view counts
    dates.forEach((date) => {
      if (dailyPageViews[date] !== undefined) {
        dailyPageViews[date]++;
      }
    });

    return dailyPageViews;
  };

  // Usage example: Group page views for the last 7 days including today

  const dailyPageViewsWithZeroes = groupByDayWithZeroes(analytics, duration);

  return (
    <div className={classes.root}>
      <ItemsModal
        groupByUrl={modalContent}
        closeModal={() => setModal(false)}
        modal={modal}
      />

      {!loading && (
        <div className={classes.main}>
          <div>
            <Card>
              <div className={classes.firstHeader}>
                <div className={classes.firstInner}>
                  <p className={classes.firstHeaderTitle}>Page Views</p>
                  <p className={classes.firstHeaderNumber}>
                    {analytics.length}
                  </p>
                </div>
              </div>
              <div className={classes.chart}>
                <PageviewsChart items={dailyPageViewsWithZeroes} />
              </div>
            </Card>
          </div>

          <div className={classes.second}>
            <Card className={classes.block}>
              <div
                className={`${classes.expand} ${
                  groupByUrl.length > 6 ? classes.show : classes.none
                }`}
              >
                <button onClick={() => modalHandler(groupByUrl)}>
                  View All <ExpandSVG />
                </button>
              </div>
              <div className={classes.header}>
                <p className={classes.title}>Top Pages</p>
                <p className={classes.sub}>VISITORS</p>
              </div>
              <div className={classes.list}>
                {groupByUrl.map((item) => (
                  <ListItem
                    key={item.group}
                    item={item}
                    max={groupByUrl[0].count}
                  />
                ))}
              </div>
            </Card>

            <Card className={classes.block}>
              <div
                className={`${classes.expand} ${
                  groupByReferring.length > 6 ? classes.show : classes.none
                }`}
              >
                <button onClick={() => modalHandler(groupByReferring)}>
                  View All <ExpandSVG />
                </button>
              </div>
              <div className={classes.header}>
                <p className={classes.title}>Top Sources</p>
                <p className={classes.sub}>VISITORS</p>
              </div>
              <div className={classes.list}>
                {groupByReferring.map((item) => (
                  <ListItem
                    key={item.group}
                    item={item}
                    max={groupByReferring[0].count}
                  />
                ))}
              </div>
            </Card>
          </div>

          <div className={classes.third}>
            <Card className={classes.block}>
              <div
                className={`${classes.expand} ${
                  groupByCountry.length > 6 ? classes.show : classes.none
                }`}
              >
                <button onClick={() => modalHandler(groupByCountry)}>
                  View All <ExpandSVG />
                </button>
              </div>
              <div className={classes.header}>
                <p className={classes.title}>Countries</p>
                <p className={classes.sub}>VISITORS</p>
              </div>
              <div className={classes.list}>
                {groupByCountry.map((item) => (
                  <ListItem
                    key={item.group}
                    item={item}
                    max={groupByCountry[0].count}
                  />
                ))}
              </div>
            </Card>

            <Card className={classes.block}>
              <div
                className={`${classes.expand} ${
                  groupByOs.length > 6 ? classes.show : classes.none
                }`}
              >
                <button onClick={() => modalHandler(groupByOs)}>
                  View All <ExpandSVG />
                </button>
              </div>
              <div className={classes.header}>
                <p className={classes.title}>Operating Systems</p>
                <p className={classes.sub}>VISITORS</p>
              </div>
              <div className={classes.list}>
                {groupByOs.map((item) => (
                  <ListItem
                    key={item.group}
                    item={item}
                    max={groupByOs[0].count}
                  />
                ))}
              </div>
            </Card>

            <Card className={classes.block}>
              <div
                className={`${classes.expand} ${
                  groupByBrowser.length > 6 ? classes.show : classes.none
                }`}
              >
                <button onClick={() => modalHandler(groupByBrowser)}>
                  View All <ExpandSVG />
                </button>
              </div>
              <div className={classes.header}>
                <p className={classes.title}>Browsers</p>
                <p className={classes.sub}>VISITORS</p>
              </div>
              <div className={classes.list}>
                {groupByBrowser.map((item) => (
                  <ListItem
                    key={item.group}
                    item={item}
                    max={groupByBrowser[0].count}
                  />
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {loading && <LoadingSkeleton />}
    </div>
  );
};

export default AnalyticsPH;
