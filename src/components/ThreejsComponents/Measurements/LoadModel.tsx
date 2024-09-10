import { useState, useContext, useEffect } from "react";
import { BasicContext } from "../../../contexts/basic.context";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import { Vector3 } from "three";
import * as THREE from "three";

const buttonItems = [
  {
    id: 1,
    name: "black",
  },
  {
    id: 2,
    name: "red",
  },
  {
    id: 3,
    name: "#00ff00",
  },
  {
    id: 4,
    name: "#0000ff",
  },
  {
    id: 5,
    name: "#ffffff",
  },
];
function LoadModel() {
  const [measurementChecked, setMeasurementChecked] = useState(false);
  const [item, setItem] = useState<Vector3[]>([]);
  const [color, setColor] = useState("black");
  const [unit, setUnit] = useState("m");

  let { controls, renderer, camera, scene, container } =
    useContext(BasicContext);

  const measurements = (event: any) => {
    if (measurementChecked) {
      console.log(
        "entered to measurements and the checked value is: ",
        measurementChecked
      );
      event.preventDefault();
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / container.clientWidth) * 2 - 1;
      mouse.y = -(event.clientY / container.clientHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      let intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        let point = intersects[0].point;
        const sphereGeometry = new THREE.SphereGeometry(0.03, 12, 12);
        const sphereMaterial = new THREE.MeshStandardMaterial({
          color: `${color}`,
          emissive: 0x000000,
        });
        const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphereMesh.position.copy(point);
        scene.add(sphereMesh);

        item.push(point);
        console.log("Item points:", item);
        if (item.length === 2) {
          const distance = item[0].distanceTo(item[1]);

          const labelDiv = document.createElement("div");
          labelDiv.className = "label";
          labelDiv.style.transform = "rotate(90deg)";
          labelDiv.style.backgroundColor = "transparent";

          const lineLabel = new CSS2DObject(labelDiv);
          lineLabel.rotateY(Math.PI / 2);
          lineLabel.position.lerpVectors(item[0], item[1], 0.5);
          switch (unit) {
            case "cm":
              lineLabel.element.innerText = (distance * 100).toFixed(2);
              lineLabel.element.innerText += " cm";
              break;
            case "inch":
              lineLabel.element.innerText = (distance * 39.3700787).toFixed(2);
              lineLabel.element.innerText += " inch";
              break;
            case "feet":
              lineLabel.element.innerText = (distance * 3.2808399).toFixed(2);
              lineLabel.element.innerText += " ft";
              break;
            default:
              lineLabel.element.innerText = distance.toFixed(2);
              lineLabel.element.innerText += " m";
              break;
          }
          lineLabel.userData.defaultValue = lineLabel.element.innerText;
          const material = new THREE.LineBasicMaterial({ color: `${color}` });
          const geometry = new THREE.BufferGeometry().setFromPoints(item);
          let line = new THREE.Line(geometry, material);
          line.add(lineLabel);
          scene.add(line);
          setItem([]);
        }
      }
    }
  };

  useEffect(() => {
    if (measurementChecked) {
      controls.enabled = false;
      renderer.domElement.addEventListener("click", measurements);
    } else {
      controls.enabled = true;
      renderer.domElement.removeEventListener("click", measurements);
    }
  }, [measurementChecked]);

  return (
    <div style={{ width: "17vw" }}>
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

          <Switch
            checked={measurementChecked}
            id="measurements"
            onChange={(event) => {
              setMeasurementChecked(event.target.checked);
            }}
            color="primary"
            size="medium"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <label style={{ marginRight: "10px" }}>Unit Type</label>
          <select
            onChange={(event) => {
              setUnit(event.target.value);
            }}
          >
            <option value={"m"}>meter</option>
            <option value={"inch"}>inch</option>
            <option value={"cm"}>cm</option>
            <option value={"feet"}>feet</option>
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
            {buttonItems.map((eachButton) => (
              <button
                style={{
                  borderRadius: "25px",
                  border: "none",
                  backgroundColor: `${eachButton.name}`,
                  width: "38px",
                  height: "38px",
                }}
                key={eachButton.id}
                value={eachButton.name}
                onClick={() => setColor(eachButton.name)}
              />
            ))}

            {/*
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
            ></button> */}
          </div>
        </div>
      </Stack>
    </div>
  );
}

export default LoadModel;
