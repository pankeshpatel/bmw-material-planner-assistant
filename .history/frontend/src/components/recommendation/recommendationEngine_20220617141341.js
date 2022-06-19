import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
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
} from "@mui/material";
import { setDate } from "date-fns";
import axios from "axios";
import { ExceptionManagerCall } from "src/utils/apihelper";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { rankCall } from "src/utils/apihelper";

import { plannerId } from "src/utils/constants";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { makeStyles } from "@mui/styles";


export const recommendationEngine = (props) => {
 // ChartJS.register(ChartDataLabels);
  const theme = useTheme();

  const [resultBool, setResultBool] = useState(false);
  const [alwaysTrue, setAlwaysTrue] = useState(true);
  const [materialID, setMaterialID] = useState("");
  const [materialSelected, setMaterialSelected] = useState(false);

  const [is114, setIs114] = useState(false);
  const [is177, setIs177] = useState(false);
  const [is594, setIs594] = useState(false);
  const [isM11, setIsM11] = useState(false);

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

    const classStyle = useStyles();


  return (
    <Grid >

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
          title="Long Run"
        />

      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 350,
            position: "relative",
          }}
        >
          <Bar
            style={{ backgroundColor: "#BDCFFF" , borderRadius:20}}
            data={dataLongRun}
            options={optionsLongRun}
            //plugins={[ChartDataLabels]}
          />
        </Box>
      </CardContent>
      <Divider />

    </Card>

      <Card {...props} className={classStyle.card}>
        <CardHeader
          title="Markov"
          font="h6"
        />
        <Divider />
        <CardContent>
          <Box
            sx={{
              height: 350,
              position: "relative",
            }}
          >
            <Bar
              style={{ backgroundColor: "#BDCFFF" , borderRadius:10 }}
              data={dataMarkov}
              options={optionsMarkov}
              //plugins={[ChartDataLabels]}
            />
          </Box>
        </CardContent>
        <Divider />
      </Card>
      </Grid>

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
