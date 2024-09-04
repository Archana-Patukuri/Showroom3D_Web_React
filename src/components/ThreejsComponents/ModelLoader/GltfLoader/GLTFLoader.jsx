import { GLTFLoader } from 'three-stdlib';
import { DRACOLoader } from 'three-stdlib';
import AddModelFun from '../../Themes/Themes';
import GLTFMaterialsVariantsExtension from 'three-gltf-extensions/loaders/KHR_materials_variants/KHR_materials_variants'
import ThemesFun from '../../Themes/Themes1';
import DimensionsFunUI from '../../ObjectActions/Dimensions';

async function GLTFLoaderFun(scene,url){  
 
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');    
         const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);        
        loader.register((parser) => new GLTFMaterialsVariantsExtension(parser));
        loader.load(
          url,
          (gltf) => {                               
            AddModelFun(gltf,scene)            
            // <ThemesFun gltfData={gltf} scene={scene}/>
               if(gltf.scene.children[0].name==="Chair_101"){
              gltf.scene.position.x-=0.5                  
            }  
            if(gltf.scene.children[0].name==="Table_101"){
              gltf.scene.position.z+=1                                     
            }             
            if(gltf.scene.children[0].name==="Blind_102"){
              gltf.scene.position.set(-1.99528,1.71393,-0.037798)                                   
            } 
           /*  if(gltf.scene.children[0].name==="Room_103"){
              let sun=scene.getObjectByName('Sun')
              sun.intensity=2  
              sun.castShadow=true      
            }   */
      scene.traverse((item) => {
        // if(item.isMesh){
        item.castShadow = true;
        item.recieveShadow = true;
        // }
      });

     /*  const light = new THREE.DirectionalLight(0x404040);
      scene.add(light); */

      /* if(gltf.scene.children[0].children[5].type==="PointLight"){
                gltf.scene.position.x+=1.5                                                            
              }   */
      // console.log(gltf)
      return gltf;
    },
    undefined,
    (error) => {
      console.error("An error happened", error);
    }
  );

  // return  <></>
}

export default GLTFLoaderFun;
