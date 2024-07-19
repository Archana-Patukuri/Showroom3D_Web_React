import  { useContext} from 'react';
import { BasicContext } from '../../contexts/basic.context';

const Reset= () => {   
  let {camera}=useContext(BasicContext) 
    const resetHandler=()=>{           
        camera.position.set(0,1.5,4)
    }
  return <>
                    <div>
                      <img
                        src="./icons/desktopUI/Undo.svg"
                        alt=''
                        width="15px"
                        height="15px"
                        style={{paddingRight:'5px'}}
                      />
                      <img
                      alt=''
                        src="./icons/desktopUI/Redo.svg"
                        width="15px"
                        height="15px"
                      />
                    </div>
                    <img
                    alt=''
                      id="reset_Desktop"
                      src="./icons/desktopUI/reset.svg"
                      width="15px"
                      height="15px"
                      onClick={resetHandler}                      
                      style={{marginTop:'5px'}}
                    />
  </>
};
export default Reset;
