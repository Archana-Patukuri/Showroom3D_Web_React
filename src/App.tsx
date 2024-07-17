import './App.css';
import ThreeScene from './components/ThreejsComponents/ThreeScene';
import VerticalTabs from './components/componentsUI/tabsUI/verticalTab.component';
import AccordionUsage from './components/componentsUI/accordion/accordion';
import SelectSmall from './components/componentsUI/dropdown/dropdown';
import LightControls from './components/ThreejsComponents/LightControls/LightControls';
import ViewpointsFun from './components/ThreejsComponents/Viewpoints/Viewpoints';
import CameraControlsFun from './components/ThreejsComponents/Navigation/CameraControls';

function App() {
  let label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."  
  return (            
     
     <div className="App">
      
     <div className="left-half" id='scene-container'>
     {/* <Renderer/> */}
     <ThreeScene/>
     </div>
     <div className="right-half">      
      <div style={{display:"flex",flexDirection:"column"}}>   
      <div style={{display:"flex",flexDirection:"row",maxWidth:"40vw"}}>
      <div style={{maxWidth:"32vw",overflow:"auto",backgroundColor:'#F5F5F5'}}>        
        <VerticalTabs />
        </div>
        <div style={{maxWidth:"10vw",overflow:"auto",backgroundColor:'#F5F5F5'}}>
          <AccordionUsage accordionLabel={"Navigation"} accordionDetails={<CameraControlsFun/>} slider="true"/>
          <AccordionUsage accordionLabel={"Arrangement"} accordionDetails={label}/>
          <AccordionUsage accordionLabel={"Themes"} accordionDetails={<div id='Themes_Desktop'></div>}/>
          <AccordionUsage accordionLabel={"Viewpoints"} accordionDetails={<ViewpointsFun/>}/>
          <AccordionUsage accordionLabel={"Dimensions"} accordionDetails={<SelectSmall/>}/>
          <AccordionUsage accordionLabel={"Light Controls"} accordionDetails={<LightControls/>}/>
        </div>
        </div>
    </div> 
     </div>
   </div>
  );
}

export default App;
