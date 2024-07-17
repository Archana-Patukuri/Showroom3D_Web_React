const UpdateCameraControls=(e:any,controls:any,val:string)=>{                
        switch(val){
            case 'zoom':
                if(e.target.checked){
                    controls.enableZoom=true
                }else{
                    controls.enableZoom=false
                }
                break
            case 'pan':
                if(e.target.checked){
                    controls.enablePan=true
                }else{
                    controls.enablePan=false
                }
                break
            case 'rotate':
                if(e.target.checked){
                    controls.enableRotate=true
                }else{
                    controls.enableRotate=false
                }
                break
            default:
                console.log('pls update controls')
        }
    }                    


export default UpdateCameraControls;
