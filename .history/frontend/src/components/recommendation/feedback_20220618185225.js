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
    TextField,
} from "@mui/material";

import { makeStyles } from "@mui/styles";



export const Feedback = (props) => {
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
            title="Feedback"
        />

      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 150,
            position: 'relative'
          }}
        >
          <TextField
            id="outlined-multiline-static"
            label="Input feedback on rationale for rejection..."
            multiline
            rows={4}
            //defaultValue="Default Value"
            variant="filled"
            fullWidth
          />
        </Box>

        <Box
          sx={{
            height: 50,
            position: 'relative',
          }}

          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Button variant="contained"  align="right" sx={{ height: 60, width:"20%",  color:"#ffffff" }}>
            Submit
          </Button>
            
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
  
