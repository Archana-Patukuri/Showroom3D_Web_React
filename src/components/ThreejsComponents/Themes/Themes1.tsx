
import { useEffect,useContext} from 'react';
import { BasicContext } from '../../../contexts/basic.context';
import MaterialVariantsFun from '../ObjectActions/MaterialVariants';

const ThemesFun = () => {  
    let {scene,gltfData}=useContext(BasicContext)    
    const ChangeVariants=(e:any,el:any)=>{
        if (e.target.checked) {
          gltfData.functions.selectVariant(
            gltfData.scene,
            el
          );
        }
      }
    useEffect(()=>{
        // setgltfData(gltfData)
        scene.add(gltfData.scene)
       /*  if(gltfData.scene.children[0].name==="Blind_102"){        
            MaterialVariantsFun(gltfData)                
            return
           }      
           if(gltfData.scene.children[0].name!=="Blind_102" && gltfData.scene.children[0].name!=="Room_103"){        
            MaterialVariantsFun(gltfData)        
            return 
           } */  
    },[gltfData]) 
   
    return <>    
   {/* {gltfData.userData.variants.map((el:any, idx:any) => {
      <div style={{display:'flex',marginTop:'2px'}}>
      <input type='radio' className='largerCheckbox' value={el} id={el} name={el} onClick={(e)=>{ChangeVariants(e,el)}}/>
      <label htmlFor={el}>{el}</label>
      </div>
    })} */}
     </> 
  
  }
  export default ThemesFun;