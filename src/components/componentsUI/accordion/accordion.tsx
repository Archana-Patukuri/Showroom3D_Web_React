import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './accordion.css'
import { useNavigate } from 'react-router-dom';

export default function AccordionUsage(accordionProps:any) {
    const {accordionLabel,accordionDetails}=accordionProps    
    const navigate=useNavigate()

  return (
    <div>    
      {accordionLabel==='Navigation'?<Accordion style={{maxWidth:"15vw",margin:"0px"}} className='accordion-container' defaultExpanded >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-header"
          className='accordion-label'  
          onClick={()=>{navigate(`/${accordionLabel}`)}}              
        >
          {accordionLabel}
        </AccordionSummary>
        <AccordionDetails className='accordion-text'>
          {accordionDetails}         
        </AccordionDetails>        
      </Accordion>:<Accordion style={{maxWidth:"15vw",margin:"0px"}} className='accordion-container' >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel-content"
          id="panel-header"
          className='accordion-label'
          onClick={()=>{navigate(`/${accordionLabel}`)}}
        >
          {accordionLabel}
        </AccordionSummary>
        <AccordionDetails className='accordion-text'>
          {accordionDetails}         
        </AccordionDetails>        
      </Accordion>}
      
    </div>
  );
}