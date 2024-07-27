/*   import { useEffect } from 'react';
  import { useContext} from 'react';
  import { BasicContext } from '../../../contexts/basic.context';
  import Checkbox from '@mui/material/Checkbox'; */
  import './ObjectTypesUI.css'
   const ObjectTypes = ({modelData}:any) => {
   /*  let {scene,renderer}=useContext(BasicContext)             
    useEffect(()=>{                   
      
    },[]) */
    
      
    return <>
    <div style={{display:'flex'}}>
    {/* <input type="radio" value="${assetsList[i].URL}"  className="btn-check" name="${assetsList[i].category}" id="${assetsList[i].Name}" /> */}
    <img src={modelData[0].thumbnail} className="thumbnail" id={modelData[0].URL} alt={modelData[0].category}/>    
    <img src={modelData[1].thumbnail} className="thumbnail" id={modelData[1].URL} alt=''/>
    <img src={modelData[2].thumbnail} className="thumbnail" id={modelData[2].URL} alt=''/>
    </div>
    </>
  }
  export default ObjectTypes
  