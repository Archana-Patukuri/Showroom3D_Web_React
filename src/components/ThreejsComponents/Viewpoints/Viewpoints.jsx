import TWEEN from '@tweenjs/tween.js';
import  { useContext} from 'react';
import { BasicContext } from '../../../contexts/basic.context';
const ViewpointValues=[
  {
    x: -0.05,
    y: 1.5,
    z: 4.5,
  },
  {
    x: 0.0479,
    y: 1.165,
    z: 2.0533,
  },
  {
    x: 3.479,
    y: 2.165,
    z: 8,
  },
  {
    x: 3.479,
    y: 2.165,
    z: 8.433,
  },
  {
    x: 0.479,
    y: 1.065,
    z: 6.433,
  },
  {
    x: 0,
    y: -1.0165,
    z: -2.5,
  },
  {
    x: 0.2,
    y: 1.4,
    z: 1.45,
  }
]
const ViewpointsFun= () => {   
  let {scene,camera,renderer}=useContext(BasicContext) 
    const ViewPointsHandler=(e,destination)=>{           
        if (e.target.checked) {
          
          const tween = new TWEEN.Tween(camera.position).to(destination, 1500);
          tween.easing(TWEEN.Easing.Sinusoidal.InOut);
          tween.start();    
          tween.onComplete(() => {
            console.log('animation complete');           
          });                  
          renderer.render(scene,camera)              
           }
    }
  return <>
    <div style={{fontSize:'12px'}}>
                            <div
                            className="d-flex flex-row"            
                            >
                              <input
                                type="radio"
                                className="Viewpoints_Desktop largerCheckbox"
                                id="Main_View"
                                name="viewPoints"                                
                                value="0"
                                onChange={(e)=>{ViewPointsHandler(e,ViewpointValues[0])}}
                              />
                              <label>Main</label>
                            </div>
                            <div
                              className="d-flex flex-row"
                              style={{marginTop:'2px'}}
                            >
                              <input
                                type="radio"
                                className="Viewpoints_Desktop largerCheckbox"
                                id="Table_View"
                                name="viewPoints"
                                value="1"
                                onChange={(e)=>{ const tween = new TWEEN.Tween(camera.position).to(ViewpointValues[1], 1500);
                                  tween.easing(TWEEN.Easing.Sinusoidal.InOut);
                                  tween.start();    
                                  tween.onComplete(() => {
                                    console.log('animation complete');           
                                  });
                                  camera.position.set(ViewpointValues[1])}}
                              />
                              <label>Table</label>
                            </div>
                            <div
                            className="d-flex flex-row"
                            style={{marginTop:'2px'}}
                            >
                              <input
                                type="radio"
                                className="Viewpoints_Desktop largerCheckbox"
                                id="Chair_view"
                                name="viewPoints"
                                value="2"
                                onChange={(e)=>{ViewPointsHandler(e,ViewpointValues[2])}}
                              />
                              <label>Chair</label>
                            </div>
                            <div
                              className="d-flex flex-row"
                              style={{marginTop:'2px'}}
                            >
                              <input
                                type="radio"
                                className="Viewpoints_Desktop largerCheckbox"
                                id="Blinds_View"
                                name="viewPoints"
                                value="3"
                                onChange={(e)=>{ViewPointsHandler(e,ViewpointValues[3])}}
                              />
                              <label>Blinds</label>
                            </div>
                            <div
                              className="d-flex flex-row"
                              style={{marginTop:'2px'}}
                            >
                              <input
                                type="radio"
                                className="Viewpoints_Desktop largerCheckbox"
                                id="Ceiling_View"
                                name="viewPoints"
                                value="4"
                                onChange={(e)=>{ViewPointsHandler(e,ViewpointValues[4])}}
                              />
                              <label>Ceiling</label>
                            </div>
                            <div
                              className="d-flex flex-row"
                              style={{marginTop:'2px'}}
                            >
                              <input
                                type="radio"
                                className="Viewpoints_Desktop largerCheckbox"
                                id="Back_View"
                                name="viewPoints"
                                value="5"
                                onChange={(e)=>{ViewPointsHandler(e,ViewpointValues[5])}}
                              />
                              <label>Back</label>
                            </div>
                            <div
                              className="d-flex flex-row"                              
                              style={{marginTop:'2px'}}
                            >
                              <input
                                type="radio"
                                 className="Viewpoints_Desktop largerCheckbox"
                                id="Monitot_View"
                                name="viewPoints"
                                value="6"
                                onChange={(e)=>{ViewPointsHandler(e,ViewpointValues[6])}}
                              />
                              <label>Monitor</label>
                            </div>
                          </div>
  </>
};
export default ViewpointsFun;
