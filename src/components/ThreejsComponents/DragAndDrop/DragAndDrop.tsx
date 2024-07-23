import  { useContext} from 'react';
import { BasicContext } from '../../../contexts/basic.context';
const DragAndDrop= () => {   
  let {camera}=useContext(BasicContext) 
    const resetHandler=()=>{           
        camera.position.set(0,1.5,4)
    }
  return <>                  
  </>
};
export default DragAndDrop;
