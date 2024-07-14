import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// 하트 모양 Geometry 정의
function createHeartShape() {
  const x = 0,
    y = 0;
  const heartShape = new THREE.Shape();

  heartShape.moveTo(x + 5, y + 5);
  heartShape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  heartShape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  heartShape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  heartShape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  heartShape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  heartShape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  return heartShape;
}
const scene = new THREE.Scene(); //container for all objects
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
); //field of view, aspect ratio, near clipping plane, far clipping plane
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
}); //renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30); //move camera back

const geometry = new THREE.TorusGeometry(10, 3, 16, 100); //shape //xyz points that make up the shape
const material = new THREE.MeshStandardMaterial({
  color: "#AAD7EE",
  metalness: 0.2, // 금속성 추가
  roughness: 0.2, // 거칠기 조정
  // wireframe: true,
}); //material the wrapping paper for the geometry
const torus = new THREE.Mesh(geometry, material); //mesh is the geometry and the material
scene.add(torus); //add to scene

// 조명 추가
const pointLight = new THREE.PointLight(0xffffff, 2); //white light, 강도 2로 조정
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1); //ambient light, 강도 1로 조정
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); //directional light, 강도 1로 조정
directionalLight.position.set(0, 10, 10); // 카메라 뒤에서 물체로 빛 비춤
scene.add(directionalLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // material 수정
  const star = new THREE.Mesh(geometry, material); // star 정의
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

Array(200)
  .fill()
  .forEach(() => addStar()); // fill() 호출 및 forEach 사용
const spaceTexture = new THREE.TextureLoader().load("bg.jpg");
scene.background = spaceTexture;

const jeffTexture = new THREE.TextureLoader().load("heart.jpg");
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: jeffTexture })
);
scene.add(jeff);

// const moonTexture = new THREE.TextureLoader().load("heart.jpg");
// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: moonTexture,
//   })
// );
// scene.add(moon);
// moon.position.z = 30;
// moon.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
function animate() {
  requestAnimationFrame(animate); //browser will optimize the animation

  // 물체 회전
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera); //draw
}
animate();
