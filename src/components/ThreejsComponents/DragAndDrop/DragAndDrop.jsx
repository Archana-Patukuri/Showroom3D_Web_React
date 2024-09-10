import { Group, Raycaster, Vector2 } from 'three';
import  { useContext} from 'react';
import { BasicContext } from '../../../contexts/basic.context';
// import assets from '../../../assets.json';
import GLTFLoaderFun from '../ModelLoader/GltfLoader/GLTFLoader';
// import MaterialVariantsFun from '../ObjectActions/MaterialVariants';

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
  });  */
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
        scene.children
      );
      // console.log(intersectedObjectsArray);
      return intersectedObjectsArray;
    }
    async function DragEnd(e){           
      if (!dragged) return;
      /*  if(e.target.id){
        return
      }  */
      // console.log(scene)
      const arr = intersect(scene);
      console.log(arr)
      const floor = arr.find((item) => item.object.name === 'Floor');
      /* console.log(floor)
      console.log(e.target.id) */
     /*  const data = assets[e.target.dataset.category].find(
        (item) => item.URL === e.target.dataset.modelurl
      );*/
     
      const modelScene =await GLTFLoaderFun(scene,e.target.id)
      // console.log(modelScene)
      // MaterialVariantsFun(modelScene)
      if (floor?.point) {
        modelScene.position.copy(floor.point);        
      } 
    

    }
    attachEvents()
  return 
};
export default DragAndDrop;
