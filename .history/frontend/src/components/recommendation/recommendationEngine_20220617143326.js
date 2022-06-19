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

  useEffect( async () => {

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
        title="Markovvvvv"
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
