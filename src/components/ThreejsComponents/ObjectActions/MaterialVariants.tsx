
function MaterialVariantsFun(gltfData:any){            
    if(!gltfData.userData.variants){
        return
    }     
       const variantsDesktop:any = document.getElementById('Material_Variants');  
       while (variantsDesktop.hasChildNodes()) {
        variantsDesktop.removeChild(variantsDesktop.children[0]);
      }         
        for (let i = 0; i < gltfData.userData.variants.length; i += 1) {
          const div2 = document.createElement('div');
          div2.className = 'd-flex flex-row';
          div2.style.marginTop = '2px';
    
          const input = document.createElement('input');
          input.type = 'radio';
          input.className = 'largerCheckbox';
          input.value = gltfData.userData.variants[i];
          input.name = gltfData.userData.variants[i].name;
          input.id = gltfData.userData.variants[i];
    
          const label = document.createElement('label');
    
          label.setAttribute('for', gltfData.userData.variants[i]);
          let labelText = gltfData.userData.variants[i];          
          label.innerHTML = labelText;
    
          div2.appendChild(input);
          div2.appendChild(label);
    
          variantsDesktop.appendChild(div2);
    
          input.addEventListener('click', (e:any) => {
            if (e.target.checked) {
              gltfData.functions.selectVariant(
                gltfData.scene,
                gltfData.userData.variants[i]
              );
            }
          });          
        }    
    return    
};
export default MaterialVariantsFun

