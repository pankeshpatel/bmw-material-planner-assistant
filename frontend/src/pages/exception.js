import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { ExceptionManager } from '../components/dashboard/exception-manager';
import { DashboardLayout } from '../components/dashboard-layout';
import {LatestOrderDetail} from '../components/dashboard/latest-orders';




const Dashboard = () => (
  <>
    <Head>
      <title>
        Exception Manager 
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          {/* <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid> */}
          {/* <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCustomers />
          </Grid> */}
          {/* <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TasksProgress />
          </Grid> */}
          {/* <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid> */}
             <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
        
          >
            <ExceptionManager />

          </Grid>
    
          <Grid
            item
      
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <LatestOrderDetail />
          </Grid>
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
       
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts sx={{ height: '100%' }} />
          </Grid> */}
      
        </Grid>
      </Container>
    </Box>
  </>
);


Dashboard.getLayout = (page) => (

  

  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
