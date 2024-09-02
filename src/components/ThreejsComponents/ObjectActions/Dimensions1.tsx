
function DimensionsFun(gltfData:any){            
    if(!gltfData.userData.variants){
        return
    }     
       const DimensionsDesktop:any = document.getElementById('Dimensions');  
       while (DimensionsDesktop.hasChildNodes()) {
        DimensionsDesktop.removeChild(DimensionsDesktop.children[0]);
      }         
        if (gltfData.userData.gltfExtensions) {
          const div2 = document.createElement('div');
          div2.className = 'd-flex flex-column';          

          const subDiv = document.createElement('div');
          subDiv.className = 'd-flex flex-row space-between';                      
    
          const label = document.createElement('label');                        
          label.innerHTML = 'Height';

          const labelVal = document.createElement('label');                        
          labelVal.innerHTML = gltfData.userData.gltfExtensions.KHR_xmp_json_ld.packets[0].measurements[0];
            
          subDiv.appendChild(label);
          subDiv.appendChild(labelVal);

          const subDiv1 = document.createElement('div');
          subDiv1.className = 'd-flex flex-row space-between';          
    
          const label1 = document.createElement('label');                        
          label1.innerHTML = 'Width';

          const labelVal1 = document.createElement('label');                        
          labelVal1.innerHTML = gltfData.userData.gltfExtensions.KHR_xmp_json_ld.packets[0].measurements[1];
            
          subDiv1.appendChild(label1);
          subDiv1.appendChild(labelVal1);

          const subDiv2 = document.createElement('div');
          subDiv2.className = 'd-flex flex-row space-between';                    
    
          const label2 = document.createElement('label');                        
          label2.innerHTML = 'Length';

          const labelVal2 = document.createElement('label');                        
          labelVal2.innerHTML = gltfData.userData.gltfExtensions.KHR_xmp_json_ld.packets[0].measurements[2];
            
          subDiv2.appendChild(label2);
          subDiv2.appendChild(labelVal2);

          div2.appendChild(subDiv)
          div2.appendChild(subDiv1)
          div2.appendChild(subDiv2)
          DimensionsDesktop.appendChild(div2);
              
        }    
    return    
};
export default DimensionsFun

