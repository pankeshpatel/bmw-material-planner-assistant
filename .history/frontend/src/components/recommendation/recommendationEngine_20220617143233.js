import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import { setDate } from 'date-fns';
import axios from 'axios';
import {  ExceptionManagerCall } from 'src/utils/apihelper';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {  rankCall } from 'src/utils/apihelper';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';



export const recommendationEngine = (props) => {
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

  const [earlyPercentage, setEarlyPercentage] = useState();
  const [onTimePercentage, setOnTimePercentage] = useState();
  const [latePercentage, setLatePercentage] = useState();

  const [negThree, setNegThree] = useState();
  const [negTwo, setNegTwo] = useState();
  const [negOne, setNegOne] = useState();
  const [zero, setZero] = useState();
  const [one, setOne] = useState();
  const [two, setTwo] = useState();
  const [three, setThree] = useState();



  useEffect( async () => {


    if (resultBool == false){

        let data = await rankCall();
       // data = data.data;

        console.log("DATA Markov: ", data.markov);
        // console.log("DATA Markov -3: ", data.markov[0]["-3"]);
        // console.log("DATA Markov -2: ", data.markov[1]["-2"]);
        // console.log("DATA Markov -1: ", data.markov[2]["-1"]);
        // console.log("DATA Markov 0: ", data.markov[3]["0"]);
        // console.log("DATA Markov 1: ", data.markov[4]["1"]);
        // console.log("DATA Markov 2: ", data.markov[5]["2"]);
        // console.log("DATA Markov 3: ", data.markov[6]["3"]);

        setNegThree(parseFloat(data.markov[0]["-3"]));
        setNegTwo(parseFloat(data.markov[1]["-2"]));
        setNegOne(parseFloat(data.markov[2]["-1"]));
        setZero(parseFloat(data.markov[3]["0"]));
        setOne(parseFloat(data.markov[4]["1"]));
        setTwo(parseFloat(data.markov[5]["2"]));
        setThree(parseFloat(data.markov[6]["3"]));


        // let resultErr = localStorage.getItem('RunCallPass');

        // if (resultErr == false){
        //     setResultBool(false);
        // } else {
        //     setResultBool(true);
        // }
    }
  });


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
        title="Markov"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 350,
            position: 'relative'
          }}
        >
          {/* <Bar style={{backgroundColor: "#ccc"}}
            data={data}
            options={options}
            //plugins={[ChartDataLabels]}
            
          /> */}
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
      </Box>

    </Card>
  );
};
