import { useState, useContext, useEffect } from "react";
import { BasicContext } from "../../../contexts/basic.context";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { Vector3 } from "three";
import * as THREE from "three";

function LoadModel() {
  const [checked, setChecked] = useState(false);
  const [item, setItem] = useState<Vector3[]>([]);

  let { controls, renderer, container, camera, scene } =
    useContext(BasicContext);

  const handleCheckboxChange = (event: any) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    if (checked) {
      controls.enabled = false;
      console.log("Camera enable:", camera);
      console.log("Checked value:", checked);
      camera.layers.enable(1);
      onClickMovement();
    } else {
      controls.enabled = true;
      console.log("Camera disable:", camera);
      console.log("Checked value:", checked);
      //
      camera.layers.disable(1);
      onClickMovement();
    }
  }, [checked]);

  const onClickMovement = () => {
    if (checked) {
      renderer.domElement.addEventListener("click", measurements);
    } else {
      renderer.domElement.removeEventListener("click", measurements);
    }
  };

  const measurements = (event: any) => {
    console.log("entered to measurements and the checked value is: ", checked);
    if (checked) {
      event.preventDefault();
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      let intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        let point = intersects[0].point;
        const sphereGeometry = new THREE.SphereGeometry(0.05, 16, 16);
        const sphereMaterial = new THREE.MeshStandardMaterial({
          color: "black",
          emissive: 0x000000,
        });
        const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereMesh.position.copy(point);
        scene.add(sphereMesh);

        item.push(point);
        if (item.length === 2) {
          const distance = item[0].distanceTo(item[1]);

          const labelDiv = document.createElement("div");
          labelDiv.className = "label";
          labelDiv.style.backgroundColor = "transparent";

          const lineLabel = new CSS2DObject(labelDiv);
          lineLabel.rotateX(Math.PI / 2);
          lineLabel.position.lerpVectors(item[0], item[1], 0.5);
          lineLabel.element.innerText = `${distance.toFixed(2)}m`;
          lineLabel.userData.defaultValue = lineLabel.element.innerText;
          const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
          const geometry = new THREE.BufferGeometry().setFromPoints(item);
          let line = new THREE.Line(geometry, material);
          line.add(lineLabel);
          scene.add(line);
          setItem([]);
        }
      }
    }
  };

  return (
    <div style={{ width: "275.92px" }}>
      <Stack spacing={1} direction="column">
        <h1>Measurements </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <label>Measurements</label>
          {/* <input
            type="checkbox"
            id="measurements"
            onChange={handleCheckboxChange}
            checked={checked}
          /> */}

          <Switch
            checked={checked}
            id="measurements"
            onChange={(event)=>{handleCheckboxChange(event)}}
            color="primary" // You can change the color to "secondary" or "default"
            size="medium"
          />
        </div>
        {/* <p>isChecked: {checked ? "checked" : "unchecked"}.</p>
        <p>Checked value: {checked}</p> */}
        {/* <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <label style={{ marginRight: "10px" }}>Unit Type</label>
          <select>
            <option>meter</option>
            <option>inch</option>
            <option>cm</option>
            <option>feet</option>
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label>Color</label>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              marginTop: "10px",
              gap: "8px",
            }}
          >
            <button
              style={{
                borderRadius: "25px",
                border: "none",
                backgroundColor: "black",
                width: "38px",
                height: "38px",
              }}
            ></button>
            <button
              style={{
                borderRadius: "25px",
                border: "none",
                backgroundColor: "red",
                width: "38px",
                height: "38px",
              }}
            ></button>
            <button
              style={{
                borderRadius: "25px",
                border: "none",
                backgroundColor: "#00ff00",
                width: "38px",
                height: "38px",
              }}
            ></button>
            <button
              style={{
                borderRadius: "25px",
                border: "none",
                backgroundColor: "#0000ff",
                width: "38px",
                height: "38px",
              }}
            ></button>
            <button
              style={{
                borderRadius: "25px",
                backgroundColor: "white",
                width: "38px",
                height: "38px",
                border: "1px solid grey",
              }}
            ></button>
          </div>
        </div> */}
      </Stack>
    </div>
  );
}

export default LoadModel;
