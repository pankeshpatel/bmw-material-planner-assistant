import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';


export const recommendationEngine = (props) => {
  // ChartJS.register(ChartDataLabels);
  const theme = useTheme();

//   useEffect( async () => {

//   });


  return (
    <Card {...props}>
       <CardHeader
          action={
            <FormControl style={{ width: 300 }}>
              <InputLabel id="Select Material">Material</InputLabel>
              <Select
                // labelId="Select Material"
                // id="Select Material"
                //value={materialID}
                label="Age"
               // onChange={handler}
                // defaultValue="741788607"
              >
                <MenuItem value={"741788607"}>741788607</MenuItem>
                <MenuItem value={"743093505"}>743093505</MenuItem>
                <MenuItem value={"809198305"}>809198305</MenuItem>
                <MenuItem value={"742065710"}>742065710</MenuItem>
                <MenuItem value={"807165907"}>807165907</MenuItem>

                {/* <MenuItem value={"741788607"}>{material1}</MenuItem>
              <MenuItem value={"743093505"}>{material2}</MenuItem>
              <MenuItem value={"809198305"}>{material3}</MenuItem>
              <MenuItem value={"742065710"}>{material4}</MenuItem>
              <MenuItem value={"807165907"}>{material5}</MenuItem> */}
              </Select>
            </FormControl>
          }
          title="Long Run"
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
