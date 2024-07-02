import { GLTFLoader } from 'three-stdlib';
import { DRACOLoader } from 'three-stdlib';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

function GLTFLoaderFun(scene:any,url:string,camera:any,renderer:any){  
  /*   scene.traverse(function (child:any) {              
    if (child.isTransformControls ) {                          
      scene.remove(child)                                 
    }          
})  */
for(let i=0;i<scene.children.legth;i++)  {
  if (scene.children[i].isTransformControls ) {                          
    scene.children[i].detach()
    scene.remove(scene.children[i])  

  } 
} 
renderer.render(scene, camera);
let transformControl = new TransformControls(
  camera,
  renderer.domElement
);   

scene.add(transformControl)
transformControl.mode='rotate'

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');    
         const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);
        loader.load(
          url,
          (gltf) => {            
            scene.add(gltf.scene);            
            
              if(gltf.scene.children[0].name=="Chair_101"){
              gltf.scene.position.x-=0.5
              console.log(gltf.scene.children[0].name)       
            }  
            if(gltf.scene.children[0].name=="Table_101"){
              gltf.scene.position.z+=1      
              let room=scene.getObjectByName('Room_103')
              console.log(transformControl)
              transformControl.attach(gltf.scene.children[0])
              transformControl.children[0].position.copy(gltf.scene.children[0].position)
              transformControl.position.z-=2
              // transformControl.children[0].gizmo.rotate.scale.set(2,3,2)                     
            } 
            if(gltf.scene.children[0].name=="Room_103"){
              let sun:any=scene.getObjectByName('Sun')
              sun.intensity=5         
            } 
            
                      
               if(gltf.scene.children[0].children[5].type==="PointLight"){
                gltf.scene.position.x+=1.5                                                            
              }                
            console.log(gltf.scene)                
            
          },
          undefined,
          (error) => {
            console.error('An error happened', error);
          }
        );   
       
        return  <></>                        
};

export default GLTFLoaderFun;
