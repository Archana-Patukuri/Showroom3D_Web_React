import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
// import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
/* import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass'; */
import { Vector2 } from 'three';

const PostProcessing= (composer:any,scene:any,camera:any) => {    
   const size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };           
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    const effectFXAA = new ShaderPass(FXAAShader);
    effectFXAA.uniforms.resolution.value.set(
      1 / size.width,
      1 / size.height
    );
    const taaRenderPass = new TAARenderPass(scene, camera);
    taaRenderPass.sampleLevel = 1;
    composer.addPass(taaRenderPass)
   /*  const ssaaRenderPass = new SSAARenderPass(scene, camera);
    const SMAApass = new SMAAPass(
      size.width * 0.1 * renderer.getPixelRatio(),
      size.height * 0.1 * renderer.getPixelRatio()
    ); */
   const ssaoPass = new SSAOPass(
      scene,
      camera,
      size.width,
      size.height
    );
    composer.addPass(ssaoPass)
    // console.log('SSAO ADDED',composer)
  //  const saoPass = new SAOPass(scene, camera,new Vector2(size.width, size.height));   

    const gammaCorrectinoPass = new ShaderPass(GammaCorrectionShader);
    composer.addPass(gammaCorrectinoPass);

    const outlinePass = new OutlinePass(
      new Vector2(size.width, size.height),
      scene,
      camera
    );
    composer.addPass(outlinePass);   

  return 
};

export default PostProcessing;
