import { useEffect, useState, useContext } from "react";
import { BasicContext } from "../../../contexts/basic.context";
import { SSAARenderPass } from "three/examples/jsm/postprocessing/SSAARenderPass.js";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import { TAARenderPass } from "three/examples/jsm/postprocessing/TAARenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import SAOPASS from "./SAOPASS";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import SSAOPASS from "./SSAOPASS";
import FloorReflections from "./FloorReflections";
import MirrorReflections from "./MirrorReflections";
import "./AdvancedItems.css";

let fxaaPass, ssaaPass, smaaPass, taaPass;
function AdvancedItems() {
  const [taa, setTaa] = useState(false);
  const [fxaa, setFxaa] = useState(false);
  const [ssaa, setSsaa] = useState(false);
  const [smaa, setSmaa] = useState(true);
  const [hdri, setHdri] = useState(true);
  let {
    renderer,
    camera,
    scene,
    container,
    composer,
    renderPass,
    ssaoPass,
    setSsaoPass,
    saoPass,
    setSaoPass,
    wallMirror,
    setWallMirror,
    floorMirror,
    setFloorMirror,
    stats,
    setHdriExposure,
  } = useContext(BasicContext);

  const onChangeStats = (event: any) => {
    if (event.target.checked) {
      document.body.appendChild(stats.dom);
    } else {
      document.body.removeChild(stats.dom);
    }
  };

  const HDRIExposure = (event: any) => {
    if (hdri) {
      setHdriExposure(event.target.value);
      renderer.toneMappingExposure = event.target.value;
    } else {
      renderer.toneMappingExposure = 0.5;
    }
  };

  const onChangeHDRIExposure = (event: any) => {
    setHdri(event.target.checked);
  };

  useEffect(() => {
    renderPass.clearAlpha = 0;
    renderer.autoClear = false;

    fxaaPass = new ShaderPass(FXAAShader);
    ssaaPass = new SSAARenderPass(scene, camera);
    smaaPass = new SMAAPass(
      window.innerWidth * renderer.getPixelRatio(),
      window.innerHeight * renderer.getPixelRatio()
    );
    taaPass = new TAARenderPass(scene, camera);
    taaPass.sampleLevel = 2;

    const outputPass = new OutputPass();
    const pixelRatio = renderer.getPixelRatio();

    fxaaPass.material.uniforms["resolution"].value.x =
      1 / (container.offsetWidth * pixelRatio);
    fxaaPass.material.uniforms["resolution"].value.y =
      1 / (container.offsetHeight * pixelRatio);

    composer.addPass(renderPass);
    if (taa) {
      composer.addPass(taaPass);
    } else {
      composer.removePass(taaPass);
    }
    if (ssaa) {
      composer.addPass(ssaaPass);
    } else {
      composer.removePass(ssaaPass);
    }
    if (smaa) {
      composer.addPass(smaaPass);
    } else {
      composer.removePass(smaaPass);
    }
    if (fxaa) {
      composer.addPass(fxaaPass);
    } else {
      composer.removePass(fxaaPass);
    }

    composer.addPass(outputPass);
  }, [fxaa, ssaa, smaa, taa]);

  return (
    <div style={{ margin: "0px" }}>
      <p className="advanceItemsHeading">Advanced Light Controls</p>
      <hr style={{ margin: "0px" }}></hr>
      <div className="advancedItemsDiv">
        <div className="advancedItemsContainer">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label className="advancedItem">
              <input
                type="checkBox"
                onChange={onChangeHDRIExposure}
                checked={hdri}
              />
              HDRI
            </label>
            <Box sx={{ width: "5vw ", paddingLeft: "4px" }}>
              <Slider
                valueLabelDisplay="auto"
                // slots={{
                //   valueLabel: ValueLabelComponent,
                // }}
                aria-label="custom thumb label"
                defaultValue={0.5}
                onChange={HDRIExposure}
                step={0.1}
                min={0}
                max={1}
              />
            </Box>
          </div>
          <label className="advancedItem">
            <input type="checkBox" />
            Emissive Light
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            Shadows SunLight
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            Shadows NightLight
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            Initial Shadows
          </label>
          <label className="advancedItem">
            <input
              type="checkBox"
              onChange={(event) =>
                MirrorReflections(
                  event,
                  scene,
                  container,
                  setWallMirror,
                  wallMirror
                )
              }
            />
            Mirror Reflections
          </label>
          <label className="advancedItem">
            <input
              type="checkBox"
              onChange={(event) =>
                FloorReflections(
                  event,
                  scene,
                  container,
                  setFloorMirror,
                  floorMirror
                )
              }
            />
            Floor Reflections
          </label>
          <label className="advancedItem">
            <input
              type="checkBox"
              onChange={(e) =>
                SSAOPASS(
                  e,
                  scene,
                  camera,
                  composer,
                  container,
                  ssaoPass,
                  setSsaoPass
                )
              }
            />
            SSAO
          </label>
          <label className="advancedItem">
            <input
              type="checkBox"
              onChange={(event) =>
                SAOPASS(event, scene, camera, composer, saoPass, setSaoPass)
              }
            />
            SAO
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            Export Scene State
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            Show Box Collider
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            Collide with only walls
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            Enable Physics Debugger
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            Version
          </label>
        </div>
        <div className="advancedItemsContainer">
          <label className="advancedItem">
            <input
              type="checkBox"
              id="taa_label"
              onChange={(event) => setTaa(event.target.checked)}
            />
            TAA
          </label>
          <label className="advancedItem">
            <input
              type="checkBox"
              onChange={(event) => setFxaa(event.target.checked)}
            />
            FXAA
          </label>
          <label className="advancedItem">
            <input
              type="checkBox"
              onChange={(event) => setSsaa(event.target.checked)}
            />
            SSAA
          </label>
          <label className="advancedItem">
            <input
              type="checkBox"
              checked={smaa}
              onChange={(event) => setSmaa(event.target.checked)}
            />
            SMAA
          </label>
          <label className="advancedItem">
            <input type="checkBox" onChange={onChangeStats} />
            Stats
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            GUI
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            SSR
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            Bloom
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            Prompt
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            Console
          </label>
          <label className="advancedItem">
            <input type="checkBox" />
            Export
          </label>
          <label className="advancedItem">
            <select
              style={{
                width: "40px",
                height: "15px",
                marginBottom: "5px",
                marginRight: "5px",
                fontSize: "10px",
              }}
            >
              <option style={{ fontSize: "10px" }}>1</option>
              <option style={{ fontSize: "10px" }}>.75</option>
              <option style={{ fontSize: "10px" }}>.5</option>
              <option style={{ fontSize: "10px" }}>.25</option>
            </select>
            PixelRation
          </label>
          <label className="advancedItem">
            <select
              style={{
                width: "35px",
                height: "15px",
                marginBottom: "5px",
                marginRight: "5px",
                fontSize: "10px",
              }}
            >
              <option style={{ fontSize: "10px" }}>0</option>
              <option style={{ fontSize: "10px" }}>1</option>
              <option style={{ fontSize: "10px" }}>2</option>
              <option style={{ fontSize: "10px" }}>3</option>
            </select>
            ShadowMapType
          </label>
        </div>
      </div>
    </div>
  );
}

export default AdvancedItems;
