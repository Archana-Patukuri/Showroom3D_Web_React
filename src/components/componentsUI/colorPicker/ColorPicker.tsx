import { BasicContext } from '../../../contexts/basic.context';
import  { useContext} from 'react';
import { Color } from 'three';

function ColorPicker(){      
    let {scene}=useContext(BasicContext)
    let color   =new Color(1,1,1)    
    const PickColor=(event:any)=>{        
      let lightObj:any=scene.getObjectByName("Lamp_Light_104")        
      lightObj.color=new Color(event.target.value)
      color=new Color(event.target.value)      
    }
    return <div >
        <input onInput={(event)=>{PickColor(event)}} type="color" name="color" value={`#${color.getHexString()}`}  style={{border:'none',height: '30px',width:'50px'}}/>
    </div>                    
};

export default ColorPicker;
