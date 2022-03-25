import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';

import {healthScore} from '../../../health-score';
import {exceptionViewer} from '../../../Exception-Viewer-Widget-Datasheet';

import { useState } from 'react';



const orders = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  }
];

export const LatestOrders = (props) => {
  const [selectedMaterial,setSelectedMaterial] = useState(healthScore.slice(0,1));


return(
    <>
    <Card {...props}>
    <CardHeader title="Part Lookup" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Material ID
              </TableCell>
              <TableCell>
                Date
              </TableCell>
              {/* <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell> */}
              <TableCell>
                Supplier Number
              </TableCell>
              <TableCell>
                Health Score
              </TableCell>
              <TableCell>
                Material Description
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {healthScore.slice(30,35).map((order,index) => (
              <TableRow
                hover
                key={order.materialID}
                onClick={()=>{setSelectedMaterial(healthScore.slice(index,index+1))}}
              >
                <TableCell>
                 {order.materialID}
                </TableCell>
                <TableCell>
                  {order.healthscoredate}
                </TableCell>
                <TableCell>
                  {order.suppliernumber}
                </TableCell>

                <TableCell>
                  {order.healthstatus}
                </TableCell>

                <TableCell>
                  {order.partdescriptioneng}
                </TableCell>
          
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon fontSize="small" />}
        size="small"
        variant="text"
      >
        View all
      </Button>
    </Box>
  </Card>
  <Card {...props}>
    <CardHeader title="Part Detailed  Description" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Material ID
              </TableCell>
              <TableCell>
                Safety Stock
              </TableCell>
              {/* <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell> */}
              <TableCell>
                Part Description Eng
              </TableCell>
              <TableCell>
                Plant
              </TableCell>
              <TableCell>
                Storage Location
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedMaterial.map((order) => (
              <TableRow
                hover
                key={order.materialID}
              >
                <TableCell>
                 {order.materialID}
                </TableCell>
                <TableCell>
                  {order.safetystock}
                </TableCell>
                <TableCell >
                  {order.partdescriptioneng}
                </TableCell>

                <TableCell>
                  {order.plant}
                </TableCell>

                <TableCell>
                  {order.storagelocation}
                </TableCell>
          
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >

    </Box>
  </Card>
  </>

)};


export const LatestOrderDetail= (props) => {
 const [selectedMaterial,setSelectedMaterial] = useState(healthScore.slice(0,1));

 return(<Card {...props}>
    <CardHeader title="Part Detailed Information" />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Material ID
              </TableCell>
              <TableCell>
              ExceptionCount
              </TableCell>
              {/* <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell> */}
              <TableCell>
              Percentage

              </TableCell>
              <TableCell>
              Part Description

              </TableCell>
              <TableCell>
              Part Description Eng

              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {exceptionViewer.map((order) => (
              <TableRow
                hover
                key={order.MaterialID}
              >
                 <TableCell>
                 {order.MaterialID}
                </TableCell>

                <TableCell>
                 {order.ExceptionCount}
                </TableCell>
                <TableCell>
                  {order.Percentage}
                </TableCell>
                <TableCell >
                  {order.PartDescription}
                </TableCell>

                <TableCell>
                  {order.PartDescriptionEng}
                </TableCell>

            
          
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >

    </Box>
  </Card>
)
}
