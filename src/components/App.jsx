// import { LayerMaterial, Depth } from 'lamina'
import React, { useEffect, useState } from 'react'
import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Planet from './Planet';

function App() {
  const planets = [
    { name: 'sun', position: 0, size: 696340, bump: .3 },
    { name: 'mercury', position: 58000000, size: 2439.7 },
    { name: 'venus', position: 108000000, size: 6051.8 },
    { name: 'earth', position: 150000000, size: 6371, atm: true, rSpeed: 0.0007 },
    { name: 'mars', position: 228000000, size: 3389.5 },
    { name: 'jupiter', position: 779000000, size: 69911 },
    { name: 'saturn', position: 1428000000, size: 58232 },
    { name: 'uranus', position: 2884000000, size: 25362 },
    { name: 'neptune', position: 4525000000, size: 24622 },
  ]

  const scalePlanet = (planet) => {
    const scaleRatio = 10000;
    planet = {
      ...planet,
      position: [planet.position / 10000000, 0, 0],
      size: planet.size / 10000
    }
    planets[planets.findIndex(p => p.name === planet.name)] = planet
    return planet
  }
  const addSunSize = (planet) => {
    const [x, y, z] = planet.position
    if (planet.name === 'sun') return planet
    return {
      ...planet,
      position: [planets.find(p => p.name === 'sun').size + x, y, z]
    }
  }

  return (
    <div>
      <header className="h-screen bg-gray-900">
        <h1>HEllo</h1>
        <Canvas>
          <pointLight position={[5, 3, 5]} intensity={1.5} />
          <hemisphereLight intensity={0.5} color="white" groundColor="black" />
          <hemisphereLight intensity={1} color="white" />
          <Stars radius={200} depth={30} count={5000} factor={8} saturation={0} fade speed={1} />
          {planets && planets.map((planet => (
            <Planet key={planet.name} {...addSunSize(scalePlanet(planet))} />
          )))}
          {/* <Planet name="pluto" position={[35.5, 0, 0]} size={.5} /> */}
          <OrbitControls position={[0, 0, -100]} />
        </Canvas>
      </header>
    </div>
  );
}

export default App;
