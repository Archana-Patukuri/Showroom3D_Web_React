import { GLTFLoader } from "three-stdlib";
import { DRACOLoader } from "three-stdlib";
import AddModelFun from "../../Themes/Themes";
import GLTFMaterialsVariantsExtension from "three-gltf-extensions/loaders/KHR_materials_variants/KHR_materials_variants";
import * as THREE from "three";
import { useEffect,useContext } from "react";
import { BasicContext } from "../../../../contexts/basic.context";
import ThemesFun from "../../Themes/Themes1";

function GLTFLoadFun(url) {   
let {scene,gltfData,setgltfData} = useContext(BasicContext);
    async function GLTFLoaderFun(url) {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);
        loader.register((parser) => new GLTFMaterialsVariantsExtension(parser));
        loader.load(
          url,
          (gltf) => {
            // AddModelFun(gltf, scene);    
            setgltfData(gltf)                           
            return gltf;
          },
          undefined,
          (error) => {
            console.error("An error happened", error);
          }
        );           
      }     
      useEffect(()=>{
        let url =
        "https://d3t7cnf9sa42u5.cloudfront.net/compressed_models/Room/Roop_physics_2.glb";
      let url1 =
        "https://d3t7cnf9sa42u5.cloudfront.net/compressed_models/Blinds/blind_03/Blinds_03_v01_draco.glb";
    
      const fetchData = async () => {
        try {
          let d = await GLTFLoaderFun(url);  
          if(d){                  
          let d1 = await GLTFLoaderFun(url1);          
          }
        } catch (error) {
          console.log(error);
        } finally {
        }
      };
      fetchData()        
      },[])
  return (
   gltfData && <ThemesFun/>
  );
}
export default GLTFLoadFun;
