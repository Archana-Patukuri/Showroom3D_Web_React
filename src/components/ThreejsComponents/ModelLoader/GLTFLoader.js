import { GLTFLoader } from 'three-stdlib';
import { DRACOLoader } from 'three-stdlib';
import addModelFun from '../Themes/Themes';
import GLTFMaterialsVariantsExtension from 'three-gltf-extensions/loaders/KHR_materials_variants/KHR_materials_variants'

function GLTFLoaderFun(scene,url){  
 
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');    
         const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);
        // Material Variants
        loader.register((parser) => new GLTFMaterialsVariantsExtension(parser));
        loader.load(
          url,
          (gltf) => {            
            // scene.add(gltf.scene);            
            addModelFun(gltf,scene)
               if(gltf.scene.children[0].name==="Chair_101"){
              gltf.scene.position.x-=0.5
              console.log(gltf.scene.children[0].name)       
            }  
            if(gltf.scene.children[0].name==="Table_101"){
              gltf.scene.position.z+=1                                     
            } 
            if(gltf.scene.children[0].name==="Room_103"){
              let sun=scene.getObjectByName('Sun')
              sun.intensity=5         
            }  
            
                      
               if(gltf.scene.children[0].children[5].type==="PointLight"){
                gltf.scene.position.x+=1.5                                                            
              }                
            // console.log(gltf.scene)   
            return gltf
            
          },
          undefined,
          (error) => {
            console.error('An error happened', error);
          }
        );   
       
        // return  <></>                        
};

export default GLTFLoaderFun;
