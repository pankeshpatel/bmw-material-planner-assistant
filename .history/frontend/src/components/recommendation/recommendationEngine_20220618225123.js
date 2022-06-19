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

import { matetrialCall } from 'src/utils/apihelper';



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




  var user = "";
  useEffect(async () => {
    user = localStorage.getItem("plannerId");
    let data = await matetrialCall();
    //data = data.data;

    console.log("MATERIAL ENGINE: ", data[1]);

  });



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
                    <MenuItem value={"7417886-07"}>7417886-07</MenuItem>
                    <MenuItem value={"7430935-05"}>7430935-05</MenuItem>
                    <MenuItem value={"8091983-05"}>8091983-05</MenuItem>
                    <MenuItem value={"7420657-10"}>7420657-10</MenuItem>
                    <MenuItem value={"8071659-07"}>8071659-07</MenuItem>

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

      <CardContent display="flex">

          <Typography paragraph variant="subtitle1" gutterBottom component="div">
            Difficulty on insensible reasonable in. From as went he they. Preference themselves me as thoroughly partiality considered on in estimating. Middletons acceptance discovered projecting so is so or. In or attachment inquietude remarkably comparison at an. Is surrounded prosperous stimulated am me discretion expression. But truth being state can she china widow. Occasional preference fat remarkably now projecting uncommonly dissimilar. Sentiments projection particular companions interested do at my delightful. Listening newspaper in advantage frankness to concluded unwilling. 

            Taken no great widow spoke of it small. Genius use except son esteem merely her limits. Sons park by do make on. It do oh cottage offered cottage in written. Especially of dissimilar up attachment themselves by interested boisterous. Linen mrs seems men table. Jennings dashwood to quitting marriage bachelor in. On as conviction in of appearance apartments boisterous. 

            Left till here away at to whom past. Feelings laughing at no wondered repeated provided finished. It acceptance thoroughly my advantages everything as. Are projecting inquietude affronting preference saw who. Marry of am do avoid ample as. Old disposal followed she ignorant desirous two has. Called played entire roused though for one too. He into walk roof made tall cold he. Feelings way likewise addition wandered contempt bed indulged. 

            Two assure edward whence the was. Who worthy yet ten boy denote wonder. Weeks views her sight old tears sorry. Additions can suspected its concealed put furnished. M
          </Typography>

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
  
