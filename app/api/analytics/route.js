import { NextResponse } from "next/server";

export const GET = async (req) => {
  const posthogAPI = process.env.NEXT_PUBLIC_POSTHOG_API_KEY;
  const { searchParams } = new URL(req.url);
  const duration = Number(searchParams.get("duration")) || 7;

  const fromDate = new Date();
  fromDate.setDate(fromDate.getDate() - duration);
  const fromDateISO = fromDate.toISOString();

  const runQuery = async (hogql) => {
    const response = await fetch(
      "https://app.posthog.com/api/projects/53836/query/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${posthogAPI}`,
        },
        body: JSON.stringify({ query: { kind: "HogQLQuery", query: hogql } }),
      }
    );

    if (!response.ok) throw new Error(await response.text());

    const data = await response.json();
    return data.results.map((row) => {
      const obj = {};
      row.forEach((val, i) => {
        const colName = data.columns[i]?.name || `col${i}`;
        obj[colName] = val;
      });
      return obj;
    });
  };

  try {
    // 🧠 Group by month if range ≥ 180 days, else group by day
    const groupBy =
      duration >= 180 ? "toStartOfMonth(timestamp)" : "toDate(timestamp)";
    const labelFormat =
      duration >= 180
        ? { month: "short" } // "Nov"
        : { month: "short", day: "numeric" }; // "Nov 6"

    const [browsers, osList, countries, referringDomains, urls, dailyRaw] =
      await Promise.all([
        runQuery(`
        SELECT JSONExtractString(properties, '$browser') AS browser, count() AS views
        FROM events
        WHERE event = '$pageview'
          AND timestamp >= toDateTime('${fromDateISO}', 'UTC')
        GROUP BY browser
        ORDER BY views DESC
      `),
        runQuery(`
        SELECT JSONExtractString(properties, '$os') AS os, count() AS views
        FROM events
        WHERE event = '$pageview'
          AND timestamp >= toDateTime('${fromDateISO}', 'UTC')
        GROUP BY os
        ORDER BY views DESC
      `),
        runQuery(`
        SELECT JSONExtractString(properties, '$geoip_country_name') AS country, count() AS views
        FROM events
        WHERE event = '$pageview'
          AND timestamp >= toDateTime('${fromDateISO}', 'UTC')
        GROUP BY country
        ORDER BY views DESC
      `),
        runQuery(`
        SELECT JSONExtractString(properties, '$referring_domain') AS referring_domain, count() AS views
        FROM events
        WHERE event = '$pageview'
          AND timestamp >= toDateTime('${fromDateISO}', 'UTC')
        GROUP BY referring_domain
        ORDER BY views DESC
      `),
        runQuery(`
        SELECT JSONExtractString(properties, '$pathname') AS url, count() AS views
        FROM events
        WHERE event = '$pageview'
          AND timestamp >= toDateTime('${fromDateISO}', 'UTC')
        GROUP BY url
        ORDER BY views DESC
      `),
        runQuery(`
        SELECT ${groupBy} AS day, count() AS count
        FROM events
        WHERE event = '$pageview'
          AND timestamp >= toDateTime('${fromDateISO}', 'UTC')
        GROUP BY day
        ORDER BY day ASC
      `),
      ]);

    // 🧮 Format data for chart
    const dailyRawMapped = dailyRaw.map((r) => ({
      day: r.col0,
      count: r.col1,
    }));

    const dailyCounts = [];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - duration);

    const steps = duration >= 180 ? 12 : duration + 1;

    for (let i = 0; i < steps; i++) {
      const date = new Date(startDate);
      if (duration >= 180) {
        date.setMonth(startDate.getMonth() + i);
      } else {
        date.setDate(startDate.getDate() + i);
      }

      const formattedDay = date.toLocaleDateString("en-US", labelFormat);
      const isoStr = date
        .toISOString()
        .split("T")[0]
        .slice(0, duration >= 180 ? 7 : 10); // YYYY-MM or YYYY-MM-DD
      const found = dailyRawMapped.find((r) => r.day.startsWith(isoStr));

      dailyCounts.push({ day: formattedDay, count: found ? found.count : 0 });
    }

    const totalViews = dailyCounts.reduce((sum, d) => sum + d.count, 0);

    return NextResponse.json({
      browsers,
      osList,
      countries,
      referringDomains,
      urls,
      dailyCounts,
      totalViews,
      groupedBy: duration >= 180 ? "month" : "day",
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
