
import { useContext} from 'react';
import { BasicContext } from '../../../contexts/basic.context';
const DimensionsFunUI = () => {  
    let {gltfData}=useContext(BasicContext)     
    return  gltfData.userData.gltfExtensions && <>    
    <div style={{display:'flex',flexDirection:'column',marginTop:'2px'}}>   
    <div style={{display:'flex',justifyContent:'space-between'}}>
        <label style={{marginLeft:'5px'}}>Height</label>
        <label className="measurements_Label_SideUI">{gltfData.userData.gltfExtensions.KHR_xmp_json_ld.packets[0].measurements[0]}</label>
    </div>
    <div style={{display:'flex',justifyContent:'space-between'}}>
        <label style={{marginLeft:'5px'}}>Width</label>
       <label className="measurements_Label_SideUI">{gltfData.userData.gltfExtensions.KHR_xmp_json_ld.packets[0].measurements[1]}</label>
    </div>
    <div style={{display:'flex',justifyContent:'space-between'}}>
         <label style={{marginLeft:'5px'}}>Length</label>
         <label className="measurements_Label_SideUI">{gltfData.userData.gltfExtensions.KHR_xmp_json_ld.packets[0].measurements[2]}</label>
    </div>
    </div>    
     </> 
  
  }
  export default DimensionsFunUI;