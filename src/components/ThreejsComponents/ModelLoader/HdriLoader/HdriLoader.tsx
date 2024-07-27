import {
  EquirectangularReflectionMapping,  
  TextureLoader,
} from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { LoadingManager } from 'three';
import { SRGBColorSpace } from 'three';
import { useEffect } from 'react';
import { useContext} from 'react';
import { BasicContext } from '../../../../contexts/basic.context';

 const HdriLoad = () => {
  let {setbackground0,setbackground1,sethdri1,sethdri2}=useContext(BasicContext)     

useEffect(()=>{
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
      console.log(background0)
      if(background0){        
        background0.encoding = SRGBColorSpace;
        background0.mapping = EquirectangularReflectionMapping;              
        background1.encoding = SRGBColorSpace;
        background1.mapping = EquirectangularReflectionMapping;
        hdri1.mapping = EquirectangularReflectionMapping;
        hdri2.mapping = EquirectangularReflectionMapping;
        setbackground0(background0)
        setbackground1(background1)
        sethdri1(hdri1)
        sethdri2(hdri2)      
      }      
    } catch (error) {
      console.log(error)
    } finally {      
    }
  };  
  
    fetchData();  
  
},[setbackground0,setbackground1,sethdri1,sethdri2])
  
    
  return 
}
export default HdriLoad
