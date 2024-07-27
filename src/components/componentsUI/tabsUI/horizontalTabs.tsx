import * as React from 'react';
import { styled } from '@mui/system';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { buttonClasses } from '@mui/base/Button';
import { Tab as BaseTab, tabClasses } from '@mui/base/Tab';
import ObjectTypes from '../ObjectTypesUI/ObjectTypesUI';
import assets from '../../../assets.json';

export default function UnstyledTabsCustomized() {
  console.log(assets.chairModels)
 
  return (
    <Tabs defaultValue={1}>
      <TabsList>
        <Tab value={1}>Chair</Tab>
        <Tab value={2}>Table</Tab>
        <Tab value={3}>Sofa</Tab>
      </TabsList>
      <TabPanel value={1}>
      <ObjectTypes modelData={assets.chairModels}/>        
      </TabPanel>
      <TabPanel value={2}>
      <ObjectTypes modelData={assets.tableModels}/>
      </TabPanel>
      <TabPanel value={3}>Sofa page</TabPanel>
    </Tabs>
  );
}

const Tab = styled(BaseTab)`  
  color: #27282D;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: transparent;
  width: 50px;
  line-height: 1;
  padding: 8px 12px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: #fff;
    color:#FF5A50
  }

  &:focus {
    color: #fff;        
  }

  &.${tabClasses.selected} {
    background-color: #fff;
    color: #FF5A50;
  }

  &.${buttonClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(BaseTabPanel)`
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(BaseTabsList)(
  ({ theme }) => `
  min-width: 18vw;  
  background-color: #F5F5F5;  
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: start;
  align-content: space-between;
  border-bottom:2px solid #E5E5E5;
  `,
);
