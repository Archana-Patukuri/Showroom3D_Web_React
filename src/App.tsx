import './App.css';
import ThreeScene from './components/ThreejsComponents/BasicComponents/ThreeScene';
import VerticalTabs from './components/componentsUI/tabsUI/verticalTab.component';
import AccordionUsage from './components/componentsUI/accordion/accordion';
import SelectSmall from './components/componentsUI/dropdown/dropdown';
import LightControls from './components/ThreejsComponents/LightControls/LightControls';
import CameraControlsFun from './components/ThreejsComponents/Navigation/CameraControlsUI';
import Reset from './components/ThreejsComponents/Reset';
import ViewpointsFun from './components/ThreejsComponents/Viewpoints/Viewpoints';
import VariantsFun from './components/ThreejsComponents/ObjectActions/MaterialVariants';
import DimensionsFun from './components/ThreejsComponents/ObjectActions/Dimensions';
function App() {
  let label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."  
  return (            
     
     <div className="App">
      
     <div className="left-half" id='scene-container'>     
     <ThreeScene/>
     </div>
     <div className="right-half">      
      <div style={{display:"flex",flexDirection:"column"}}>   
      <div style={{display:"flex",flexDirection:"row",maxWidth:"40vw"}}>
      <div style={{maxWidth:"32vw",overflow:"auto",backgroundColor:'#F5F5F5'}}>        
        <VerticalTabs />
        </div>
        <div style={{maxWidth:"10vw",overflow:"auto",backgroundColor:'#F5F5F5'}}>
          <div style={{display:'flex',justifyContent:'space-between',padding:'5px',borderBottom:'1px solid #E5E5E5'}}>
          <Reset/>
          </div>
          <AccordionUsage accordionLabel={"Navigation"} accordionDetails={<CameraControlsFun/>} />
          <AccordionUsage accordionLabel={"Arrangement"} accordionDetails={label}/>
          <AccordionUsage accordionLabel={"Themes"} accordionDetails={<div id='Themes_Desktop'></div>}/>
          <AccordionUsage accordionLabel={"Viewpoints"} accordionDetails={<ViewpointsFun/>}/>
          {/* <AccordionUsage accordionLabel={"Dimensions"} accordionDetails={<SelectSmall/>}/>         */}
          <AccordionUsage accordionLabel={"Light Controls"} accordionDetails={<LightControls/>}/>
          <AccordionUsage accordionLabel={"Dimensions"} accordionDetails={<DimensionsFun/>}/>
          <AccordionUsage accordionLabel={"Dynamics"} accordionDetails={<div id='Dynamics'></div>}/>
          <AccordionUsage accordionLabel={"Material Variants"} accordionDetails={<div id='Material_Variants'></div>}/>
        </div>
        </div>
    </div> 
     </div>
   </div>
  );
}

export default App;
