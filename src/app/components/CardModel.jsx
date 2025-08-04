"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Text } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";

const CardModel = ({ name, role, company }) => {
  const meshRef = useRef();

  const { scene } = useGLTF("/assets/card.glb", true, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
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

  return (
    <group ref={meshRef}>
      <primitive object={scene.clone()} />
      <Text
        position={[0, 0.6, 0.1]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
      <Text
        position={[0, 0.3, 0.1]}
        fontSize={0.12}
        color="#ccc"
        anchorX="center"
        anchorY="middle"
      >
        {role}
      </Text>
      <Text
        position={[0, 0, 0.1]}
        fontSize={0.1}
        color="#999"
        anchorX="center"
        anchorY="middle"
      >
        {company}
      </Text>
    </group>
  );
};

useGLTF.preload("/assets/Brush.glb");

const CardModelViewer = ({ name, role, company }) => {
  return (
    <div style={{ width: "300px", height: "300px" }}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 20] }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls enableZoom={false} enableRotate={true} />
        <CardModel name={name} role={role} company={company} />
      </Canvas>
    </div>
  );
};

export default CardModelViewer;
