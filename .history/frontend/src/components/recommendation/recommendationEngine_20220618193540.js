import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    Grid,
    IconButton,
    Typography,
    ButtonGroup,
    Paper,
} from "@mui/material";

import { makeStyles } from "@mui/styles";

import CheckBoxIcon from '@mui/icons-material/CheckBox';




export const RecommendationEngine = (props) => {
  // ChartJS.register(ChartDataLabels);
  const theme = useTheme();
  const classStyle = useStyles();

  const [materialID, setMaterialID] = useState("");
  const [materialSelected, setMaterialSelected] = useState(false);

  const handler = (event) => {
    setMaterialID(event.target.value);
  //  localStorage.setItem("materialID", event.target.value);
    setMaterialSelected(true);
    // localStorage.setItem("queueMarkov", true);
    // localStorage.setItem("MAT", event.target.value);
  };



  return (
    <Card {...props} className={classStyle.card}>
        <CardHeader
            action={
                <FormControl style={{ width: 300 }}>
                    <InputLabel id="Select Material">Material</InputLabel>
                    <Select
                    // labelId="Select Material"
                    // id="Select Material"
                    value={materialID}
                    label="Age"
                    onChange={handler}
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
            title="Recommendation Engine"
        />

      <Divider />

      <CardContent>
        <Box
          sx={{
            height: 100,
            position: 'relative'
          }}
        >
                <Paper elevation={0} />


        <Typography variant="subtitle1" gutterBottom component="div">
        This is just a snippet of this year’s No Bummer Summer list. Each June, I unroll butcher paper, grab colored markers, gather my husband and two sons, and start collecting No Bummer Summer ideas.
        
        Our list usually contains over 50 entries, written in alternating rainbow markers, a sign of the color we hope to infuse in our goal to make summer more than just a season. The opposite of Katherine May’s term wintering, a seasonal giving in to all things slow, quiet and dark, summering is about openness, light, adventure. Summering is about living your best life.
        
        {/* Our only rule about the list is that it has to be aimed at fun, not productivity. We don’t include work goals. We don’t include anything that might read as productive. The goal for summer is to lessen the pressure to be anything more than we are. */}
        </Typography>
  

        </Box>


        <Box
          sx={{
            height: 100,
            position: 'relative',
          }}

          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <ButtonGroup disableElevation variant="contained" sx={{ height: 60,fontSize:20, width:'20%'}}>
            <Button sx={{width:'50%', fontSize:20, fontWeight:0, color:"#FFFFFF", backgroundColor:"#FF0000" }}>Reject</Button>
            <Button sx={{width:'50%', fontSize:20, fontWeight:0, color:"#FFFFFF", backgroundColor:"#00CC00" }}>Agree</Button>
          </ButtonGroup>
            
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

const useStyles = makeStyles({
    card: {
      border: "2px solid",
      borderColor: "#3a86ff",
      boxShadow: "0 19px 38px rgba(1,0.75,1,0.75), 0 15px 12px rgba(0,0,0,0.22)",
     // boxShadow: "9px 18px #3a86ff",   // AABDFF   ---   F1EFFE --- 6F6F6F --- 0166B1
      // borderColor: '#C4C4C4',
      marginTop: 0,
      marginBottom:100
    }
});
  
