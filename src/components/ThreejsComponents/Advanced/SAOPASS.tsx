import { compose } from "@reduxjs/toolkit";
import { SAOPass } from "three/examples/jsm/postprocessing/SAOPass";

function SAOPASS(
  event: any,
  scene: any,
  camera: any,
  composer: any,
  saoPass: any,
  setSaoPass: any
) {
  if (event.target.checked) {
    saoPass = new SAOPass(scene, camera);
    saoPass["params"]["output"] = SAOPass.OUTPUT.Default;
    saoPass["params"]["saoBias"] = 1;
    saoPass["params"]["saoIntensity"] = 0.001;
    saoPass["params"]["saoScale"] = 1;
    saoPass["params"]["saoKernelRadius"] = 100;
    saoPass["params"]["saoMinResolution"] = 0;
    saoPass["params"]["saoBlur"] = true;
    saoPass["params"]["saoBlurRadius"] = 10;
    saoPass["params"]["saoBlurStdDev"] = 4;
    saoPass["params"]["saoBlurDepthCutoff"] = 0.02;
    setSaoPass(saoPass);
    composer.addPass(saoPass);
  } else {
    composer.removePass(saoPass);
  }
}

export default SAOPASS;
