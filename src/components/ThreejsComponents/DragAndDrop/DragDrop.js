import PubSub from 'pubsub-js';
import { Group, Raycaster, Vector2 } from 'three';
import globalState from '../../store/globalState';
import elementFromHtmlString from '../../utils/elementFromHtmlString';
import assets from '../../dataBase/assets.json';
import threeSixtySpin from '../../../threeSixtySpin/threesixty1';
import fetchModel from '../../components/gltf_loader/modelFetcher';
import { animationData } from '../../store/modelState';
import { LoadingSpinner } from '../../utils/pubsubTokens';

export default class DragAndDrop {
  constructor(selector) {
    this.dragged = null;
    this.dropTarget = null;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.selector = selector;
    this.rayCaster = new Raycaster();
    this.mouse = new Vector2();
    this.container = document.querySelector('#scene-container');
    this.resetSpin = null;
    this.prevModel = {};
    document.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
    document
      .getElementById('measurements_Types')
      .addEventListener('change', (e) => {
        const nodes = document.querySelectorAll('.measurements_Label_SideUI');
        Array.from(nodes).forEach((item) => {
          const elem = item;
          const innerText = parseFloat(elem.innerText);
          if (Number.isNaN(innerText)) {
            return;
          }
          const val = e.target.value;
          const defaultVal = parseFloat(elem.dataset.defaultval);
          switch (val) {
            case 'cm':
              elem.innerText = (defaultVal * 2.54).toFixed(2);
              break;
            case 'meter':
              elem.innerText = (defaultVal * 0.0254).toFixed(2);
              break;
            case 'feet':
              elem.innerText = (defaultVal * 0.08333333).toFixed(2);
              break;
            default:
              elem.innerText = defaultVal;
          }
        });
      });
  }

  start(e) {
    if (e.type === 'touchstart') {
      this.dragStartX = e.touches[0].clientX;
      this.dragStartY = e.touches[0].clientY;
    } else {
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
    }
    if (e.target.classList.contains('draggable')) {
      const img = elementFromHtmlString(`
        <img src="${e.target.src}" class="Objectthumbnail" style="padding:0px;position:absolute;" data-modelurl="${e.target.dataset.modelurl}" data-category="${e.target.dataset.category}"  alt="" />
        `);
      this.mainContainer.append(img);
      this.dragged = img;
      e.target.closest('div').classList.remove('glowAnim');
    }
  }

  move(e) {
    if (!this.dragged) return;
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const y = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    this.dragged.style.position = 'absolute';
    this.dragged.style.top = `${y - this.dragged.offsetHeight / 2}px`;
    this.dragged.style.left = `${x - this.dragged.offsetWidth / 2}px`;
    const dropTarget = this.mainContainer;
    this.dropTarget = dropTarget;
  }

  updateMousePosition(e) {
    this.mouse.x = (e.clientX / this.container.clientWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / this.container.clientHeight) * 2 + 1;
  }

  intersect(e) {
    this.updateMousePosition(e);
    this.rayCaster.setFromCamera(this.mouse, globalState.camera);
    this.intersectedObjectsArray = this.rayCaster.intersectObjects(
      globalState.selectableObjects
    );
    // console.log(this.intersectedObjectsArray);
    return this.intersectedObjectsArray;
  }

  async stop(e) {
    if (!this.dragged) return;
    // document.getElementById('Spinner').style.display = 'block';
    PubSub.publish(LoadingSpinner, { state: true });            
    if (this.dropTarget) {
      this.dropTarget.classList.remove('drag-over');
    }
    if (!this.mainContainer.contains(this.dragged)) {
      // document.getElementById('Spinner').style.display = 'none';
      PubSub.publish(LoadingSpinner, { state: false });
      return;
    }
    this.mainContainer.removeChild(this.dragged);

    const arr = this.intersect(e);
    const floor = arr.find((item) => item.object.name === 'Floor');
    const data = assets[e.target.dataset.category].find(
      (item) => item.URL === e.target.dataset.modelurl
    );
    // console.log(floor, arr);
    console.log(data);
    if (
      !floor?.point &&
      !data.isWallObject &&
      !data.isTableObject &&
      data.category !== 'blindsModels'
    ) {
      PubSub.publish(LoadingSpinner, { state: false });
      return;
    }

    const modelScene = await fetchModel(data.URL, data, floor, arr);
    if (!modelScene) {
      
      PubSub.publish(LoadingSpinner, { state: false });
      return;
    }   
    if (
      data.category !== 'lights' &&
      data.category !== 'blindsModels' &&
      data.category !== 'Accessories' &&
      data.category !== 'tableTopAccessories'
    ) {
      const group = new Group();
      console.log('some where here');
      group.add(modelScene);
      group.userData.id = modelScene.uuid;
      group.userData.url = data.URL;
      group.userData.modelId = modelScene.userData.modelId;
      // console.log(this.prevModel);
      if (data.category === 'tableModels') {
        group.name = 'table_selectable';
      } else {
        group.name = 'selectable';
      }
      if (floor?.point) {
        group.position.copy(floor.point);
        // group.position.y -= 0.2;
      } else {
        if (this.prevModel && this.prevModel[data.category]) {
          // console.log(
          //   this.prevModel[data.category],
          //   this.prevModel[data.category].children[0]?.children[0].position
          // );
          group.position.copy(this.prevModel[data.category].position);
          if (this.prevModel[data.category].children[0])
            group.children[0].children[0].quaternion.copy(
              this.prevModel[data.category].children[0]?.children[0].quaternion
            );
        } else group.position.copy(data.position);
        globalState.worldInstance.physics.removeOtherBodies(data);
        // console.log(data.URL);
        animationData[data.URL].scenes = [modelScene];
      }
      this.prevModel[data.category] = group;
      // console.log(this.prevModel);
      globalState.worldInstance.customRayCaster.unselectHanddler();
      globalState.selectableObjects.push(group);
      globalState.scene.add(group);
      globalState.worldInstance.physics.createBody(group, 'dynamic', data);
      // document.getElementById('Spinner').style.display = 'none';
     
      PubSub.publish(LoadingSpinner, { state: false });
      if (floor?.point) {
        globalState.worldInstance.customRayCaster.handleSelect(group);
        globalState.worldInstance.customRayCaster.enableMove = true;
      }
    }

    if (data.category === 'blindsModels') {
      console.log('blinds model', modelScene);
      globalState.scene.add(modelScene);
      modelScene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
        }
      });
      modelScene.position.z += 0.15;
      if (data.Name === 'Blinds_Vertical') {
        modelScene.children[0].children[0].position.x += 0.02;
        modelScene.position.z -= 0.05;
      }

      animationData[data.URL].scenes = [modelScene]; 
    }

    if (data.spin_value) {
      const { resetSpinner } = threeSixtySpin(
        data.spin_value,
        1, // variantNumber
        data.spin_description,
        e.target.dataset.category
      );
      if (this.resetSpin) this.resetSpin();
      this.resetSpin = resetSpinner;
    }

    this.dragged.style.position = '';
    this.dragged.style.top = '';
    this.dragged.style.left = '';
    this.dragged = null;
    this.dropTarget = null;
    // document.getElementById('Spinner').style.display = 'none';
    PubSub.publish(LoadingSpinner, { state: false });
  }

  attachEvents() {
    document.addEventListener('mousedown', (e) => this.start(e));
    document.addEventListener('mousemove', (e) => this.move(e));
    document.addEventListener('mouseup', (e) => this.stop(e));

    document.addEventListener('touchstart', (e) => this.start(e));
    document.addEventListener('touchmove', (e) => this.move(e));
    document.addEventListener('touchend', (e) => this.stop(e));
    this.mainContainer = document.querySelector('.main_container');
  }
}
