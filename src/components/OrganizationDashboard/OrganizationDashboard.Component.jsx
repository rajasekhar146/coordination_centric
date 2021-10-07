import React, {useEffect} from 'react'
import './OrganizationDashboard.Component.css'
import Button from '@mui/material/Button';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InviteOrganization from '../../pages/invite-organization';
import TextField from '@mui/material/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

import EditIcon from '../../assets/icons/edit_icon.png'
import {organizationService} from '../../services'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid white',
  boxShadow: 24,
  borderRadius: 3,
  p: 4,
};


const options1 = [ {
    id: 1,
    label: 'Active', 
    icon: ''
  },
  {
    id: 2,
    label: 'Disabled',
    icon: ''
  },
  { 
    id: 3,
    label: 'Pending',
    icon: ''
  },
  { 
    id: 4,
    label: 'Sent',
    icon: ''
  },
  { 
    id: 5,
    label: 'Edit',
    icon: ''
  },
  { 
    id: 6,
    label: 'Resent Invitation',
    icon: ''
  },
  { 
    id: 7,
    label: 'View Details',
    icon: ''
  },
  { 
    id: 8,
    label: 'Approve',
    icon: ''
  },
  { 
    id: 9,
    label: 'Reject',
    icon: ''
  }
];

const menuList = [
  { menu: 'sent',  
    options: [{text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default}, 
              {text: 'Resent Invitation', icon: require('../../assets/icons/resent_invitation.png').default}]},
  { menu: 'pending',  
    options: [{text: 'View Details', icon: require('../../assets/icons/view_details.png').default}, 
              {text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default}, 
              {text: 'Approve', icon: require('../../assets/icons/approve.png').default}, 
              {text: 'Reject', icon: require('../../assets/icons/reject.png').default}]},
  { menu: 'declined',  
    options: [{text:'View Details', icon: require('../../assets/icons/view_details.png').default}, 
              {text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default}, 
              {text: 'Resent Invitation', icon: require('../../assets/icons/resent_invitation.png').default}, 
              {text: 'Suspend', icon: require('../../assets/icons/suspend.png').default}]},
  { menu: 'active',  
    options: [{text:'View Details', icon: require('../../assets/icons/view_details.png').default}, 
              {text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default}, 
              {text: 'Suspend', icon: require('../../assets/icons/suspend.png').default}]},
  { menu: 'invited',  
      options: [{text:'View Details', icon: require('../../assets/icons/view_details.png').default}, 
                {text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default}, 
                {text: 'Suspend', icon: require('../../assets/icons/suspend.png').default}]},
            
  { menu: 'suspended',  
    options: [{text: 'View Details', icon: require('../../assets/icons/view_details.png').default}, 
              {text: 'Edit', icon: require('../../assets/icons/edit_icon.png').default}, 
              {text: 'Activate', icon: require('../../assets/icons/activate.png').default}]}
];

const ITEM_HEIGHT = 60;

const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const statusNames = [
  'All Status',
  'Active',
  'Pending',
  'Declined',
  'Approve',
  'Reject',
  'Suspended',
  'Sent'
];

const columns1 = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: (value) => value.toFixed(2),
    },
  ];


  const columns = [
    // { id: '_id', label: 'ID', minWidth: 20, align: 'left' },
    { id: 'facilityName', label: 'Organization Name', minWidth: 200, align: 'left' },
    { id: 'facilityAddress', label: 'Address', minWidth: 200, align: 'left' },
    { id: 'status', label: 'Status', minWidth: 200, align: 'center' },
    { id: 'action', label: 'Action', minWidth: 100, align: 'center' },
    
  ];

  const createData = (name, code, population, size) => {
    const density = population / size;
    return { name, code, population, size, density };
  }
  
  const createRowData = (id, name, address, status, action) => {
    return {id, name, address, status, action };
  }
  
  const rows1 = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
  ];

  const rows = [
    createRowData(1, 'Saint Barnabas Medical Center', '3891 Ranchview Dr. Richardson, California 62639', 'Active', null),
    createRowData(2, 'St. Francis Hospital', '6391 Elgin St. Celina, Delaware 10299', 'Declined', null),
    createRowData(3, 'Montefiore Medical Center', '2118 Thornridge Cir. Syracuse, Connecticut 35624', 'Pending', null),
  ];

const OrganizationDashboardComponent = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [menuOptions, setMenuOptions] = React.useState([])
    const [IsAddOrganizationClicked, setAddOrganizationClicked] = React.useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [selectedStatus, setSelectedStatus] = React.useState([]);
    const [value, setValue] = React.useState(null);
    const [rows, setOrganizations] = React.useState([]);
    useEffect(() => {
      getOrganization()
      return () => {
        
      }
    }, [])

    const getOrganization = async () => {
      const allOrganizations = await organizationService.allOrganization()
      console.log(allOrganizations)
      if(allOrganizations != null) {
        const totalCount = allOrganizations?.totalCount
        const totalData = allOrganizations?.totalData
        console.log( 'totalCount', totalCount)
        console.log( 'totalData', totalData)
        console.log( 'bind', totalData)
        setOrganizations(totalData)
      }
      
    }

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setSelectedStatus(
        // On autofill we get a the stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };
  
    const handleClick = (event, status) => {
      setAnchorEl(event.currentTarget);
      console.log('status', status, menuOptions)
      const menus = menuList.filter(m => m.menu === status.toLowerCase());
      console.log('menus', menus)
      if(menus.length > 0)
        setMenuOptions(menus[0].options)
      else setMenuOptions([])

      console.log('menus[0].options', menus[0].options)
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleAction = (organizationId) => {
      setAnchorEl(organizationId);
    }

    const handleAddOrganizationClose = () => {
      console.log('On Click - Close button')
      setAddOrganizationClicked(false);
    }

    const handleAddOrganizationOpen = () => {
      setAddOrganizationClicked(true);
    }

    const handleMenuAction = action => {
      console.log('action', action);
      setAnchorEl(null);
    }

    return (
        <div className="od__main__div">
            <div className="od__row">
                <div className="od__title__text">Organizations</div>
                <div className="od__btn__div od__align__right"><Button className="od__add__organization__btn" onClick={handleAddOrganizationOpen}>
                <AddCircleOutlineOutlinedIcon /> &nbsp;&nbsp; Add Organization
              </Button></div>
            </div>
            <div className="od__row">
                <div className="od__left__section"><TextField id="" defaultValue="Search" className="od__serach__text" margin="normal" InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon style={{color: '#CACCCF'}} />
                    </InputAdornment>
                   )
                  }}/></div>
                <div className="od__right__section">
                <div className="od__btn__div">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    InputProps={{ className: "od__date__field" }}
                  />
                </LocalizationProvider>
                </div>
                <div className="od__btn__div">
                  <FormControl sx={{ m: 1, width: 200 }}>
                  <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={selectedStatus}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                    className="od__date__field"
                  >
                    {statusNames.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={selectedStatus.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              </div>
              </div>

            <div className="od__row">
                <div className="od__table__org">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                >
                                {column.label}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                              console.log('value', row)
                                return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    {columns.map((column) => {
                                      
                                    const value = row[column.id];
                                    
                                    return (
                                      (column.id == 'status'? (<TableCell key={column.id} align={column.align} className={`od__${value.toLowerCase()}__status`}>
                                      {column.format && typeof value === 'number'
                                          ? column.format(value)
                                          : value}
                                      </TableCell>) : column.id == 'action'? (<TableCell key={column.id} align={column.align}>
                                        <IconButton
                                            aria-label="more"
                                            id="long-button"
                                            aria-controls="long-menu"
                                            aria-expanded={open ? 'true' : undefined}
                                            aria-haspopup="true"
                                            onClick={e => handleClick(e, `${row['status']}`)}
                                          >
                                            <MoreVertRoundedIcon />
                                          </IconButton>
                                          <Menu
                                            id="long-menu"
                                            MenuListProps={{
                                              'aria-labelledby': 'long-button',
                                            }}
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            PaperProps={{
                                              style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                width: '22ch',
                                              },
                                            }}
                                          >
                                           {menuOptions.map((option, index) => (
                                              <MenuItem key={option} onClick={e => handleMenuAction(`${option.text}`)} className="od__menu__row od__menu__text">
                                                <div className="od__menu__icon__column">
                                                  <img src={option.icon} alt={option.text} />
                                                </div>       
                                                <div>{option.text}</div>                                    
                                              </MenuItem>
                                            ))}
                                          </Menu>
                                      </TableCell>) : (<TableCell key={column.id} align={column.align}>
                                        {column.format && typeof value === 'number'
                                            ? column.format(value)
                                            : value}
                                        </TableCell>))
                                    );
                                    })}
                                </TableRow>
                                );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>                    
                    </Paper>
                </div>
            </div>
            <div className="od__row">
              <div className="od__pagination__section">
                <Stack spacing={2}>
                    <Pagination count={10} variant="outlined" shape="rounded" />
                </Stack>
                </div>
            </div>   
            <Modal
                open={IsAddOrganizationClicked}
                onClose={handleAddOrganizationClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <InviteOrganization clickCloseButton={handleAddOrganizationClose} />
                </Box>
              </Modal>        

        </div>
    )
}

export default OrganizationDashboardComponent
