import { useState,useEffect } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { useRouter } from 'next/router';




const DashboardLayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  backdropFilter: 'blur(30px)',
  backgroundColor: 'rgba(16, 185, 129, 0.3)',
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280
  }
}));

export const DashboardLayout = (props) => {
  
  const { children } = props;
  const router = useRouter();

  const [isSidebarOpen, setSidebarOpen] = useState(true);


  // useEffect(() => {
  //   if(typeof(window) != "undefined"){
  //     if((localStorage.getItem("token")==null )){
  //       router.push("/login")
  //     }
  //   }  
  // }, [])

  return (
    <>
      <DashboardLayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}
        >
          {children}
        </Box>
      </DashboardLayoutRoot>
      <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
      <Box sx={{ zIndex: '-1', position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', backgroundImage: 'url(images/images.jpg)', backgroundSize: 'cover', }}/>
    </>
  );
};
