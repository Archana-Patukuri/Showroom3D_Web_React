import * as THREE from "three";
import { ReflectorForSSRPass } from "three/examples/jsm/objects/ReflectorForSSRPass.js";
import { SSRPass } from "three/examples/jsm/postprocessing/SSRPass";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

function MirrorReflections(
  scene: any,
  container: any,
  setGroundMirror: any,
  camera: any,
  renderer: any,
  composer: any,
  setSsrPass: any,
  setOutPass: any
) {
  let groundMirrorGeo = new THREE.PlaneGeometry(3.83, 3.88);
  let groundMirror = new ReflectorForSSRPass(groundMirrorGeo, {
    clipBias: 0.001,
    textureWidth: container.clientWidth,
    textureHeight: container.clientHeight,
    color: 0x888888,
  });
  setGroundMirror(groundMirror);
  groundMirror.rotation.x = -Math.PI / 2;
  groundMirror.material.depthWrite = false;
  // groundMirror.color.set("transparent");

  // let floor = scene.getObjectByName("Floor");
  // groundMirror.position.copy(floor.position);
  // groundMirror.position.y += 0.0001;
  // groundMirror.position.y = 0.0;
  // floor.material.transparent = true;
  // floor.material.opacity = 0.7;
  scene.add(groundMirror);
  const ssrPass = new SSRPass({
    renderer: renderer,
    scene: scene,
    camera: camera,
    width: container.clientWidth,
    height: container.clientHeight,
    groundReflector: null, // Optionally add a reflector here
    selects: null, // Optionally limit the reflection to specific objects
  });
  setSsrPass(ssrPass);
  composer.addPass(ssrPass);
  let outPass = new OutputPass();
  setOutPass(outPass);
  composer.addPass(outPass);
}

export default MirrorReflections;
