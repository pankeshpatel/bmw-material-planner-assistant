import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Slider,
} from "@mui/material";
import { healthScoreCall, matetrialCall } from "../../utils/apihelper";
import { TrafficByDevice } from "../../components/healthscore/traffic-by-device";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
import { Line } from "react-chartjs-2";

import Modal from "@mui/material/Modal";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { SeverityPill } from "../severity-pill";

import { healthScore } from "../../../health-score";
import { exceptionViewer } from "../../../Exception-Viewer-Widget-Datasheet";

import { useState } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import ChartDataLabels from "chartjs-plugin-datalabels";
import Shimmer from "react-shimmer-effect";

// const orders = [
//   {
//     id: uuid(),
//     ref: 'CDD1049',
//     amount: 30.5,
//     customer: {
//       name: 'Ekaterina Tankova'
//     },
//     createdAt: 1555016400000,
//     status: 'pending'
//   },
//   {
//     id: uuid(),
//     ref: 'CDD1048',
//     amount: 25.1,
//     customer: {
//       name: 'Cao Yu'
//     },
//     createdAt: 1555016400000,
//     status: 'delivered'
//   },
//   {
//     id: uuid(),
//     ref: 'CDD1047',
//     amount: 10.99,
//     customer: {
//       name: 'Alexa Richardson'
//     },
//     createdAt: 1554930000000,
//     status: 'refunded'
//   },
//   {
//     id: uuid(),
//     ref: 'CDD1046',
//     amount: 96.43,
//     customer: {
//       name: 'Anje Keizer'
//     },
//     createdAt: 1554757200000,
//     status: 'pending'
//   },
//   {
//     id: uuid(),
//     ref: 'CDD1045',
//     amount: 32.54,
//     customer: {
//       name: 'Clarke Gillebert'
//     },
//     createdAt: 1554670800000,
//     status: 'delivered'
//   },
//   {
//     id: uuid(),
//     ref: 'CDD1044',
//     amount: 16.76,
//     customer: {
//       name: 'Adam Denisov'
//     },
//     createdAt: 1554670800000,
//     status: 'delivered'
//   }
// ];

function sortByProperty(property) {
  return function (a, b) {
    if (Number(a[property]) < Number(b[property])) return 1;
    else if (Number(a[property]) > Number(b[property])) return -1;

    return 0;
  };
}

export const PartLookUp = (props) => {
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [healthData, sethealthData] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  // const [value, setValue] = useState([0, 200]);

  const [healthGuage, setHealthGuage] = useState(10);
  const [healthGuage2, setHealthGuage2] = useState(10);
  const [healthGuage3, setHealthGuage3] = useState(10);
  const [healthGuage4, setHealthGuage4] = useState(10);
  const [healthGuage5, setHealthGuage5] = useState(10);


  // const [healthResponse,setHealthResponse] = useState([]);
  const [healthResponse, sethealthResponse] = useState([]);
  const [healthResponse2, sethealthResponse2] = useState([]);
  const [healthResponse3, sethealthResponse3] = useState([]);
  const [healthResponse4, sethealthResponse4] = useState([]);
  const [healthResponse5, sethealthResponse5] = useState([]);

  const [showmodal, SetShowmodal] = useState(false);

  const [materialResponse, setMaterialResponse] = useState([]);

  const [table2Loading, SetTable2Loading] = useState(false);
  const [table1Loading, SetTable1Loading] = useState(false);

  const style = {
    transform: "translate(40%, 10%)",
    width: "60%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    height: "550px",
    overflow: "scroll",
    textAlign: "center",
  };

  const options1 = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top' as const,
      },
      datalabels: {
        offset: 0,
        anchor: "center",
        align: "top",
        font: {
          size: "15",
          weight: "bold",
        },
      },

      title: {
        display: true,
        text: "Health Score Analysis of Material",
      },
    },
  };

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'top' as const,
      },
      datalabels: {
        offset: 5,
        anchor: "center",
        align: "top",
        clamp: true,
        font: {
          size: "15",
          weight: "bold",
        },
      },
      title: {
        display: true,
        text: "Health Score Analysis of Material",
      },
    },
  };

  {
    const labels = healthResponse?.total_qty_analysis?.map((val) => {
      return val.demand_date;
    });

    var data1 = {
      labels,
      datasets: [
        {
          label: "Min of Total Quantity",
          data: healthResponse?.total_qty_analysis?.map((val) => {
            return val.min;
          }),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Max of Total Quantity",
          data: healthResponse?.total_qty_analysis?.map((val) => {
            return val.max;
          }),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
        {
          label: "Mean of Total Quantity",
          data: healthResponse?.total_qty_analysis?.map((val) => {
            return val.mean;
          }),
          borderColor: "rgb(3, 155, 0)",
          backgroundColor: "rgba(3, 155, 0, 0.5)",
        },
        {
          label: "Safety Stock",
          data: healthResponse?.total_qty_analysis?.map((val) => {
            return val["safety stock"];
          }),
          borderColor: "rgb(233, 155, 0)",
          backgroundColor: "rgba(233, 155, 0, 0.5)",
        },
      ],
    };
  }
  console.log(
    "healthResponse?.total_qty_instances?.map((val)=>{return val.total_quantity})",
    healthResponse?.total_qty_instances?.map((val) => {
      return val.total_quantity;
    })
  );

  //{
    const labels = healthResponse?.total_qty_instances?.map((val) => {
      return val.demand_date;
    });

    var data2 = {
      labels,
      datasets: [
        {
          label: "Total Quantity",
          data: healthResponse?.total_qty_instances?.map((val) => {
            return val.total_quantity;
          }),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },

        {
          label: "Safety Stock",
          data: healthResponse?.total_qty_instances?.map((val) => {
            return val["safety stock"];
          }),
          borderColor: "rgb(233, 155, 0)",
          backgroundColor: "rgba(233, 155, 0, 0.5)",
        },
      ],
    };
 // }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(async () => {
    SetTable2Loading(true);
    const matetrialCallResponse = await matetrialCall();
    setMaterialResponse(matetrialCallResponse.result);
    SetTable2Loading(false);
    console.log("materialCallResponse", matetrialCallResponse);
  }, []);

  let date = new Date().toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: '2-digit'});
  
  var user = "";
  const [is114, setIs114] = useState(false);
  const [is177, setIs177] = useState(false);
  const [is594, setIs594] = useState(false);
  const [isM11, setIsM11] = useState(false);

  useEffect(async () => {

    user = localStorage.getItem("plannerId");
    if (user == "114") {
      setIs114(true);
    } else if (user == "177") {
      setIs177(true);
    } else if (user == "594") {
      setIs594(true);
    } else if (user == "M11") {
      setIsM11(true);
    }

    SetTable1Loading(true);
    // const healthScoreResponse = await healthScoreCall("7430935-05", "05/20/21");

    const healthScoreResponse = await healthScoreCall("7430935-05", date);
    const healthScoreResponse2 = await healthScoreCall("7417886-07", date);
    const healthScoreResponse3 = await healthScoreCall("8091983-05", date);
    const healthScoreResponse4 = await healthScoreCall("7420657-10", date);
    const healthScoreResponse5 = await healthScoreCall("8071659-07", date);




    SetTable1Loading(false);

    sethealthResponse(healthScoreResponse);
    sethealthResponse2(healthScoreResponse2);
  }, []);

  useEffect(() => {
    if (healthResponse["Health-score"]) {
      console.log("HealthScore", healthResponse["Health-score"].slice(0, 4));
      setHealthGuage(Number(healthResponse["Health-score"].slice(0, 4)));
    }
    if (healthResponse2["Health-score"]) {
      console.log("HealthScore", healthResponse2["Health-score"].slice(0, 4));
      setHealthGuage2(Number(healthResponse2["Health-score"].slice(0, 4)));
    }


  }, [healthResponse, healthResponse2]);

  // useEffect(() => {
  //   if (healthResponse2["Health-score"]) {
  //     console.log("HealthScore", healthResponse2["Health-score"].slice(0, 4));
  //     setHealthGuage(Number(healthResponse2["Health-score"].slice(0, 4)));
  //   }
  // }, [healthResponse2]);

  const returnColor = (status) => {
    const yellow = {
      color: "black",
      backgroundColor: "yellow",
      padding: "5px 20px",
      borderRadius: "25px 25px",
    };

    const green = {
      color: "white",
      backgroundColor: "green",
      padding: "5px 20px",
      borderRadius: "25px 25px",
    };

    const maroon = {
      color: "white",
      backgroundColor: "maroon",
      padding: "5px 20px",
      borderRadius: "25px 25px",
    };

    if (status < 20) {
      return maroon;
    }

    if (status > 20 && status < 60) {
      return yellow;
    }

    if (status > 60) {
      return green;
    }
  };

  function valuetext(value) {
    return `${Date(value)}`;
  }

  return (
    <>
      <Card {...props}>
        <CardHeader title="Health Score" />
        <Box
          sx={{
            display: "flex",
            // marginTop:"-7%",
            paddingBottom: "2%",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          {/* <Slider

       sx={{
        display: 'flex',
        width:"300px",
        justifyContent: 'flex-end',
        marginRight:"5%"
      }}
      value={value}
      aria-valuetext="sdasd"
      onChange={handleChange}
      min={0}
      max={200}
      valueLabelDisplay="off"
      getAriaValueText={valuetext}
     >

     </Slider> */}
          {/* <div style={{marginTop:"-7%" }}>
       <span>Please Select a Date: &nbsp;
          <DatePicker  selected={startDate} onChange={(date) => setStartDate(date)} />
          <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
       </span>
     </div> */}
        </Box>
        {/* <Box
    sx={{
      display: 'flex',
      marginTop:"-7%",
      paddingBottom:"2%",
      justifyContent: 'center',
      p: 3 
    }}
      >

    <Button onClick={()=>{SetShowmodal(true)}}>Show Graphs</Button>




    </Box> */}
        <PerfectScrollbar>
          <Box sx={{ minHeight: "100px", overflow: "scroll" }}>

            {/* for (let index = 0; index < 5; index++) {
              
              
            } */}
            <Table stickyHeader={true}>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "10%" }}>Material ID</TableCell>
                  <TableCell>Date</TableCell>
                  {/* <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell> */}
                  {/* <TableCell>Material_9</TableCell> */}
                  {/* <TableCell
                    onClick={() => {
                      sethealthData(healthScore.sort(sortByProperty("healthstatus")));
                    }}
                  >
                    Material_7
                  </TableCell> */}
                  {/* <TableCell>Material Description</TableCell> */}
                  <TableCell>Material Description Eng</TableCell>

                  <TableCell style={{ textAlign: "center" }}>Health Status</TableCell>

                  <TableCell>Graphs</TableCell>
                </TableRow>
              </TableHead>


              <TableBody>
                <Modal
                  open={showmodal}
                  onClose={() => {
                    SetShowmodal(false);
                  }}
                >
                  <Box sx={style}>
                    <h2>Summary of Material availability for next 10 days</h2>
                    <Line options={options1} data={data1} plugins={[ChartDataLabels]} />
                    <br />
                    <h2> Detail Information of Material availability for next 10 days</h2>
                    <Line options={options2} data={data2} plugins={[ChartDataLabels]} />
                  </Box>
                </Modal>

                <>
                  {!table1Loading
                    ? healthResponse?.material_detail?.map((order, index) => {
                        return (
                          <TableRow
                            hover
                            key={Math.random()}
                            // onClick={()=>{setSelectedMaterial(healthScore.slice(index,index+1))}}
                          >
                            <TableCell style={{ width: "10%" }}>{order.material}</TableCell>
                            <TableCell>
                              {/* {healthResponse.Date} */}
                              {/* <input
                                type="date"
                                value={startDate}
                                 onChange={(e) => setStartDate(e.target.value)}
                              /> */}
                              {date}
                            </TableCell>
                            {/* <TableCell>{order.material_9}</TableCell>
                            <TableCell>{order.material_7}</TableCell> */}

                            {/* <TableCell>
                            <span style={ returnColor(Number(order.healthstatus)) } onClick={()=>{ props.setHealthGuage(order.healthstatus) }} >{order.healthstatus}</span> 
                            </TableCell> */}

                            <TableCell>{order.mat_description}</TableCell>

                            {/* <TableCell>{order.mat_description_eng}</TableCell> */}

                            <TableCell style={{ textAlign: "center" }}>
                              {healthGuage} %
                              {/* <TrafficByDevice
                                healthGuage={healthGuage}
                                setHealthGuage={setHealthGuage}
                                sx={{ height: "100px" }}
                              /> */}
                            </TableCell>

                            <TableCell>
                              <Box
                                sx={
                                  {
                                    // display: 'flex',
                                    // marginTop:"-7%",
                                    // paddingBottom:"2%",
                                    // justifyContent: 'center',
                                    // p: 3
                                  }
                                }
                              >
                                <Button
                                  onClick={() => {
                                    SetShowmodal(true);
                                  }}
                                >
                                  Show Analysis
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : Array.from({ length: 10 }, (_, i) => (
                        <tr key={i}>
                          <td colspan="8">
                            <Shimmer>
                              <div style={{ width: "100%" }}>&nbsp;</div>
                            </Shimmer>
                          </td>
                        </tr>
                      ))}
                </>


                {/* ---------------------------------------------------------------------------------------------------- */}



                <Modal
                  open={showmodal}
                  onClose={() => {
                    SetShowmodal(false);
                  }}
                >
                  <Box sx={style}>
                    <h2>Summary of Material availability for next 10 days</h2>
                    <Line options={options1} data={data1} plugins={[ChartDataLabels]} />
                    <br />
                    <h2> Detail Information of Material availability for next 10 days</h2>
                    <Line options={options2} data={data2} plugins={[ChartDataLabels]} />
                  </Box>
                </Modal>

                <>
                  {!table1Loading
                    ? healthResponse2?.material_detail?.map((order, index) => {
                        return (
                          <TableRow
                            hover
                            key={Math.random()}
                            // onClick={()=>{setSelectedMaterial(healthScore.slice(index,index+1))}}
                          >
                            <TableCell style={{ width: "10%" }}>{order.material}</TableCell>
                            <TableCell>
                              {/* {healthResponse.Date} */}
                              {/* <input
                                type="date"
                                value={startDate}
                                 onChange={(e) => setStartDate(e.target.value)}
                              /> */}
                              {date}
                            </TableCell>
                            {/* <TableCell>{order.material_9}</TableCell>
                            <TableCell>{order.material_7}</TableCell> */}

                            {/* <TableCell>
                            <span style={ returnColor(Number(order.healthstatus)) } onClick={()=>{ props.setHealthGuage(order.healthstatus) }} >{order.healthstatus}</span> 
                            </TableCell> */}

                            <TableCell>{order.mat_description}</TableCell>

                            {/* <TableCell>{order.mat_description_eng}</TableCell> */}

                            <TableCell style={{ textAlign: "center" }}>
                              {healthGuage2} %
                            </TableCell>

                            <TableCell>
                              <Box
                                sx={
                                  {
                                    // display: 'flex',
                                    // marginTop:"-7%",
                                    // paddingBottom:"2%",
                                    // justifyContent: 'center',
                                    // p: 3
                                  }
                                }
                              >
                                <Button
                                  onClick={() => {
                                    SetShowmodal(true);
                                  }}
                                >
                                  Show Analysis
                                </Button>
                              </Box>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : Array.from({ length: 10 }, (_, i) => (
                        <tr key={i}>
                          <td colspan="8">
                            <Shimmer>
                              <div style={{ width: "100%" }}>&nbsp;</div>
                            </Shimmer>
                          </td>
                        </tr>
                      ))}
                </>







                {/* ---------------------------------------------------------------------------------------------------- */}
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
             
              </TableBody>






























              

            </Table>
          </Box>
        </PerfectScrollbar>
        {/* <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box> */}
      </Card>
      <Card {...props}>
        <CardHeader title="Part Detailed  Description" />
        <PerfectScrollbar>
          <Box sx={{ overflow: "scroll", height: "300px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "10%" }}>Material</TableCell>
                  <TableCell>Material_9</TableCell>
                  {/* <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell> */}
                  <TableCell>Material_7</TableCell>
                  <TableCell>Material Description</TableCell>
                  <TableCell>Material Description Eng</TableCell>

                  <TableCell>Safety Stock</TableCell>

                  <TableCell>Plant</TableCell>

                  <TableCell>Lot Size</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {!table2Loading
                  ? materialResponse?.map((order) => (
                      <TableRow hover key={Math.random()}>
                        <TableCell style={{ width: "10%" }}>{order.material}</TableCell>
                        <TableCell>{order.material_9}</TableCell>
                        <TableCell>{order.material_7}</TableCell>
                        <TableCell>{order.mat_description}</TableCell>

                        <TableCell>{order.mat_description_eng}</TableCell>

                        <TableCell style={{ textAlign: "center" }}>{order.safety_stock}</TableCell>

                        <TableCell>{order.plant}</TableCell>

                        <TableCell style={{ textAlign: "center" }}>{order.lot_size}</TableCell>
                      </TableRow>
                    ))
                  : Array.from({ length: 10 }, (_, i) => (
                      <tr key={i}>
                        <td colspan="8">
                          <Shimmer>
                            <div style={{ width: "100%" }}>&nbsp;</div>
                          </Shimmer>
                        </td>
                      </tr>
                    ))}
              </TableBody>

            </Table>


            {/* <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "10%" }}>Material</TableCell>
                  <TableCell>Material_9</TableCell> */}
                  {/* <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell> */}
                  {/* <TableCell>Material_7</TableCell>
                  <TableCell>Material Description</TableCell>
                  <TableCell>Material Description Eng</TableCell>

                  <TableCell>Safety Stock</TableCell>

                  <TableCell>Plant</TableCell>

                  <TableCell>Lot Size</TableCell>
                </TableRow>
              </TableHead>

            </Table> */}


          </Box>
        </PerfectScrollbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        ></Box>
      </Card>

      
    </>
  );
};

// export const LatestOrderDetail= (props) => {
//  const [selectedMaterial,setSelectedMaterial] = useState(healthScore.slice(0,1));
//  const [matrixData,setMatrixData] = useState(exceptionViewer)

//  return(<Card {...props}>
//     <CardHeader title="Part Exception Matrix" />
//     <PerfectScrollbar>
//       <Box sx={{ minWidth: 800,height:"600px" ,overflow:"scroll"}}>
//         <Table stickyHeader={true}>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 Material ID
//               </TableCell>
//               <TableCell>
//               ExceptionCount
//               </TableCell>
//               {/* <TableCell sortDirection="desc">
//                 <Tooltip
//                   enterDelay={300}
//                   title="Sort"
//                 >
//                   <TableSortLabel
//                     active
//                     direction="desc"
//                   >
//                     Date
//                   </TableSortLabel>
//                 </Tooltip>
//               </TableCell> */}
//               <TableCell onClick={()=>{setMatrixData(exceptionViewer.sort(sortByProperty("Percentage")).slice(0,exceptionViewer.length-1)) }}>
//               Percentage

//               </TableCell>
//               <TableCell>
//               Part Description

//               </TableCell>
//               <TableCell>
//               Part Description Eng

//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {matrixData.map((order) => (
//               <TableRow
//                 hover
//                 key={order.MaterialID}
//               >
//                  <TableCell>
//                  {order.MaterialID}
//                 </TableCell>

//                 <TableCell>
//                  {order.ExceptionCount}
//                 </TableCell>
//                 <TableCell>
//                   {(order.Percentage*100).toString().slice(0,4) + "%"}
//                 </TableCell>
//                 <TableCell >
//                   {order.PartDescription}
//                 </TableCell>

//                 <TableCell>
//                   {order.PartDescriptionEng}
//                 </TableCell>

//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Box>
//     </PerfectScrollbar>
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'flex-end',
//         p: 2
//       }}
//     >

//     </Box>
//   </Card>
// )
// }
