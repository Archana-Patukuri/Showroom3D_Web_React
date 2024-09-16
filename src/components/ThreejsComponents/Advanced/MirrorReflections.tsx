import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector.js";

const MirrorReflections = (
  event: any,
  scene: any,
  container: any,
  setWallMirror: any,
  wallMirror: any
) => {
  let mirror = scene.getObjectByName("Mirror_101");
  if (event.target.checked) {
    let wallMirrorGeo = new THREE.PlaneGeometry(0.52, 0.7);
    let wallMirror = new Reflector(wallMirrorGeo, {
      clipBias: 0.003,
      textureWidth: container.clientWidth,
      textureHeight: container.clientHeight,
      color: 0xffffff,
      multisample: 1,
    });
    setWallMirror(wallMirror);
    console.log("Wall mirror:", mirror);
    if (mirror != null) {
      const pos = mirror.position;
      wallMirror.position.copy(pos);
      wallMirror.position.z += 0.05;
      mirror.add(wallMirror);
    }
  } else {
    if (mirror != null) {
      mirror.remove(wallMirror);
    }
  }
};

export default MirrorReflections;
