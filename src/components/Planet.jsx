import { useTexture } from '@react-three/drei';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { addCoordinates, texturePath } from '../helpers/helpers';
import * as THREE from 'three'

const Atmosphere = ({ name, size, rSpeed, ...props }) => {
    const motion = useRef()
    const cloudTexture = useTexture({
        map: texturePath(name, 'Cloud', '.png'),
    })
    cloudTexture.transparent = true
    useFrame(() => {
        motion.current.rotation.y += rSpeed
    })
    return (
        <>
            <mesh {...props} ref={motion} >
                <sphereGeometry args={[size + .03, 64, 64]} />
                <meshPhongMaterial {...cloudTexture} />
            </mesh>
        </>
    )
}

export const Planet = ({ name, size = 1, bump = .7, atm = false, rSpeed = .001, ...props }) => {
    const motion = useRef()
    const groundTextures = useTexture({
        map: texturePath(name, 'Color'),
        // bumpMap: texturePath(name, 'Displacement') || '',
    })
    groundTextures.bumpScale = bump

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        motion.current.rotation.y += !atm && rSpeed
        // motion.current.position.z = THREE.MathUtils.lerp(motion.current.position.z, Math.cos(t), 0.5)
    })

    return (
        <>
            {name === "sun" && <pointLight position={[0, 0, 5]} intensity={1.5} />}
            <mesh {...props} ref={motion}>
                {/* {name === "sun" && <ambientLight intensity={1} />} */}
                <sphereGeometry args={[size, 64, 64]} />
                <meshPhongMaterial {...groundTextures} />
            </mesh>
            {atm === true && <Atmosphere name={name} size={size} rSpeed={rSpeed} {...props} />}
            {name === "earth" && <Planet name="moon" position={addCoordinates(props.position, [.7, .7, -.5])} size={.1} />}
        </>
    )
}

export default Planet
