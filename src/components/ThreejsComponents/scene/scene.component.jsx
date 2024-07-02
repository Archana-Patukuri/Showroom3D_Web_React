import * as THREE from 'three';
import { useContext } from 'react';
import { BasicContext } from '../../contexts/basic.context';

const Scene=()=>{   
    const {setScene} =useContext(BasicContext)
    // Set up scene
    const scene = new THREE.Scene();       
    setScene(scene) 
    return null  
}

export default Scene