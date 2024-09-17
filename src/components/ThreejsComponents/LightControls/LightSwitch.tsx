import React from 'react';
import CustomizedSwitches from '../../componentsUI/switch/switch.component';
import CustomizedSlider from '../../componentsUI/slider/slider';
import ColorPicker from '../../componentsUI/colorPicker/ColorPicker';
import CustomDayNightSwitch from '../../componentsUI/switch/switch.component1';
const LightControls: React.FC = () => {   
  return <>
  <CustomDayNightSwitch/>
  <CustomizedSwitches label='light'/>  
  <CustomizedSlider/>
  <ColorPicker/>
  </>
};

export default LightControls;
