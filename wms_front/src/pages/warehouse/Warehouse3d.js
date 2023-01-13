import React, { useRef, Suspense, useState } from "react";
import { render } from "react-dom";
import { Canvas, extend, useThree, useFrame } from "react-three-fiber";
import {OrbitControls, PerspectiveCamera, Stars} from '@react-three/drei'
import { Mesh } from "three";
import { useDrag } from "react-use-gesture";

const Box =()=>{
    const ref = useRef()
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
    return(
        <mesh position={[0,5,0]} onClick={()=>console.log("박스 누름")}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
                  
            <boxBufferGeometry attach="geometry" args={[10,10,10]}/>
            <meshLambertMaterial attach="material" color={hovered ? 'red' : 'blue'}/>
        </mesh>
    )
}
const Plane =()=>{
    return(
        <mesh position={[0,0,0]} rotation={[-Math.PI/2,0,0]} onClick={()=>console.log("판 누름")}>
            <planeBufferGeometry attach="geometry" args={[100,200]} />
            <meshLambertMaterial attach="material" color= "lightblue"/>
        </mesh>
    )
}
const Camera =()=>{
    return(
        PerspectiveCamera
    )
}

export default function Warehouse3d(){

    const style = {
        width : 1000,
        height : 900,
        background : "black"
    }

    return (
        <Canvas style={style}>
            <OrbitControls/>
            <Stars/>
            <ambientLight intensity={0.5}/>
            <spotLight position={[0,100,20]} angle={2}/>
            <Plane/>
            <Box/>
        </Canvas>
    )
}