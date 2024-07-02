import PropTypes from "prop-types";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { BasicContext } from '../../../contexts/basic.context';
import { useContext} from 'react';

function ValueLabelComponent(props:any) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};



export default function CustomizedSlider() {
  let {scene}=useContext(BasicContext)    
  const IntensityControl=(event:any)=>{
    let lightObj:any=scene.getObjectByName("Lamp_Light_104")       
   if(lightObj){
    lightObj.intensity=event.target.value
   }
    
  } 
  return (
    <Box sx={{ width: "8vw "}}>                     
      <Slider
        valueLabelDisplay="auto"
        slots={{
          valueLabel: ValueLabelComponent,
        }}
        aria-label="custom thumb label"
        defaultValue={2}
        onChange={(event)=>IntensityControl(event)}
        step={0.1} min={0} max={10} 
      />
    </Box>
  );
}
