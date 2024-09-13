import { createContext, useState } from "react";
import * as THREE from "three";

export const BasicContext = createContext();

export const BasicProvider = ({ children }) => {
  let [scene, setScene] = useState(new THREE.Scene());
  let [camera, setCamera] = useState(new THREE.PerspectiveCamera());
  let [controls, setControls] = useState(new THREE.Object3D());
  let [renderer, setRenderer] = useState(new THREE.WebGLRenderer());
  let [model, setModel] = useState(new THREE.Object3D());
  let [background0, setbackground0] = useState(new THREE.Object3D());
  let [background1, setbackground1] = useState(new THREE.Object3D());
  let [hdri1, sethdri1] = useState(new THREE.Object3D());
  let [hdri2, sethdri2] = useState(new THREE.Object3D());
  let [composer, setComposer] = useState("");
  let [outlinePass, setOutlinePass] = useState("");
  let [ssaoPass, setSsaoPass] = useState(new THREE.Object3D());
  let [saoPass, setSaoPass] = useState(new THREE.Object3D());
  let [renderPass, setRenderPass] = useState("");
  let [floorMirror, setFloorMirror] = useState("");
  let [groundMirror, setGroundMirror] = useState("");
  let [ssrPass, setSsrPass] = useState("");
  let [outPass, setOutPass] = useState("");
  let [stats, setStats] = useState("");
  let [gltfData, setgltfData] = useState(new THREE.Object3D());
  let [container, setContainer] = useState("");
  let value = {
    scene,
    setScene,
    camera,
    setCamera,
    controls,
    setControls,
    renderer,
    setRenderer,
    model,
    setModel,
    background0,
    setbackground0,
    background1,
    setbackground1,
    hdri1,
    sethdri1,
    hdri2,
    sethdri2,
    gltfData,
    setgltfData,
    container,
    setContainer,
    composer,
    setComposer,
    renderPass,
    setRenderPass,
    ssaoPass,
    setSsaoPass,
    saoPass,
    setSaoPass,
    groundMirror,
    setGroundMirror,
    floorMirror,
    setFloorMirror,
    ssrPass,
    setSsrPass,
    outPass,
    setOutPass,
    stats,
    setStats,
    outlinePass,
    setOutlinePass,
  };
  return (
    <BasicContext.Provider value={value}>{children}</BasicContext.Provider>
  );
};
