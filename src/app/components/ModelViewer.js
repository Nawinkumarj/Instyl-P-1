"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";

const Model = () => {
  const meshRef = useRef();

  // ✅ useGLTF + DRACO config
  const { scene } = useGLTF("/assets/Brush.glb", true, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/"); // Place DRACO files here in public folder
    loader.setDRACOLoader(dracoLoader);
  });

  useEffect(() => {
    if (scene && meshRef.current) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);

      const maxDimension = Math.max(size.x, size.y, size.z);
      const scale = 20 / maxDimension;

      meshRef.current.scale.set(scale, scale, scale);

      const center = new THREE.Vector3();
      box.getCenter(center);
      meshRef.current.position.set(
        -center.x * scale,
        -center.y * scale,
        -center.z * scale
      );

      meshRef.current.rotation.y = Math.PI / 4;
    }
  }, [scene]);

    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.0005;
      }
    });

  return <primitive ref={meshRef} object={scene.clone()} />;
};

// Preload model for performance
useGLTF.preload("/assets/Brush.glb");

const ModelViewer = () => {
  return (
    <Canvas
      style={{ height: "100vh", background: "transparent" }}
      camera={{ position: [0, 0, 20] }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableZoom={false} enableRotate={true} />
      <Model />
    </Canvas>
  );
};

export default ModelViewer;
