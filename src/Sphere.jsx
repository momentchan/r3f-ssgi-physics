import { useFrame } from '@react-three/fiber'
import { BallCollider, RigidBody } from '@react-three/rapier'
import { easing } from 'maath'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'


export default function Sphere({ position, children, vec = new THREE.Vector3(), scale, r = THREE.MathUtils.randFloatSpread, color = 'white', ...props }) {
    const body = useRef()
    const mesh = useRef()
    const pos = useMemo(() => position || [r(10), r(10), r(10)], [])
    
    useFrame((state, delta) => {
        delta = Math.min(0.1, delta)
        body.current?.applyImpulse(vec.copy(body.current.translation()).negate().multiplyScalar(0.2))
        easing.dampC(mesh.current.material.color, color, 0.2, delta)
    })

    return (
        <RigidBody
            ref={body}
            position={pos}
            linearDamping={4}
            angularDamping={1}
            friction={0.1}
            colliders={false}
        >
            <BallCollider args={[1]} />
            <mesh ref={mesh} castShadow receiveShadow>
                <sphereGeometry args={[1, 64, 64]} />
                <meshStandardMaterial {...props} />
                {children}
            </mesh>
        </RigidBody>)
}