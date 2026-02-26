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
  const [analytics, setAnalytics] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchPH = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/analytics?duration=${duration}`);
      const data = await res.json();

      setAnalytics(data);
      console.log(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPH();
  }, [duration]);

  const modalHandler = (content) => {
    setModal(true);

    setModalContent(content);
  };

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
                    {analytics.totalViews}
                  </p>
                </div>
              </div>
              <div className={classes.chart}>
                <PageviewsChart items={analytics.dailyCounts} />
              </div>
            </Card>
          </div>

          <div className={classes.second}>
            <Card className={classes.block}>
              <div
                className={`${classes.expand} ${
                  analytics.urls.length > 5 ? classes.show : classes.none
                }`}
              >
                <button onClick={() => modalHandler(analytics.urls)}>
                  View All <ExpandSVG />
                </button>
              </div>
              <div className={classes.header}>
                <p className={classes.title}>Top Pages</p>
                <p className={classes.sub}>VISITORS</p>
              </div>
              <div className={classes.list}>
                {analytics.urls.map((item) => (
                  <ListItem
                    key={item.group}
                    item={item}
                    max={analytics.urls[0].col1}
                  />
                ))}
              </div>
            </Card>

            <Card className={classes.block}>
              <div
                className={`${classes.expand} ${
                  analytics.referringDomains.length > 5
                    ? classes.show
                    : classes.none
                }`}
              >
                <button
                  onClick={() => modalHandler(analytics.referringDomains)}
                >
                  View All <ExpandSVG />
                </button>
              </div>
              <div className={classes.header}>
                <p className={classes.title}>Top Sources</p>
                <p className={classes.sub}>VISITORS</p>
              </div>
              <div className={classes.list}>
                {analytics.referringDomains.map((item) => (
                  <ListItem
                    key={item.group}
                    item={item}
                    max={analytics.referringDomains[0].col1}
                  />
                ))}
              </div>
            </Card>
          </div>

          <div className={classes.third}>
            <Card className={classes.block}>
              <div
                className={`${classes.expand} ${
                  analytics.countries.length > 5 ? classes.show : classes.none
                }`}
              >
                <button onClick={() => modalHandler(analytics.countries)}>
                  View All <ExpandSVG />
                </button>
              </div>
              <div className={classes.header}>
                <p className={classes.title}>Countries</p>
                <p className={classes.sub}>VISITORS</p>
              </div>
              <div className={classes.list}>
                {analytics.countries.map((item) => (
                  <ListItem
                    key={item.group}
                    item={item}
                    max={analytics.countries[0].col1}
                  />
                ))}
              </div>
            </Card>

            <Card className={classes.block}>
              <div
                className={`${classes.expand} ${
                  analytics.osList.length > 5 ? classes.show : classes.none
                }`}
              >
                <button onClick={() => modalHandler(analytics.osList)}>
                  View All <ExpandSVG />
                </button>
              </div>
              <div className={classes.header}>
                <p className={classes.title}>Operating Systems</p>
                <p className={classes.sub}>VISITORS</p>
              </div>
              <div className={classes.list}>
                {analytics.osList.map((item) => (
                  <ListItem
                    key={item.group}
                    item={item}
                    max={analytics.osList[0].col1}
                  />
                ))}
              </div>
            </Card>

            <Card className={classes.block}>
              <div
                className={`${classes.expand} ${
                  analytics.browsers.length > 5 ? classes.show : classes.none
                }`}
              >
                <button onClick={() => modalHandler(analytics.browsers)}>
                  View All <ExpandSVG />
                </button>
              </div>
              <div className={classes.header}>
                <p className={classes.title}>Browsers</p>
                <p className={classes.sub}>VISITORS</p>
              </div>
              <div className={classes.list}>
                {analytics.browsers.map((item, index) => (
                  <ListItem
                    key={index}
                    item={item}
                    max={analytics.browsers[0].col1}
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
