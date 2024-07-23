import {
  EquirectangularReflectionMapping,  
  TextureLoader,
} from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { LoadingManager } from 'three';
// import * as THREE from 'three';
 const HdriLoad = (scene:any) => {
  const manager = new LoadingManager();
  manager.onError = (url) => {
    console.log(`There was an error loading gltf model ${url}`);
  };

  const textureLoader = new TextureLoader(manager).setPath(
    'https://d3t7cnf9sa42u5.cloudfront.net/hdri/'
  );
  const hdriLoader = new RGBELoader(manager).setPath(
    'https://d3t7cnf9sa42u5.cloudfront.net/hdri/'
  );  
  const background0:any= textureLoader.loadAsync('autumn_forest(Night).jpg');
  const background1:any=textureLoader.loadAsync('autumn_forest(Day).jpg')
  const hdri1:any=textureLoader.loadAsync('lythwood_room_1k_test.jpg')
  const hdri2:any=hdriLoader.loadAsync('cyclorama_hard_light_1k.hdr')      

  // background0.encoding = THREE.sRGBEncoding;
  background0.mapping = EquirectangularReflectionMapping;      
  // background1.encoding = THREE.sRGBEncoding;
  background1.mapping = EquirectangularReflectionMapping;
  hdri1.mapping = EquirectangularReflectionMapping;
  hdri2.mapping = EquirectangularReflectionMapping;
  //  scene.background=background1  
  scene.environment=hdri1 
  // scene.background=new THREE.Color(1,1,1)
  // setbackground0=background0

  // return { background0, background1, hdri1, hdri2 };
  return <></>
}
export default HdriLoad
