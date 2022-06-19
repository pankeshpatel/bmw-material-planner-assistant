import Head from "next/head";
import { Box, Container, Grid } from "@mui/material";
import { DashboardLayout } from "../components/common/dashboard-layout";

import { recommendationEngine } from "src/components/recommendation/recommendationEngine";
const Dashboard = () => (
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
            <recommendationEngine />
          </Grid>

        </Grid>
      </Container>
    </Box>
  </>
);

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Dashboard;
