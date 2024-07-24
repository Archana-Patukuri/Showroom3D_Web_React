import {
  EquirectangularReflectionMapping,  
  TextureLoader,
} from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { LoadingManager } from 'three';
import { SRGBColorSpace } from 'three';
import { useSelector } from 'react-redux';

 const HdriLoad = (scene:any) => {
  const { day } = useSelector((state: any) => state.dayNightSlice);
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
let background0:any, background1:any, hdri1:any, hdri2:any
   // Async function to fetch data
   const fetchData = async () => {
    try {
       [background0, background1, hdri1, hdri2] = await Promise.all([
        textureLoader.loadAsync('autumn_forest(Night).jpg'),
        textureLoader.loadAsync('autumn_forest(Day).jpg'),    
        textureLoader.loadAsync('lythwood_room_1k_test.jpg'),
        hdriLoader.loadAsync('cyclorama_hard_light_1k.hdr'),        
      ]);     
      
      if(background0){        
        background0.encoding = SRGBColorSpace;
        background0.mapping = EquirectangularReflectionMapping;              
        background1.encoding = SRGBColorSpace;
        background1.mapping = EquirectangularReflectionMapping;
        hdri1.mapping = EquirectangularReflectionMapping;
        hdri2.mapping = EquirectangularReflectionMapping;
        if(!day){
          scene.background=background1  
        }else{
          scene.background=background0  
        }        
        scene.environment=hdri2 
      }      
    } catch (error) {
      console.log(error)
    } finally {      
    }
  };  
  if(!background0){
    fetchData();  
  }
    
  return 
}
export default HdriLoad
