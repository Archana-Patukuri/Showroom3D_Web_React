import GLTFLoaderFun from './GLTFLoader';
import { BasicContext } from '../../contexts/basic.context';
import  { useContext} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function LoadModel(){      
    let {scene,camera,renderer}=useContext(BasicContext)    
    const AddModel=(scene:any,url:string,camera:any,renderer:any)=>{        
        GLTFLoaderFun(scene,url,camera,renderer)  
    }
    return <div >
         <Stack spacing={1} direction="row" >
        <Button style={{fontSize:'12px',textTransform:'none'}} variant="outlined" onClick={()=>{AddModel(scene,'https://d3t7cnf9sa42u5.cloudfront.net/compressed_models/Chairs/chair_01/Chair_01_v01.glb',camera,renderer)}}>Add Chair</Button>         
        <Button style={{fontSize:'12px',textTransform:'none'}} variant="outlined" onClick={()=>{AddModel(scene,'https://d3t7cnf9sa42u5.cloudfront.net/compressed_models/Tables/table/Table_Automatic_01_v01.glb',camera,renderer)}}>Add Table</Button>
        <Button style={{fontSize:'12px',textTransform:'none'}} variant="outlined" onClick={()=>{AddModel(scene,'https://d3t7cnf9sa42u5.cloudfront.net/compressed_models/lights/Floor_Lamp_small/floorLamp_Jan_11.glb',camera,renderer)}}>Add Light</Button>       
       </Stack>
    </div>                    
};

export default LoadModel;
