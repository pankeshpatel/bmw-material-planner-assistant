import Head from "next/head";
import { Box, Container, Grid, Card, CardHeader } from "@mui/material";
import { DashboardLayout } from "../components/common/dashboard-layout";

import { LongRunAndMarkov } from "src/components/rank/longRunAndMarkov";

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
          <Bar style={{backgroundColor: "#ccc"}}
            data={data}
            options={options}
            //plugins={[ChartDataLabels]}
            
          />
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
        {/* <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
        >
          Overview
        </Button> */}
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
