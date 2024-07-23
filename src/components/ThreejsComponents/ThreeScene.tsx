import React, { useRef, useEffect ,useContext} from 'react';
import * as THREE from 'three';
import GLTFLoaderFun from './ModelLoader/GltfLoader/GLTFLoader';
import { BasicContext } from '../../contexts/basic.context';
import TWEEN from '@tweenjs/tween.js';
import {  createCamera,createCameraControls, createRenderer } from './BasicComponents';
import HdriLoad from './ModelLoader/HdriLoader/HdriLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import PostProcessing from './PostProcessing/post-processing';

let composer:any,container:any
const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);    
  let { scene,setCamera,setControls,setRenderer}=useContext(BasicContext)
  let url='https://d3t7cnf9sa42u5.cloudfront.net/compressed_models/Room/Roop_physics_2.glb'
  GLTFLoaderFun(scene,url)   
  HdriLoad(scene)
  useEffect(() => {                
    const camera = createCamera(mountRef.current);
    const renderer = createRenderer(mountRef.current);
   const controls=createCameraControls(camera,renderer)     
  setCamera(camera)
  setRenderer(renderer)
  setControls(controls)
  composer = new EffectComposer(renderer);
  
     const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
    scene.background=new THREE.Color(1,1,1) 
   
    PostProcessing(composer,scene,camera)
    renderer.toneMappingExposure=1
     camera.position.z = 4;    
    camera.position.y = 1.5; 
    
    const renderScene = () => {
      requestAnimationFrame(renderScene);
      TWEEN.update();
      // renderer.render(scene, camera);
      composer.render();
      composer.renderer.renderLists.dispose();
      
    };

    renderScene();

    const handleResize = () => {
      camera.aspect = (window.innerWidth / 2) / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      // composer.setPixelRatio(window.devicePixelRatio * val);
    };

    window.addEventListener('resize', handleResize);
    container=mountRef.current
    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scene,setCamera,setControls,setRenderer ]);

  return <div ref={mountRef} style={{width:'60vw',height:'100vh'}}/>;
};

export default ThreeScene;
