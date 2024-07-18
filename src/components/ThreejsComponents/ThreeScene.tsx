import React, { useRef, useEffect ,useContext} from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-stdlib';
import GLTFLoaderFun from './ModelLoader/GLTFLoader';
import { BasicContext } from '../../contexts/basic.context';
import TWEEN from '@tweenjs/tween.js';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  let {scene,camera,setCamera,setControls,renderer}=useContext(BasicContext)
  
  useEffect(() => {          
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/2 / window.innerHeight, 0.1, 1000);   
    setCamera(camera)
   /*  const renderer = new THREE.WebGLRenderer({ antialias: true }); */
    renderer.setSize(window.innerWidth/2, window.innerHeight);   
     const controls = new OrbitControls(camera, renderer.domElement);
     setControls(controls)    
     controls.minPolarAngle = 1.3;
    controls.maxPolarAngle = 1.6;
    controls.minDistance = 2;
    controls.maxDistance = 20;
    controls.target.set(0, 1.5, 0);    

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const light = new THREE.AmbientLight(0x404040); // soft white light
    scene.add(light);
    scene.background=new THREE.Color(1,1,1)
    let url='https://d3t7cnf9sa42u5.cloudfront.net/compressed_models/Room/Roop_physics_2.glb'
    GLTFLoaderFun(scene,url)   

    camera.position.z = 4;    
    camera.position.y = 1.5;
console.log(camera.position)
    const renderScene = () => {
      requestAnimationFrame(renderScene);
      TWEEN.update();
      renderer.render(scene, camera);
      
    };

    renderScene();

    const handleResize = () => {
      camera.aspect = (window.innerWidth / 2) / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth / 2, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    /* let CustomPostProcessingInstance = new CustomPostProcessing(
      scene,
      camera,
      composer,
      renderer
    ); */

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{width:'60vw'}}/>;
};

export default ThreeScene;
