import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";

function FloorReflections(scene: any, container: any, setFloorMirror: any) {
  let groundMirrorGeo = new THREE.PlaneGeometry(3.88, 3.88);
  let groundMirror = new Reflector(groundMirrorGeo, {
    clipBias: 0.001,
    textureWidth: container.clientWidth,
    textureHeight: container.clientHeight,
    color: 0xffffff,
    multisample: 1,
  });
  groundMirror.rotateX(-Math.PI / 2);
  setFloorMirror(groundMirror);

  // let floor = scene.getObjectByName("Floor");
  // groundMirror.position.copy(floor.position);
  groundMirror.position.y = 0.0049;
  console.log("GroundMirror:", groundMirror);
  // floor.material.opacity = 0.7;
  // floor.material.transparent = true;
  // setFloor(floor);
  scene.add(groundMirror);
}

export default FloorReflections;
