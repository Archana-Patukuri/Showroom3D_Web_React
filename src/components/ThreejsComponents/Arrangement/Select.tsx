
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
    Object3D,
  } from 'three';
let rayCaster = new Raycaster();    
let mouse = new Vector2(),transformControl,selectedObject
const SelectFun = () => {  
    let {scene,camera,renderer,gltfData}=useContext(BasicContext)  
    function intersect(Objects:any) {
        renderer.setRenderTarget(null);
        rayCaster.setFromCamera(mouse, camera);
        let intersectedObjectsArray = rayCaster.intersectObjects(Objects);
        return intersectedObjectsArray;
      }
    useEffect(()=>{
        const container = document.getElementById('scene-container');
        transformControl = new TransformControls(
            camera,
            renderer.domElement
          );
          const arr = intersect(scene.children);
          let tempObject:any = arr[0].object;
         /*  if (selectedObject) {            
            return;
          } */
            while (tempObject && !tempObject.name.includes('selectable')) {
                tempObject = tempObject.parent;
                if (tempObject && tempObject.name.includes('selectable')) {
                  selectedObject = tempObject;                  
                }                
              }
    })
    return <></>     
  
  }
  
    function attachComponent() {
        const domElement = document.getElementById('Dimensions');
        
        if (domElement) {
          const root = ReactDOM.createRoot(domElement);
        //   root.render(<DimensionsFunUI/>);
        }
      }   
  export default SelectFun;