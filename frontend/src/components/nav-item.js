import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ListItem, SvgIcon } from '@mui/material';
import styles from '../styles/dashboard-sidebar.module.scss';

export const NavItem = (props) => {
  const { href, icon, title, ...others } = props;
  const router = useRouter();
  const active = href ? (router.pathname === href) : false;

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
      {...others}
    >
      <NextLink
        href={href}
        passHref
      >
        <Button
          component="a"  
           startIcon={<SvgIcon className={styles.startIcon}
          size="large">{icon}</SvgIcon>}
                    disableRipple
                    sx={{
                      // backgroundColor: active && 'rgba(255,255,255, 0.08)',
                      borderRadius: 1,
                      startIcon: { width: '36px'},
                      // color: active ? 'secondary.main' : 'neutral.300',
                      fontWeight: active && 'fontWeightBold',
                      justifyContent: 'flex-start',
                      px: 3,
                      textAlign: 'left',
                      textTransform: 'none',
                      width: '100%',
                    }}
                    className={`${styles.navItem} ${active && styles.navItem__active}`}
        
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
        </Button>
      </NextLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string
};
