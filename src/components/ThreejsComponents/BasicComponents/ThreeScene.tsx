import { useRef, useEffect, useContext } from "react";
import GLTFLoaderFun from "../ModelLoader/GltfLoader/GLTFLoader";
import { BasicContext } from "../../../contexts/basic.context";
import TWEEN from "@tweenjs/tween.js";
import {
  createCamera,
  createCameraControls,
  createRenderer,
} from "./BasicComponents";
import HdriLoad from "../ModelLoader/HdriLoader/HdriLoader";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
// import PostProcessing from "../PostProcessing/post-processing";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module.js";
// import DragAndDrop from "../DragAndDrop/DragAndDrop";

let container: any, labelRenderer: any, selectedObjects: any;
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  let {
    scene,
    setCamera,
    setControls,
    setRenderer,
    background1,
    hdri1,
    setContainer,
    setLabelRenderer,
    composer,
    setComposer,
    renderPass,
    setRenderPass,
    stats,
    setStats,
    outlinePass,
    setOutlinePass,
  } = useContext(BasicContext);

  scene.background = background1;
  scene.environment = hdri1;
  let url =
    "https://d3t7cnf9sa42u5.cloudfront.net/compressed_models/Room/Roop_physics_2.glb";
  let url1 =
    "https://d3t7cnf9sa42u5.cloudfront.net/compressed_models/Blinds/blind_03/Blinds_03_v01_draco.glb";

  const fetchData = async () => {
    try {
      let d = await GLTFLoaderFun(scene, url);
      // setgltfData(d)
      console.log(d);
      let d1 = await GLTFLoaderFun(scene, url1);
      // setgltfData(d1)
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  // DragAndDrop();
  HdriLoad();
  useEffect(() => {
    fetchData();
    const camera = createCamera(mountRef.current);
    const renderer = createRenderer(mountRef.current);
    renderer.autoClear = false;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.5;
    const controls = createCameraControls(camera, renderer);
    setCamera(camera);
    setRenderer(renderer);
    setControls(controls);
    composer = new EffectComposer(renderer);
    setComposer(composer);

    renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    setRenderPass(renderPass);

    // PostProcessing(composer, scene, camera);
    camera.position.z = 4;
    camera.position.y = 1.5;

    let stats = new Stats();
    setStats(stats);

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      composer.setSize(container.clientWidth, container.clientHeight);
      labelRenderer.setSize(container.clientWidth, container.clientHeight);
      // composer.setPixelRatio(window.devicePixelRatio);
    };

    const addSelectedObject = (object: any) => {
      selectedObjects = [];
      selectedObjects.push(object);
    };

    const selectedObjectByChild = (obj: any): "" | null => {
      if (obj.userData.isContainer) return obj;
      else if (obj.parent != null) return selectedObjectByChild(obj.parent);
      else return null;
    };

    const onClickMove = (event: any) => {
      console.log("Entered to onMove");
      event.preventDefault();

      pointer.x = (event.clientX / container.clientWidth) * 2 - 1;
      pointer.y = -(event.clientY / container.clientHeight) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);

      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        let selectedObject = selectedObjectByChild(intersects[0].object);
        addSelectedObject(selectedObject);
        if (selectedObjects != null) {
          outlinePass.selectedObjects = selectedObjects;
        }
      } else {
        outlinePass.selectedObjects = [];
      }
    };

    window.addEventListener("resize", handleResize);
    // renderer.domElement.addEventListener("click", onClickMove);
    container = mountRef.current;
    setContainer(container);
    labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(container.clientWidth, container.clientHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0px";
    labelRenderer.domElement.style.pointerEvents = "none";
    console.log("LabelRenderer data:", labelRenderer);

    outlinePass = new OutlinePass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      scene,
      camera
    );
    outlinePass.visibleEdgeColor.set("red");
    outlinePass.edgeStrength = Number(10);
    outlinePass.edgeThickness = Number(1);
    outlinePass.edgeGlow = Number(0);
    outlinePass.pulsePeriod = Number(0);
    setOutlinePass(outlinePass);
    composer.addPass(outlinePass);

    const outputPass = new OutputPass();
    composer.addPass(outputPass);
    mountRef.current?.appendChild(labelRenderer.domElement);

    const renderScene = () => {
      requestAnimationFrame(renderScene);
      TWEEN.update();
      // renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      stats.begin();
      composer.render();
      stats.end();
      composer.renderer.renderLists.dispose();
    };

    renderScene();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    scene,
    setCamera,
    setControls,
    setRenderer,
    setContainer,
    setLabelRenderer,
  ]);

  return (
    <>
      <div ref={mountRef} style={{ width: "60vw", height: "100vh" }} />
    </>
  );
};

export default ThreeScene;
