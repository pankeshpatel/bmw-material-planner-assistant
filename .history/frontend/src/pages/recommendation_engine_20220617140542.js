import Head from "next/head";
//import { Box, Container, Grid, Card, CardHeader, Button, Divider, CardContent, Bar } from "@mui/material";
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
    Container,
} from "@mui/material";


import { DashboardLayout } from "../components/common/dashboard-layout";

import { LongRunAndMarkov } from "src/components/rank/longRunAndMarkov";

const [materialID, setMaterialID] = useState("");
const [materialSelected, setMaterialSelected] = useState(false);

const recommendation_engine = () => (
  <>
    <Head>
      <title>BMW Material Ranking</title>
      <link
        rel="icon"
        type="image/x-icon"
        href="https://pngimg.com/uploads/bmw_logo/bmw_logo_PNG19714.png"
      ></link>
    </Head>


    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
        <Container maxWidth={false}>
            <Grid container spacing={3}>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                    <Card>
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
                                height: 350,
                                position: 'relative'
                            }}
                            >
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






















                    {/* <LongRunAndMarkov /> */}
                </Grid>
            </Grid>
        </Container>
    </Box>
  </>
);

recommendation_engine.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default recommendation_engine;
