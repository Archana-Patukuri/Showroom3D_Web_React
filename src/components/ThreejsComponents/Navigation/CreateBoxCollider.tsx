import { BoxHelper, Box3, Vector3 } from "three";

export default function CreateBoxCollider(threeJsObject: any) {
  // this is the bounding box of the red outline box
  const boxHelperBoundingBox = new Box3(new Vector3(), new Vector3());

  // this is the red outline box
  const boxHelper = new BoxHelper(threeJsObject, 0xff0000);
  boxHelper.setFromObject(threeJsObject);

  // size of the bounding box
  const size = new Vector3();
  //   boxHelperBoundingBox.setFromObject(threeJsObject);
  boxHelperBoundingBox.getSize(size);
  return { boxHelper, boxHelperBoundingBox, size };
}
