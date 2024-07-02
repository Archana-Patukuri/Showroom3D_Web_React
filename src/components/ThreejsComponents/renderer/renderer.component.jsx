import { useContext } from 'react';
import { BasicContext } from '../../../contexts/basic.context';
import {
    WebGLRenderer,
    ACESFilmicToneMapping,    
    PCFSoftShadowMap,
  } from 'three';

const Renderer=()=>{    
  const container=document.getElementsByClassName('.left-half');  
    const {setRenderer}=useContext(BasicContext)
   // Set up renderer
    const renderer = new WebGLRenderer({ antialias: false });
    renderer.toneMapping = ACESFilmicToneMapping;
    // renderer.outputEncoding = sRGBEncoding;
    renderer.shadowMap.enabled = true;
    // renderer.shadowMap.autoUpdate = false;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;

    renderer.xr.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio * 0.1);
    renderer.precision = 'lowp';
    renderer.setSize(container.clientWidth, container.clientHeight);    
    setRenderer(renderer)
    return null  
}

export default Renderer