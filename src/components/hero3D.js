import * as THREE from 'three';

/**
 * Bright Vibrant Tech Canvas
 * 5 High-Luminance Floating Icons (No dark/black materials):
 * 1. Bright 3D Computer / Monitor
 * 2. Bright 3D Robot AI Head with Neon Visor & Antenna
 * 3. Bright White 3D GitHub Octocat Head & Orange Branch Emblem
 * 4. Vivid Electric Blue 3D VS Code Ribbon
 * 5. Bright Electric Green/Cyan 3D Code { } Brackets
 */
export function initHero3D() {
  const container = document.getElementById('hero-canvas-container');
  const canvas = document.getElementById('hero-canvas');
  if (!container || !canvas) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    48,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const isMobile = () => window.innerWidth < 768;
  let targetZ = isMobile() ? 65 : 46;
  camera.position.set(0, 0, targetZ);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- Bright High-Contrast Lighting ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0x0ea5e9, 2.2);
  keyLight.position.set(25, 25, 25);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x10b981, 1.5);
  fillLight.position.set(-25, -15, 20);
  scene.add(fillLight);

  const accentLight = new THREE.PointLight(0xa855f7, 2.5, 60);
  accentLight.position.set(0, 15, -5);
  scene.add(accentLight);

  // Main Root Group
  const hero3DGroup = new THREE.Group();
  scene.add(hero3DGroup);

  const iconScale = isMobile() ? 0.65 : 0.95;

  // ==========================================================================
  // 1. BRIGHT 3D COMPUTER / MONITOR ICON (Far Left)
  // ==========================================================================
  const computerGroup = new THREE.Group();

  const monFrameGeo = new THREE.BoxGeometry(4.0, 2.6, 0.3);
  const monFrameMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.5,
    roughness: 0.2,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.25
  });
  const monFrame = new THREE.Mesh(monFrameGeo, monFrameMat);

  const monScreenGeo = new THREE.PlaneGeometry(3.6, 2.2);
  const monScreenMat = new THREE.MeshBasicMaterial({
    color: 0x0284c7,
    wireframe: true,
    transparent: true,
    opacity: 0.85
  });
  const monScreen = new THREE.Mesh(monScreenGeo, monScreenMat);
  monScreen.position.set(0, 0, 0.16);

  const standMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.6 });
  const standStem = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 1.2, 16), standMat);
  standStem.position.set(0, -1.8, -0.1);

  const standBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.12, 1.0), standMat);
  standBase.position.set(0, -2.4, -0.1);

  computerGroup.add(monFrame, monScreen, standStem, standBase);
  computerGroup.scale.setScalar(iconScale);

  const compPos = isMobile() ? { x: -14, y: 12, z: -5 } : { x: -21, y: 13, z: -4 };
  computerGroup.position.set(compPos.x, compPos.y, compPos.z);
  hero3DGroup.add(computerGroup);

  // ==========================================================================
  // 2. BRIGHT 3D ROBOTIC / ROBOT HEAD ICON (Center-Left)
  // ==========================================================================
  const robotGroup = new THREE.Group();

  const robotHeadGeo = new THREE.BoxGeometry(2.8, 2.3, 2.0);
  const robotHeadMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.6,
    roughness: 0.2,
    emissive: 0x0284c7,
    emissiveIntensity: 0.35
  });
  const robotHead = new THREE.Mesh(robotHeadGeo, robotHeadMat);

  const robotVisorGeo = new THREE.BoxGeometry(2.5, 0.85, 0.2);
  const robotVisorMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true });
  const robotVisor = new THREE.Mesh(robotVisorGeo, robotVisorMat);
  robotVisor.position.set(0, 0.3, 1.05);

  const robotEyeGeo = new THREE.SphereGeometry(0.28, 14, 14);
  const robotEyeMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const rEyeLeft = new THREE.Mesh(robotEyeGeo, robotEyeMat);
  rEyeLeft.position.set(-0.65, 0.3, 1.15);
  const rEyeRight = new THREE.Mesh(robotEyeGeo, robotEyeMat);
  rEyeRight.position.set(0.65, 0.3, 1.15);

  const earGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 16);
  const earMat = new THREE.MeshStandardMaterial({ color: 0x0ea5e9, metalness: 0.7 });
  const earL = new THREE.Mesh(earGeo, earMat);
  earL.rotation.z = Math.PI / 2;
  earL.position.set(-1.6, 0.3, 0);
  const earR = earL.clone();
  earR.position.set(1.6, 0.3, 0);

  const antStemGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.0);
  const antStemMat = new THREE.MeshBasicMaterial({ color: 0xc084fc });
  const antStem = new THREE.Mesh(antStemGeo, antStemMat);
  antStem.position.set(0, 1.65, 0);

  const antBulbGeo = new THREE.SphereGeometry(0.25, 12, 12);
  const antBulb = new THREE.Mesh(antBulbGeo, antStemMat);
  antBulb.position.set(0, 2.2, 0);

  robotGroup.add(robotHead, robotVisor, rEyeLeft, rEyeRight, earL, earR, antStem, antBulb);
  robotGroup.scale.setScalar(iconScale * 0.95);

  const robPos = isMobile() ? { x: -7, y: 13, z: -6 } : { x: -10, y: 14, z: -5 };
  robotGroup.position.set(robPos.x, robPos.y, robPos.z);
  hero3DGroup.add(robotGroup);

  // ==========================================================================
  // 3. BRIGHT WHITE 3D GITHUB OCTOCAT HEAD & ORANGE EMBLEM ICON (Center)
  // ==========================================================================
  const githubGroup = new THREE.Group();

  const ghHeadGeo = new THREE.SphereGeometry(1.5, 24, 24);
  const ghHeadMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.3,
    roughness: 0.1,
    emissive: 0xf1f5f9,
    emissiveIntensity: 0.5
  });
  const ghHead = new THREE.Mesh(ghHeadGeo, ghHeadMat);

  const earConeGeo = new THREE.ConeGeometry(0.5, 0.9, 16);
  const earConeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
  const earLeft = new THREE.Mesh(earConeGeo, earConeMat);
  earLeft.position.set(-0.95, 1.45, 0);
  earLeft.rotation.z = Math.PI / 8;

  const earRight = new THREE.Mesh(earConeGeo, earConeMat);
  earRight.position.set(0.95, 1.45, 0);
  earRight.rotation.z = -Math.PI / 8;

  const nodeGeo = new THREE.SphereGeometry(0.24, 12, 12);
  const nodeMat = new THREE.MeshStandardMaterial({
    color: 0xff5722,
    emissive: 0xf05032,
    emissiveIntensity: 0.8
  });
  const n1 = new THREE.Mesh(nodeGeo, nodeMat);
  n1.position.set(0, -0.6, 1.4);
  const n2 = new THREE.Mesh(nodeGeo, nodeMat);
  n2.position.set(-0.6, 0.5, 1.3);
  const n3 = new THREE.Mesh(nodeGeo, nodeMat);
  n3.position.set(0.6, 0.5, 1.3);

  const branchPipeMat = new THREE.MeshBasicMaterial({ color: 0xff5722, wireframe: true });
  const bp1 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.4), branchPipeMat);
  bp1.position.set(-0.3, -0.05, 1.35);
  bp1.rotation.z = Math.PI / 6;

  const bp2 = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.4), branchPipeMat);
  bp2.position.set(0.3, -0.05, 1.35);
  bp2.rotation.z = -Math.PI / 6;

  githubGroup.add(ghHead, earLeft, earRight, n1, n2, n3, bp1, bp2);
  githubGroup.scale.setScalar(iconScale);

  const ghPos = isMobile() ? { x: 0, y: 14, z: -7 } : { x: 0, y: 15, z: -6 };
  githubGroup.position.set(ghPos.x, ghPos.y, ghPos.z);
  hero3DGroup.add(githubGroup);

  // ==========================================================================
  // 4. VIVID ELECTRIC BLUE 3D VS CODE RIBBON ICON (Center-Right)
  // ==========================================================================
  const vscodeGroup = new THREE.Group();
  const vsMat = new THREE.MeshStandardMaterial({
    color: 0x007acc,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.65,
    metalness: 0.7,
    roughness: 0.15
  });

  const wing1Geo = new THREE.BoxGeometry(0.4, 2.6, 0.4);
  const wing1 = new THREE.Mesh(wing1Geo, vsMat);
  wing1.rotation.z = Math.PI / 4;

  const wing2 = new THREE.Mesh(wing1Geo, vsMat);
  wing2.rotation.z = -Math.PI / 4;

  const backSpine = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2.8, 0.4), vsMat);
  backSpine.position.set(-0.9, 0, 0);

  const frontFold = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.8, 0.4), vsMat);
  frontFold.position.set(0.9, 0, 0.2);
  frontFold.rotation.z = Math.PI / 6;

  vscodeGroup.add(wing1, wing2, backSpine, frontFold);
  vscodeGroup.scale.setScalar(iconScale * 0.95);

  const vsPos = isMobile() ? { x: 7, y: 13, z: -6 } : { x: 10, y: 14, z: -5 };
  vscodeGroup.position.set(vsPos.x, vsPos.y, vsPos.z);
  hero3DGroup.add(vscodeGroup);

  // ==========================================================================
  // 5. BRIGHT ELECTRIC GREEN/CYAN 3D CODE BRACKETS { } ICON (Far Right)
  // ==========================================================================
  const codeGroup = new THREE.Group();
  const codeMat = new THREE.MeshStandardMaterial({
    color: 0x22c55e,
    metalness: 0.6,
    roughness: 0.2,
    emissive: 0x10b981,
    emissiveIntensity: 0.6
  });

  const bBar = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.4, 0.35), codeMat);
  const bTop = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.35), codeMat);
  bTop.position.set(0.3, 1.0, 0);
  const bBot = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.35, 0.35), codeMat);
  bBot.position.set(0.3, -1.0, 0);
  const bMid = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.35, 0.35), codeMat);
  bMid.position.set(-0.2, 0, 0);

  const leftB = new THREE.Group();
  leftB.add(bBar, bTop, bBot, bMid);
  leftB.position.set(-1.2, 0, 0);

  const rightB = leftB.clone();
  rightB.rotation.y = Math.PI;
  rightB.position.set(1.2, 0, 0);

  codeGroup.add(leftB, rightB);
  codeGroup.scale.setScalar(iconScale * 0.95);

  const codePos = isMobile() ? { x: 14, y: 12, z: -5 } : { x: 21, y: 13, z: -4 };
  codeGroup.position.set(codePos.x, codePos.y, codePos.z);
  hero3DGroup.add(codeGroup);

  // ==========================================================================
  // 6. BACKGROUND SENSOR PARTICLES
  // ==========================================================================
  const particleCount = isMobile() ? 70 : 140;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 120;
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 120;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0x0ea5e9,
    size: 1.5,
    transparent: true,
    opacity: 0.32,
    blending: THREE.AdditiveBlending
  });

  const particleStream = new THREE.Points(particleGeo, particleMat);
  scene.add(particleStream);

  // ==========================================================================
  // 7. INTERACTIVE MOTION & PARALLAX PHYSICS
  // ==========================================================================
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener(
    'touchmove',
    (e) => {
      if (e.touches.length > 0) {
        mouseX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    },
    { passive: true }
  );

  let isVisible = true;
  let animationFrameId = null;

  function handleResize() {
    const mobile = isMobile();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    targetZ = mobile ? 65 : 46;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  window.addEventListener('resize', handleResize, { passive: true });

  function animate() {
    if (!isVisible) {
      animationFrameId = null;
      return;
    }
    animationFrameId = requestAnimationFrame(animate);
    const elapsedTime = performance.now() * 0.001;

    // Smooth inertia tracking towards cursor
    targetX += (mouseX * 3.5 - targetX) * 0.04;
    targetY += (-mouseY * 3.0 - targetY) * 0.04;

    camera.position.x = targetX;
    camera.position.y = targetY;
    camera.position.z = targetZ;
    camera.lookAt(0, 0, 0);

    // Individual Floating & Micro-rotations for colorful 3D icons
    computerGroup.rotation.y = elapsedTime * 0.5;
    computerGroup.position.y = compPos.y + Math.sin(elapsedTime * 1.3) * 0.5;

    robotGroup.rotation.y = elapsedTime * 0.6;
    robotGroup.rotation.x = Math.cos(elapsedTime * 1.1) * 0.12;
    robotGroup.position.y = robPos.y + Math.sin(elapsedTime * 1.4) * 0.5;

    githubGroup.rotation.y = elapsedTime * 0.75;
    githubGroup.position.y = ghPos.y + Math.cos(elapsedTime * 1.5) * 0.6;

    vscodeGroup.rotation.y = elapsedTime * 0.7;
    vscodeGroup.rotation.z = Math.sin(elapsedTime * 1.2) * 0.12;
    vscodeGroup.position.y = vsPos.y + Math.cos(elapsedTime * 1.6) * 0.5;

    codeGroup.rotation.y = -elapsedTime * 0.5;
    codeGroup.position.y = codePos.y + Math.sin(elapsedTime * 1.2) * 0.5;

    particleStream.rotation.y = elapsedTime * 0.015;

    renderer.render(scene, camera);
  }

  const heroSection = document.getElementById('home');
  if (heroSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          animationFrameId = requestAnimationFrame(animate);
        } else if (!isVisible && animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(heroSection);
  }

  animationFrameId = requestAnimationFrame(animate);
}
