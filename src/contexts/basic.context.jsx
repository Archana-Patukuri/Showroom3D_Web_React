import { createContext, useState } from 'react';
import * as THREE from 'three';

export const BasicContext = createContext();

export const BasicProvider = ({ children }) => {
  let [scene, setScene] = useState(new THREE.Scene());
  let [camera, setCamera] = useState(new THREE.PerspectiveCamera());
  let [controls, setControls] = useState(new THREE.Object3D());
  let [renderer, setRenderer] = useState(new THREE.WebGLRenderer()); 
  let [model, setModel] = useState(new THREE.Object3D());
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
    setModel
  };
  return (
    <BasicContext.Provider value={value}>{children}</BasicContext.Provider>
  );
};
