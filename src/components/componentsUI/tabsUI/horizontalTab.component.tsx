import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import './verticalTab.styles.css';

function TabPanel(props:any) {
  const { children, value, index, ...other } = props;

  return (
    <div    
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index:any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

 const HorizontalTabs=()=> {
  const [value, setValue] = React.useState(0);

  const handleChange = (event:any, newValue:any) => {
    console.log(event)
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",              
        maxWidth:"100vw",      
      }}
    >
      <Tabs        
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"             
      >
        <Tab label="Chair" {...a11yProps(0)} className="text_Transform"/>
        <Tab label="Table" {...a11yProps(1)} className="text_Transform"/>
        <Tab label="Sofa" {...a11yProps(2)} className="text_Transform"/>                
      </Tabs>
      <TabPanel value={value} index={0}>
        Chair 
      </TabPanel>
      <TabPanel value={value} index={1}>
        Table
      </TabPanel>
      <TabPanel value={value} index={2}>
        Sofa
      </TabPanel>
      
    </Box>
  );
}
export default HorizontalTabs