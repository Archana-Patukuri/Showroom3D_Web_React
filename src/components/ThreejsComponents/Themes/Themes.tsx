
let RoomLoaded=false
function addModelFun(gltfData:any,scene:any){    
  scene.add(gltfData.scene);       
       console.log(gltfData.scene.children[0].name)
       if(RoomLoaded===true){
        return
       }
       const themesDesktop:any = document.getElementById('Themes_Desktop');  
       if(gltfData.scene.children[0].name==="Room_103"){
        RoomLoaded=true
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
          let labelText = 'Theme ';
          labelText += i + 1;
          label.innerHTML = labelText;
    
          div2.appendChild(input);
          div2.appendChild(label);
    
          themesDesktop.appendChild(div2);
    
          input.addEventListener('click', (e:any) => {
            if (e.target.checked) {
              gltfData.functions.selectVariant(
                gltfData.scene,
                gltfData.userData.variants[i]
              );
            }
          });
          if (input.id === 'Room_102') {
            input.checked = true;
            input.click();
          }
        }
       }
    return    
};

export default addModelFun;
