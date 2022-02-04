import React, { useRef, useState} from 'react';
import { Canvas, useFrame } from '@react-three/fiber'
import {Link} from 'react-router-dom';
import { Text } from "@react-three/drei";

const RotatingBox = () => {
  const myMesh:any = React.useRef();
  const [hovered, hover] = useState(false)
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a/3;
    myMesh.current.rotation.z = a/6;
  });

  return (
    <mesh ref={myMesh}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}
    >
      <boxBufferGeometry
        args={[3, 3, 3]}/>
      <meshPhongMaterial 
        attach="material" 
        color={hovered ? 'red' : '#ffe4c4'} 
        wireframe />
    </mesh>
  );
}

export const Box = () => {
  return (
    <Canvas 
      style={{'height': '380px', 'width': '380px' , 'padding': '10px', 'overflow': 'visible'}} >
    
        <RotatingBox />
        <ambientLight intensity={0.1} />
        <directionalLight color={'white'} position={[0, 0, 5]} />
        <directionalLight />
      </Canvas>
  );
};