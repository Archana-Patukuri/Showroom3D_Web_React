import { useContext } from "react";
import { SSAOPass } from "three/examples/jsm/postprocessing/SSAOPass.js";
import { BasicContext } from "../../../contexts/basic.context";
function SSAOPASS(
  event: any,
  scene: any,
  camera: any,
  composer: any,
  container: any,
  ssaoPass: any,
  setSsaoPass: any
) {
  if (event.target.checked) {
    ssaoPass = new SSAOPass(
      scene,
      camera,
      container.clientWidth,
      container.clientHeight
    );
    ssaoPass.kernelRadius = 0.5;
    ssaoPass.minDistance = 0.0001;
    ssaoPass.maxDistance = 0.02;
    setSsaoPass(ssaoPass);
    composer.addPass(ssaoPass);
  } else {
    composer.removePass(ssaoPass);
  }
}

export default SSAOPASS;
