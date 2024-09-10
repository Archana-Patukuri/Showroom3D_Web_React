
import { useContext, useEffect} from 'react';
import { BasicContext } from '../../../contexts/basic.context';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import {
    BoxHelper,
    Raycaster,
    SphereGeometry,
    Vector2,
    Vector3,
    MeshStandardMaterial,
    Mesh,
    LineBasicMaterial,
    BufferGeometry,
    Line,
    Box3,
    Color,
    Group,
  } from 'three';
let rayCaster = new Raycaster();    
let mouse = new Vector2(),transformControl
const TranformControls = () => {  
    let {scene,camera,renderer,gltfData}=useContext(BasicContext)  
    useEffect(()=>{
        const container = document.getElementById('scene-container');
        transformControl = new TransformControls(
            camera,
            renderer.domElement
          );
    })
    return <></>     
  
  }
  
    function attachComponent() {
        const domElement = document.getElementById('Dimensions');
        
        if (domElement) {
          const root = ReactDOM.createRoot(domElement);
        //   root.render();
        }
      }   
  export default TranformControls;