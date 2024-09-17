import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";
import { ReflectorForSSRPass } from "three/examples/jsm/objects/ReflectorForSSRPass";

const FloorReflections = (
  event: any,
  scene: any,
  container: any,
  setFloorMirror: any,
  floorMirror: any
) => {
  let floor = scene.getObjectByName("Floor");
  const light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);
  if (event.target.checked) {
    let groundMirrorGeo = new THREE.PlaneGeometry(3.88, 3.88);
    let groundMirror = new Reflector(groundMirrorGeo, {
      clipBias: 0.001,
      textureWidth: container.clientWidth,
      textureHeight: container.clientHeight,
      color: 0xffffff,
    });
    groundMirror.rotateX(-Math.PI / 2);
    groundMirror.position.y = 0.00065;
    floor.material.opacity = event.target.checked ? 0.0001 : 1;
    floor.material.transparent = event.target.checked ? true : false;
    setFloorMirror(groundMirror);
    scene.add(groundMirror);
  } else {
    scene.remove(floorMirror);
  }
  floor.material.opacity = event.target.checked ? 0.0001 : 1;
  floor.material.transparent = event.target.checked ? true : false;
};

export default FloorReflections;
