
const VariantsFun = (gltfData:any) => {  
    const ChangeVariants=(e:any,el:any)=>{
      if (e.target.checked) {
        gltfData.functions.selectVariant(
          gltfData.scene,
          el
        );
      }
    }
      
    return <>
    {gltfData.userData.variants.map((el:any, idx:any) => {
      <div style={{display:'flex',marginTop:'2px'}}>
      <input type='radio' className='largerCheckbox' value={el} id={el} name={el} onClick={(e)=>{ChangeVariants(e,el)}}/>
      <label htmlFor={el}>{el}</label>
      </div>
    })}
     </> 
  
  }
  export default VariantsFun;