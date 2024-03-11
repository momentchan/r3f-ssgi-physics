import { Environment, Lightformer } from "@react-three/drei";
import { Canvas } from '@react-three/fiber'
import { Physics } from "@react-three/rapier";
import { useMemo, useReducer } from "react";
import Sphere from "./Sphere";
import Effect from "./Effect";
import Pointer from "./r3f-gist/interaction/Pointer";

const colorPresets = ['#ff4060', '#ffcc00', '#20ffa0', '#4060ff']

const reducerFunction = (state, action) => {
    return ++state % colorPresets.length
};

const shuffle = (color = 0) => [
    { color: '#444', roughness: 0.1, metalness: 0.5 },
    { color: '#444', roughness: 0.1, metalness: 0.5 },
    { color: '#444', roughness: 0.1, metalness: 0.5 },
    { color: 'white', roughness: 0.1, metalness: 0.1 },
    { color: 'white', roughness: 0.1, metalness: 0.1 },
    { color: 'white', roughness: 0.1, metalness: 0.1 },
    { color: colorPresets[color], roughness: 0.1, isPreset: true },
    { color: colorPresets[color], roughness: 0.1, isPreset: true },
    { color: colorPresets[color], roughness: 0.1, isPreset: true },
    { color: '#444', roughness: 0.1 },
    { color: '#444', roughness: 0.3 },
    { color: '#444', roughness: 0.3 },
    { color: 'white', roughness: 0.1 },
    { color: 'white', roughness: 0.2 },
    { color: 'white', roughness: 0.1 },
    { color: colorPresets[color], roughness: 0.1, isPreset: true, transparent: true, opacity: 0.5 },
    { color: colorPresets[color], roughness: 0.3, isPreset: true },
    { color: colorPresets[color], roughness: 0.1, isPreset: true }
]

export default function App() {
    const [colorPresets, click] = useReducer(reducerFunction, 0)

    // update connectors when colorPresets changed
    const connectors = useMemo(() => shuffle(colorPresets), [colorPresets])

    return <>
        <Canvas
            flat // no tone-mapping
            shadows
            dpr={[1, 1.5]}
            gl={{ antialias: false }}
            onClick={click}

            camera={{
                position: [0, 0, 30],
                fov: 17.5,
                near: 10,
                far: 40,
            }}>

            <color attach="background" args={['#141622']} />

            <Physics /*debug*/ gravity={[0, 0, 0]}>
                <Pointer />
                {connectors.map((props, i) => (
                    <Sphere key={i} {...props} />
                ))}
            </Physics>


            <Environment resolution={256}>
                <group rotation={[-Math.PI / 3, 0, 1]}>
                    <Lightformer form="circle" intensity={100} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
                    <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
                    <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={2} />
                    <Lightformer form="circle" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={8} />
                    <Lightformer form="ring" color="#4060ff" intensity={80} onUpdate={(self) => self.lookAt(0, 0, 0)} position={[10, 10, 0]} scale={10} />
                </group>
            </Environment>

            <Effect />
        </Canvas>
    </>
}