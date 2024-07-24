import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
// import TWEEN from '@tweenjs/tween.js';
import {
    WebGLRenderer,
    ACESFilmicToneMapping,    
    PCFSoftShadowMap,
  } from 'three';

export const createCamera = (mount:any) => {
  const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
  return camera;
};

export const createCameraControls = (camera:any,renderer:any) => {
    const controls = new OrbitControls(camera, renderer.domElement);       
     controls.minPolarAngle = 1.3;
    controls.maxPolarAngle = 1.6;
    controls.minDistance = 2;
    controls.maxDistance = 20;
    controls.target.set(0, 1.5, 0);  
    return controls;
  };

export const createRenderer = (mount:any) => {
  
const renderer = new WebGLRenderer({ antialias: true });
  mount.appendChild(renderer.domElement);
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  
  renderer.toneMapping = ACESFilmicToneMapping;  
  renderer.shadowMap.enabled = true;  
  renderer.shadowMap.type = PCFSoftShadowMap;  

  renderer.xr.enabled = true;
//   renderer.setPixelRatio(window.devicePixelRatio * 0.1);  
  return renderer;

};

/* 
export const animate = (renderer:any, scene:any, camera:any) => {
  function animation() {
    requestAnimationFrame(animation);
    TWEEN.update()
    renderer.render(scene, camera);
    
  }
  animation();
}; */