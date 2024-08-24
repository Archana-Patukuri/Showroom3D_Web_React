import { useRef, useEffect ,useContext} from 'react';
import GLTFLoaderFun from '../ModelLoader/GltfLoader/GLTFLoader';
import { BasicContext } from '../../../contexts/basic.context';
import TWEEN from '@tweenjs/tween.js';
import {  createCamera,createCameraControls, createRenderer } from './BasicComponents';
import HdriLoad from '../ModelLoader/HdriLoader/HdriLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import PostProcessing from '../PostProcessing/post-processing';
import DragAndDrop from '../DragAndDrop/DragAndDrop';

let composer:any,container:any
const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);      
  let { scene,setCamera,setControls,setRenderer,background1,hdri1,setContainer,setgltfData}=useContext(BasicContext)
  
  scene.background=background1
  scene.environment=hdri1
  let url='https://d3t7cnf9sa42u5.cloudfront.net/compressed_models/Room/Roop_physics_2.glb'
  let url1='https://d3t7cnf9sa42u5.cloudfront.net/compressed_models/Blinds/blind_03/Blinds_03_v01_draco.glb'
  const fetchData = async () => {    
    try {
      let d=await GLTFLoaderFun(scene,url)   
      // setgltfData(d)
      console.log(d)
      let d1=await GLTFLoaderFun(scene,url1)
      // setgltfData(d1)
      
    } catch (error) {
      console.log(error)
    } finally {      
    }
  };  
  DragAndDrop()
  HdriLoad() 
  useEffect(() => {     
    fetchData()
    const camera = createCamera(mountRef.current);
    const renderer = createRenderer(mountRef.current);
    const controls=createCameraControls(camera,renderer)     
    setCamera(camera)
    setRenderer(renderer)
    setControls(controls)
  composer = new EffectComposer(renderer);       
   
    PostProcessing(composer,scene,camera)    
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
    setContainer(container)
    return () => {
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scene,setCamera,setControls,setRenderer,setContainer ]);

  return <div ref={mountRef} style={{width:'60vw',height:'100vh'}}/>;
};

export default ThreeScene;
