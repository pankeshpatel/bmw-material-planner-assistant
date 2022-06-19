import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';



export const RecommendationEngine = (props) => {
  // ChartJS.register(ChartDataLabels);
  const theme = useTheme();


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
