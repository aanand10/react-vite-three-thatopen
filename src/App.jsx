import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Box(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : props.boxColor} />
    </mesh>
  );
}

export default function App() {
  const [boxColor, setBoxColor] = useState("#ff0000");
  const [distnBetweenBox, setDistnBetweenBox] = useState(1);

  return (
    <div className="container">
      <div className="controls">
        <label htmlFor="boxColorInput">Box Color</label>
        <input
          type="color"
          name="boxColor"
          id="boxColorInput"
          value={boxColor}
          onChange={(e) => setBoxColor(e.target.value)}
        />
        <br />
        <label htmlFor="DistnBetweenBox">Distance Between Boxes</label>
        <input
          type="range"
          name="DistnBetweenBox"
          id="DistnBetweenBox"
          value={distnBetweenBox}
          onChange={(e) =>
            setDistnBetweenBox(
              (distnBetweenBox) => (distnBetweenBox = e.target.value)
            )
          }
          min={1}
          max={5}
          step={0.1}
        />

        {distnBetweenBox}
      </div>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-distnBetweenBox, 0, 0]} boxColor={boxColor} />
        <Box position={[distnBetweenBox, 0, 0]} boxColor={boxColor} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
