import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import { setDate } from 'date-fns';
import axios from 'axios';
import { ExceptionManagerCall } from 'src/utils/apihelper';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';



export const ExceptionManager = (props) => {
  // ChartJS.register(ChartDataLabels);
  const theme = useTheme();

  const [resultBool, setResultBool] = useState(false);
  const [GraphValues, setGraphValues] = useState([]);
  const [GraphLabels, setGraphLabels] = useState([]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  let array2 = [];
  let array2_Exceptions = [];
  let arrayLabels = [];


  useEffect( async () => {


    if (resultBool === false){
      let data = await ExceptionManagerCall("02/18/22", "04/04/22");
      data = data.data;
      for ( let i = 0; i < data.result.length; i++) {
        array2.push(parseFloat(data.result[i].percentage));
        array2_Exceptions.push(parseInt(data.result[i].exception));
      }

      for (let i = 0; i < data.exceptions.length; i++){
        if (array2_Exceptions[i] === data.exceptions[i].exceptionID){
          arrayLabels.push(data.exceptions[i].exceptionMsg);
        }
      }
          
      array2.push(100);
      setGraphValues(array2);
      setGraphLabels(arrayLabels);
      setResultBool(true);
    }
  });

  let token = '';
  let headers = '';




// const ExceptionManagerCall = (plannerId,startDate,EndDate) => {
//   const apiUrl = `http://18.208.171.25`;
//   const url = `${apiUrl}/exceptions/manager/${plannerId}?start_date=${startDate}&end_date=${EndDate}`

//   return new Promise((resolve,reject)=>{
//   const header = getHeader();
//           axios
//               .get(url,header)
//               .then((res)=>{
//                   resolve(res)
//               })
//               .catch((err) => {
//                   reject((err))
//               })
//           })
// }


  




  const data = {
    // getEPDataAPI();
    plugins: {
      datalabels: {
         display: true,
         color: 'white'
      }
   },
    datasets: [
      {
        barPercentage: 0.5,
        barThickness: 40,
        borderRadius: 4,
        categoryPercentage: 0.5,
        backgroundColor: ["#232323", "#28587b", "#253021", "#4C3B4D"],
        data: GraphValues,
        label: '',
        maxBarThickness: 100,
      },
    ],
   labels: GraphLabels
  };
    
    




  const options = {
    animation: false,
    cornerRadius: 20, 
    // color=['red','blue'],
    layout: { padding: 0 },
    // legend: { display: true },
    maintainAspectRatio: false,
    responsive: true,
    indexAxis: 'y',
    scales: {
      y: {
        ticks: { color: 'black', beginAtZero: true }
        
      
      },
 
    x: {
      ticks: { color: 'black', beginAtZero: true },
      
      title: {
        display: true,
        text: 'Percantages',
        color:"black" 
      }
      
    }
  },
    yAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary
        },
        gridLines: {
          display:false,
          drawBorder: false
        }
      }
    ],
    xAxes: [
      {
        ticks: {
          fontColor: theme.palette.text.secondary,
          beginAtZero: true,
          min: 0
        },
        gridLines: {
          borderDash: [2],
          borderDashOffset: [2],
          color: theme.palette.divider,
          drawBorder: false,
          zeroLineBorderDash: [2],
          zeroLineBorderDashOffset: [2],
          zeroLineColor: theme.palette.divider
        }
      }
    ],

    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary.at
    },
 
  };

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Button
            // endIcon={<ArrowDropDownIcon fontSize="small" />}
            size="small"
          >
            <select>
            
              <option value="" key="">last 45 days</option>
       

            </select>
          </Button>
        )}
        title="Part Exception Manager"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
            
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        {/* <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button> */}
      </Box>
    </Card>
  );
};
