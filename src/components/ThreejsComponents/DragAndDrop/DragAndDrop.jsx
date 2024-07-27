import { Group, Raycaster, Vector2 } from 'three';
import  { useContext} from 'react';
import { BasicContext } from '../../../contexts/basic.context';
import assets from '../../../assets.json';
import GLTFLoaderFun from '../ModelLoader/GltfLoader/GLTFLoader';

let rayCaster = new Raycaster();
let mouse = new Vector2();
let dragged;
let dropTarget;
let dragStartX = 0;
let dragStartY = 0;

const DragAndDrop= () => {   
  let {scene,camera,container}=useContext(BasicContext) 
 /*  document.addEventListener('dragstart', (e) => {
    e.preventDefault();
  }); */
  function attachEvents() {
    document.addEventListener('mousedown', (e) => DragStart(e));
    document.addEventListener('mousemove', (e) => DragMove(e));
    document.addEventListener('mouseup', (e) => DragEnd(e));  
  }
    const DragStart=(e)=>{  
      dragStartX = e.clientX;
      dragStartY = e.clientY;         
      dragged=true
    }
    const DragMove=(e)=>{           
      if (!dragged) return;
      /* const x = e.clientX;
      const y = e.clientY; */
    
    }
   const updateMousePosition=(e)=> {
      mouse.x = (e.clientX / container.clientWidth) * 2 - 1;
      mouse.y = -(e.clientY / container.clientHeight) * 2 + 1;
    }
  
    const intersect=(e) =>{
      updateMousePosition(e);
      rayCaster.setFromCamera(mouse, camera);
     let intersectedObjectsArray = rayCaster.intersectObjects(
        scene
      );
      console.log(intersectedObjectsArray);
      return intersectedObjectsArray;
    }
    const DragEnd=(e)=>{           
      if (!dragged) return;
      const arr = intersect(e);
      const floor = arr.find((item) => item.object.name === 'Floor');
      console.log(floor)
      console.log(e.target)
     /*  const data = assets[e.target.dataset.category].find(
        (item) => item.URL === e.target.dataset.modelurl
      );*/
      if(e.target.id){
      const modelScene = GLTFLoaderFun(scene,e.target.id)
      if (floor?.point) {
        modelScene.position.copy(floor.point);        
      } 
    }

    }
    attachEvents()
  return 
};
export default DragAndDrop;
