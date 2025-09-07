"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";

const Model = ({ containerSize }) => {
  const meshRef = useRef();

  const { scene } = useGLTF("/assets/Brush.glb", true, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    loader.setDRACOLoader(dracoLoader);
  });

  useEffect(() => {
    if (
      scene &&
      meshRef.current &&
      containerSize.width &&
      containerSize.height
    ) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);

      const maxDimension = Math.max(size.x, size.y, size.z);

      // Determine scale based on container size and model size
      const scaleFactor =
        (Math.min(containerSize.width, containerSize.height) / maxDimension) *
        0.5;

      meshRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);

      const center = new THREE.Vector3();
      box.getCenter(center);
      meshRef.current.position.set(
        -center.x * scaleFactor,
        -center.y * scaleFactor,
        -center.z * scaleFactor
      );

      meshRef.current.rotation.y = Math.PI / 4;
    }
  }, [scene, containerSize]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }
  });

  return <primitive ref={meshRef} object={scene.clone()} />;
};


const ModelViewer = () => {
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setDimensions({
        width: clientWidth,
        height: clientHeight || 400,
      });
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "400px" }}>
      <Canvas
        style={{ background: "transparent", width: "100%", height: "100%" }}
        camera={{ position: [0, 0, 8] }}
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
