import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { CSVLink } from "react-csv";
import axios from "axios";
import Papa from "papaparse";
export default function Home({ token }) {
  const router = useRouter();
  const [startDate, setStartDate] = useState(
    moment().subtract(1, "days").startOf("day").format("YYYY-MM-DD HH:mm:ss")
  );
  const [endDate, setEndDate] = useState(
    moment(
      moment().subtract(1, "days").startOf("day").format("YYYY-MM-DD HH:mm:ss")
    )
      .set({ hour: 23, minute: 59, second: 59 })
      .format("YYYY-MM-DD HH:mm:ss")
  );
  const [csvData, setCsvData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  function generateCSV(data) {
    const csv = Papa.unparse(data);
    return csv;
  }
  // useEffect(() => {
  //   moment.tz("America/Los_Angeles").format("YYYY-MM-DD HH:mm:ss");
  //   setStartDate(
  //     moment().subtract(1, "days").startOf("day").format("YYYY-MM-DD HH:mm:ss")
  //   );
  //   setEndDate(
  //     moment()
  //       .subtract(1, "days")
  //       .set({ hour: 23, minute: 59, second: 59 })
  //       .format("YYYY-MM-DD HH:mm:ss")
  //   );
  // }, []);
  useEffect(() => {
    // console.log("tok", startDate, " ", endDate);
    moment.tz("America/Los_Angeles").format("YYYY-MM-DD HH:mm:ss");
    const inputDate = router.query.date;
    let startDate = moment()
      .subtract(1, "days")
      .startOf("day")
      .format("YYYY-MM-DD HH:mm:ss");
    let endDate = moment()
      .subtract(1, "days")
      .startOf("day")
      .set({ hour: 23, minute: 59, second: 59 })
      .format("YYYY-MM-DD HH:mm:ss");

    if (inputDate) {
      startDate = moment(inputDate)
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss");

      endDate = moment(inputDate)
        .startOf("day")
        .set({ hour: 23, minute: 59, second: 59 })
        .format("YYYY-MM-DD HH:mm:ss");
    }

    const getData = async () => {
      let config = {
        method: "get",
        url: `https://manage.aniview.com/api/adserver/stats/report?startDate=${startDate}&endDate=${endDate}&dimensions=daily%2Ccd1%2Ccou&metrics=inventory%2Cimpression%2Crevenue%2Cncpm%2CavgViewability&format=json&query={}`,
        headers: {
          "X-Bamboo-Token": token,
        },
      };

      try {
        const res = await axios(config);
        const { data } = res.data;

        setCsvData(data);
        const csvContent = generateCSV(data);
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute(
          "download",
          `eyecon-report-${moment(startDate).format("YYYY-MM-DD")}.csv`
        );
        link.click();

        // Clean up the temporary URL
        return () => {
          URL.revokeObjectURL(url);
        };

        // console.log("data", data);
        // setDataLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, [router.query]);
  return null;
}

export const getServerSideProps = async ({ req, res }) => {
  let token = "";
  let data = JSON.stringify({
    id: process.env.USEREMAIL,
    password: process.env.PASSWORD.toString(),
    accountId: "649ef798992370746a0b7748",
  });

  let config = {
    method: "post",
    url: "https://manage.aniview.com/api/token?format=json",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  try {
    const res = await axios(config);
    const { data } = res.data;
    token = data.token;
    // console.log("tpoken", token);
    return { props: { token } };
  } catch (error) {
    console.log(error.message);
    return { props: { token } };
  }
};
