"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";

const Model = ({ containerSize }) => {
  const groupRef = useRef();
  const { scene } = useGLTF("/assets/Brush.glb", true, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);
  });

  useEffect(() => {
    if (
      scene &&
      groupRef.current &&
      containerSize.width &&
      containerSize.height
    ) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);

      const maxDimension = Math.max(size.x, size.y, size.z);

      const scaleFactor =
        Math.min(
          containerSize.width / maxDimension,
          containerSize.height / maxDimension
        ) * 0.9;

      scene.scale.set(scaleFactor, scaleFactor, scaleFactor);

      const center = new THREE.Vector3();
      box.getCenter(center);

      scene.position.set(
        -center.x * scaleFactor,
        -center.y * scaleFactor,
        -center.z * scaleFactor
      );

      groupRef.current.position.set(0, -2, 0); // Shift entire group down
      groupRef.current.rotation.y = Math.PI / 4;
    }
  }, [scene, containerSize]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene.clone()} />
    </group>
  );
};


const ModelViewer = () => {
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({
          width: clientWidth,
          height: clientHeight || 400,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "600px" }}>
      <Canvas
        style={{ background: "transparent", width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls enableZoom={false} enableRotate={true} />
        <Model containerSize={dimensions} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
