import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import {useEffect, useContext, useState} from 'react';
import { BasicContext } from '../../../contexts/basic.context';
import { useSelector } from 'react-redux';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 35,
  height: 20,
  padding: 0,
  borderRadius:12,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 15,
    height: 15,
    borderRadius: 10,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

export default function CustomizedSwitches(label:any,lightObj:any) {
  let {scene}=useContext(BasicContext)    
  const { day } = useSelector((state: any) => state.dayNightSlice);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const lightOnOff=(event:any)=>{
    let lightObj:any=scene.getObjectByName("Lamp_Light_104")     
     if(event.target.checked){
      setIsSwitchOn(true);
      lightObj.intensity=5      
    }else{
      setIsSwitchOn(false);
      lightObj.intensity=0
    }            
  } 
    useEffect(() => {
    let lightObj:any=scene.getObjectByName("Lamp_Light_104")  
    if(lightObj) {      
      if(!day){lightObj.intensity=0;
        setIsSwitchOn(false);
      }else{lightObj.intensity=5;
        setIsSwitchOn(true);
      }
    }    
  }, [day,scene]);  
  return (    
    <>    
    <FormGroup>                
      <Stack direction="row" spacing={1} alignItems="center">         
      Floor Lamp <AntSwitch inputProps={{ 'aria-label': 'ant design' }} checked={isSwitchOn} onChange={(event)=>{lightOnOff(event)}}/>        
       </Stack>
    </FormGroup> 
    </>
  );
}