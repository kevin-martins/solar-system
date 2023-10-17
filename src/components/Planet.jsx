import { useTexture } from '@react-three/drei';
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { addCoordinates, texturePath } from '../helpers/helpers';

const Atmosphere = ({ name, size, rSpeed, ...props }) => {
    const rotation = useRef()
    const cloudTexture = useTexture({
        map: texturePath(name, 'Cloud', '.png'),
    })
    cloudTexture.transparent = true
    useFrame(() => {
        rotation.current.rotation.y += rSpeed
    })
    return (
        <>
            <mesh {...props} ref={rotation} >
                <sphereGeometry args={[size + .03, 64, 64]} />
                <meshPhongMaterial {...cloudTexture} />
            </mesh>
        </>
    )
}

export const Planet = ({ name, size = 1, bump = .7, atm = false, rSpeed = .001, ...props }) => {
    const rotation = useRef()
    const groundTextures = useTexture({
        map: texturePath(name, 'Color'),
        // bumpMap: texturePath(name, 'Displacement') || '',
    })
    groundTextures.bumpScale = bump

    useFrame(() => {
        rotation.current.rotation.y += !atm && rSpeed
    })

    return (
        <>
            {name === "sun" && <pointLight position={[0, 0, 5]} intensity={1.5} />}
            <mesh {...props} ref={rotation}>
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
