import moment from "moment-timezone";
import { useEffect, useState } from "react";
import Head from "next/head";
import { CSVLink } from "react-csv";
import axios from "axios";
import Papa from "papaparse";
export default function Home({ token }) {
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
  // useEffect(() => {
  //   console.log("tok", startDate, " ", endDate);
  //   const getData = async () => {
  //     let config = {
  //       method: "get",
  //       url: `https://manage.aniview.com/api/adserver/stats/report?startDate=${startDate}&endDate=${endDate}&dimensions=daily%2Ccd1%2Ccou&metrics=request%2Cimpression%2Crevenue%2Cclick&format=json&query={}`,
  //       headers: {
  //         "X-Bamboo-Token": token,
  //       },
  //     };

  //     try {
  //       const res = await axios(config);
  //       const { data } = res.data;

  //       setCsvData(data);
  //       const csvContent = generateCSV(data);
  //       const blob = new Blob([csvContent], {
  //         type: "text/csv;charset=utf-8;",
  //       });
  //       const url = URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.setAttribute("href", url);
  //       link.setAttribute("download", "data.csv");
  //       link.click();

  //       // Clean up the temporary URL
  //       return () => {
  //         URL.revokeObjectURL(url);
  //       };

  //       // console.log("data", data);
  //       // setDataLoading(false);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   getData();
  // }, [startDate, endDate]);
  return <div></div>;
  // return (
  //   <div className="m-5 d-flex flex-column justify-content-around align-items-center flex-wrap">
  //     <Head>
  //       <script
  //         src="https://kit.fontawesome.com/14131b2572.js"
  //         crossorigin="anonymous"
  //       ></script>
  //     </Head>
  //     <div className="text-black d-flex flex-row justify-content-around">
  //       <h2 className="text-black d-flex flex-row justify-content-center mb-3">
  //         Mobitech Report
  //       </h2>
  //     </div>

  //     {dataLoading !== true ? (
  //       <>
  //         <div className="d-flex flex-row justify-content-around align-items-center w-50 mb-3">
  //           <CSVLink data={csvData} filename="ad-report.csv">
  //             <i
  //               className="fa fa-download"
  //               aria-hidden={true}
  //               style={{ color: "#450870" }}
  //             >
  //               &nbsp; Download Report
  //             </i>
  //           </CSVLink>
  //           <i
  //             className="fa fa-calendar"
  //             aria-hidden={true}
  //             style={{ color: "#450870" }}
  //           >&nbsp;
  //             {startDate} - {endDate}
  //           </i>
  //         </div>

  //         <table className="table table-success table-striped table-bordered">
  //           <thead>
  //             <tr>
  //               <th scope="col">#</th>
  //               <th scope="col">Date</th>
  //               <th scope="col">Custom 1</th>
  //               <th scope="col">Country</th>
  //               <th scope="col">Request</th>
  //               <th scope="col">Impression</th>
  //               <th scope="col">Click</th>
  //               <th scope="col">Revenue</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {csvData.map((rec, i) => (
  //               <tr>
  //                 <th scope="row">{i + 1}</th>
  //                 <td scope="row">{moment(startDate).format("YYYY-MM-DD")}</td>
  //                 <td>{rec["Custom 1"]}</td>
  //                 <td>{rec["Country"]}</td>
  //                 <td>{rec["Request"]}</td>
  //                 <td>{rec["Impression"]}</td>
  //                 <td>{rec["Click"]}</td>
  //                 <td>{rec["Revenue"]}</td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </>
  //     ) : (
  //       <div className="text-black d-flex flex-row justify-content-around mb-3">
  //         <div className="spinner-border" role="status">
  //           <span className="visually-hidden" style={{ textAlign: "center" }}>
  //             Loading...
  //           </span>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
}

export const getServerSideProps = async ({ req, res }) => {
  let token = "";
  // console.log(process.env.PASSWORD);
  // let data = JSON.stringify({
  //   id: process.env.USEREMAIL,
  //   password: process.env.PASSWORD.toString(),
  //   accountId: process.env.ACCOUNTID,
  // });

  // let config = {
  //   method: "post",
  //   url: "https://manage.aniview.com/api/token?format=json",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   data: data,
  // };

  try {
    // const res = await axios(config);
    // const { data } = res.data;
    // token = data.token;
    // console.log("tpoken", token);
    return { props: { token } };
  } catch (error) {
    // console.log(error.message);
    return { props: { token } };
  }
};
