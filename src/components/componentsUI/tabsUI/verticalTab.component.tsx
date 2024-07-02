import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LoadModel from "../../ThreejsComponents/LoadModel";

import HorizontalTabs from "./horizontalTab.component";
import "./verticalTab.styles.css"

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


 const VerticalTabs=()=> {
  const [value, setValue] = React.useState(0);  

  const handleChange = (event:any, newValue:any) => {
    console.log(event)
    setValue(newValue);
  };
  
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "#F5F5F5",
        display: "flex",                
        borderRight: 1,
         borderColor: "divider" ,        
        fontSize:"12px"        
      }}
    >
      <Tabs
        orientation="vertical"
        //  variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider",overflow:"auto" }}
      >
        <Tab label="Sample Room" {...a11yProps(0)} className="top_buttons" sx={{height:'500'}}/>
        <Tab label="Furniture" {...a11yProps(1)} className="top_buttons"/>
        <Tab label="Lighting" {...a11yProps(2)} className="top_buttons"/>
        <Tab label="Paints" {...a11yProps(3)} className="top_buttons"/>
        <Tab label="Tiles" {...a11yProps(4)} className="top_buttons"/>
        <Tab label="Carpets" {...a11yProps(5)} className="top_buttons"/>
        <Tab label="Doors/Windows" {...a11yProps(6)} className="top_buttons"/>
        <Tab label="Accessories" {...a11yProps(7)} className="top_buttons"/>

        <Tab label="360Spins" {...a11yProps(8)}  style={{marginTop:"30vh"}} className="bottom_buttons"/>
        <Tab label="Measurements" {...a11yProps(9)} className="bottom_buttons"/>
        <Tab label="HD Render" {...a11yProps(10)} className="bottom_buttons"/>
        <Tab label="Collaboration" {...a11yProps(11)} className="bottom_buttons"/>
        <Tab label="Advanced" {...a11yProps(12)} className="bottom_buttons"/>
        <Tab label="Open Project" {...a11yProps(13)} className="bottom_buttons"/>
        <Tab label="Save Project" {...a11yProps(14)} className="bottom_buttons"/>        
      </Tabs>
      <TabPanel value={value} index={0}>
        {/* Sample Room */}
        <LoadModel/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <HorizontalTabs/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <HorizontalTabs/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <HorizontalTabs/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
    </Box>
  );
}
export default VerticalTabs