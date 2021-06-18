import React, { Suspense } from 'react'
import * as THREE from 'three'

import {
  FlyControls,
  Html,
  OrbitControls,
  Reflector,
  Stars,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Loader, useGLTF, softShadows } from '@react-three/drei'
import { useRef } from 'react'
import styled from 'styled-components'
import {
  EffectComposer,
  Noise,
  Pixelation,
  DepthOfField,
  Vignette,
  Bloom,
} from '@react-three/postprocessing'

softShadows()

const Screen = styled.div`
  width: 150px;
  height: 155px;
  transform: scale(0.5);
  /* background-color: gray; */
  /* transform-origin: top left; */
`

const ScreenContent = styled.div`
  top: 0;
  left: 0;
  width: 150px;
  height: 155px;
  background-color: white;
  border-radius: 8px;
  padding: 10px;

  > h2 {
    font-size: 12px;
  }
`

const Box = () => {
  const mesh = useRef()

  useFrame(() => {
    mesh.current.rotation.x += 0.01
    mesh.current.rotation.y += 0.005
  })

  return (
    <mesh
      receiveShadow
      castShadow
      ref={mesh}
      position-y={1}
      material-roughness={0.75}
      material-metalness={1}
    >
      <boxGeometry />
      <meshStandardMaterial
        attach="material"
        roughness={0}
        metalness={1}
        color="orange"
      />
    </mesh>
  )
}

const AnotherBox = () => {
  const mesh = useRef()

  useFrame(() => {
    mesh.current.rotation.x += 0.01
    mesh.current.rotation.y += 0.005
  })

  return (
    <mesh receiveShadow castShadow ref={mesh} position={[-2, 1, 2]} scale={0.5}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  )
}

const Plane = () => {
  return (
    <mesh
      receiveShadow
      castShadow
      rotation-x={-Math.PI / 2}
      scale={[300, 300, 0.2]}
    >
      <planeGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
`

const Container = styled.div`
  position: absolute;
  top: 0;

  > h1 {
    color: white;
    margin: 0;
    padding: 1em;
    font-size: 64px;
    font-weight: 800;
    text-transform: uppercase;
  }
`

const App = () => {
  return (
    <Root>
      <Canvas shadows camera={{ position: [5, 5, 5] }}>
        <fog attach="fog" args={['#000', 16, 50]} />
        <OrbitControls
          // autoRotate
          enablePan={false}
          enableZoom={true}
          // maxPolarAngle={Math.PI / 3}
          // minPolarAngle={Math.PI / 3}
        />
        <ambientLight intensity={0.6} />
        <pointLight castShadow position={[5, 5, 5]} />
        <Stars />
        {/* <Plane /> */}
        <Box />
        {/* <AnotherBox /> */}
        <EffectComposer>
          {/* <Pixelation granularity={4} /> */}
          {/* <DepthOfField
            focusDistance={0}
            focalLength={0.1}
            bokehScale={2}
            height={480}
          /> */}
          {/* <Bloom luminanceThreshold={0} luminanceSmoothing={2} height={300} /> */}
          <Noise opacity={0.02} />
          <Vignette />
        </EffectComposer>
        <gridHelper args={[1000, 1000]}>
          <meshBasicMaterial color="lime" />
        </gridHelper>
      </Canvas>
      <Container className="App">
        <h1>Testing three fiber</h1>
      </Container>
    </Root>
  )
}

export default App
