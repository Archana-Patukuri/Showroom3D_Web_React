import * as THREE from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls.js";

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
// let selectedObjects: any;

const UpdateArrangements = (
  event: any,
  controls: any,
  renderer: any,
  type: string,
  camera: any,
  scene: any,
  container: any,
  composer: any,
  selectedObject: any,
  setSelectedObject: any,
  boxHelper: any,
  setBoxHelper: any,
  transformControls: any,
  setTransformControls: any
) => {
  const getContainerObjByChild = (obj: any): any => {
    if (obj.userData.isContainer) return obj;
    else if (obj.parent != null) return getContainerObjByChild(obj.parent);
    else return null;
  };

  const onClick = (event: any) => {
    event.preventDefault();
    mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
      let clickedObject = getContainerObjByChild(intersects[0].object);
      if (selectedObject !== clickedObject) {
        setSelectedObject(clickedObject);
        boxHelper = new THREE.BoxHelper(clickedObject, 0xff0000);
        setBoxHelper(boxHelper);
        scene.add(boxHelper);
        transformControls = new TransformControls(camera, renderer.domElement);
        transformControls.attach(clickedObject);
        setTransformControls(transformControls);
        scene.add(transformControls);
      } else {
        scene.remove(boxHelper);
        if (transformControls != "") {
          transformControls.detach();
          scene.remove(transformControls);
        }
      }
    } else {
      console.log("Entered to else");
    }
  };

  // const addSelectedObject = (object: any) => {
  //   selectedObjects = [];
  //   selectedObjects.push(object);
  // };

  switch (type) {
    case "rotate":
      if (event.target.checked) {
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enabled = false;
        controls.enableRotate = false;
        controls = false;
        renderer.domElement.addEventListener("click", onClick);
      } else {
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.enabled = true;
        controls.enableRotate = true;
        controls = true;
        renderer.domElement.removeEventListener("click", onClick);
      }
  }
};

export default UpdateArrangements;
