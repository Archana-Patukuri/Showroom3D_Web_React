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
import DimensionsFunUI from './components/ThreejsComponents/ObjectActions/Dimensions';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Arrangements from "./components/ThreejsComponents/Navigation/Arrangements";

function App() {
  let label =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.";
  return (
    <div className="App">
      <div className="left-half" id="scene-container">
        <ThreeScene />
      </div>
      <div className="right-half">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "40vw",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "40vw",
              justifyContent: "",
            }}
          >
            <div
              style={{
                width: "30vw",
                overflow: "auto",
                backgroundColor: "#F5F5F5",
              }}
            >
              <VerticalTabs />
            </div>
            <div
              style={{
                width: "10vw",
                overflow: "auto",
                backgroundColor: "#F5F5F5",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                  borderBottom: "1px solid #E5E5E5",
                }}
              >
                <Reset />
              </div>
              <AccordionUsage
                accordionLabel={"Navigation"}
                accordionDetails={<CameraControlsFun />}
              />
              <AccordionUsage
                accordionLabel={"Arrangement"}
                accordionDetails={<Arrangements />}
              />
              <AccordionUsage
                accordionLabel={"Themes"}
                accordionDetails={<div id="Themes_Desktop"></div>}
              />
              <AccordionUsage
                accordionLabel={"Viewpoints"}
                accordionDetails={<ViewpointsFun />}
              />
              {/* <AccordionUsage accordionLabel={"Dimensions"} accordionDetails={<SelectSmall/>}/>         */}
              <AccordionUsage
                accordionLabel={"Light Controls"}
                accordionDetails={<LightControls />}
              />
              <AccordionUsage
                accordionLabel={"Dimensions"}
                accordionDetails={<div id="Dimensions"></div>}
              />
              {/* <AccordionUsage accordionLabel={"Dynamics"} accordionDetails={<div id='Dynamics'></div>}/> */}
              <AccordionUsage
                accordionLabel={"Material Variants"}
                accordionDetails={<div id="Material_Variants"></div>}
              />
            </div>
          </div>
         {/*  <AccordionUsage accordionLabel={"Navigation"} accordionDetails={<CameraControlsFun/>} />
          <AccordionUsage accordionLabel={"Arrangement"} accordionDetails={label}/>
          <AccordionUsage accordionLabel={"Themes"} accordionDetails={<div id='Themes_Desktop'></div>}/>
          <AccordionUsage accordionLabel={"Viewpoints"} accordionDetails={<ViewpointsFun/>}/> */}
          {/* <AccordionUsage accordionLabel={"Dimensions"} accordionDetails={<SelectSmall/>}/>         */}
 {/*          <AccordionUsage accordionLabel={"Light Controls"} accordionDetails={<LightControls/>}/>
          <AccordionUsage accordionLabel={"Dimensions"} accordionDetails={<div id='Dimensions'></div>}/> */}
          {/* <AccordionUsage accordionLabel={"Dynamics"} accordionDetails={<div id='Dynamics'></div>}/> */}
          {/* <AccordionUsage accordionLabel={"Material Variants"} accordionDetails={<div id='Material_Variants'></div>}/> */}
          <BrowserRouter>
          <Routes>          
          <Route path="/">
          <Route path="Navigation" element={<AccordionUsage accordionLabel={"Navigation"} accordionDetails={<CameraControlsFun/>} />} />
          <Route path="Arrangement" element={<AccordionUsage accordionLabel={"Arrangement"} accordionDetails={label}/>} />
          <Route path="Themes" element={<AccordionUsage accordionLabel={"Themes"} accordionDetails={<div id='Themes_Desktop'></div>}/>} />
          <Route path="Viewpoints" element={ <AccordionUsage accordionLabel={"Viewpoints"} accordionDetails={<ViewpointsFun/>}/>} />
          <Route path="LightControls" element={<AccordionUsage accordionLabel={"Light Controls"} accordionDetails={<LightControls/>}/>} />
          <Route path="Dimensions" element={<AccordionUsage accordionLabel={"Dimensions"} accordionDetails={<div id='Dimensions'></div>}/>} />
          <Route path="MaterialVariants" element={<AccordionUsage accordionLabel={"Material Variants"} accordionDetails={<div id='Material_Variants'></div>}/>} />
                    
          </Route>
          </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
