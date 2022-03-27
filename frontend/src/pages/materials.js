import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { CustomerListResults } from '../components/material/material-list-results';
import { CustomerListToolbar } from '../components/material/material-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/customers';

const Customers = () => (
  <div style={{marginTop:"-4%"}}>
  
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 0
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ mt: 0 }}>
          <CustomerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </div>
);
Customers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Customers;
