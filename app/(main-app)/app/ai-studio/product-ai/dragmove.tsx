import { useEffect, useRef, useState } from "react";
import Moveable, { OnDrag, OnResize, OnRotate } from "react-moveable";

interface ResizableRotatableImagesProps {
  img_url: string;
  setNormalizedPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  setNormalizedScale: React.Dispatch<React.SetStateAction<string>>;
  style: React.CSSProperties;
}

const ResizableRotatableImages: React.FC<ResizableRotatableImagesProps> = ({
  img_url,
  setNormalizedPosition,
  setNormalizedScale,
  style,
}) => {
  const targetRef = useRef<HTMLImageElement | null>(null);
  const [target, setTarget] = useState<HTMLImageElement | null>(null);
  const [position, setPosition] = useState({
    x: 0.1 * 300, // Start with normalized offset (dynamic for the card width)
    y: 0.1 * 300, // Start with normalized offset (dynamic for the card height)
  });
  const [rotation, setRotation] = useState(0);
  const [size, setSize] = useState({ width: 50, height: 50 }); // Initial size
  const [cardSize, setCardSize] = useState({ width: 300, height: 300 }); // Dynamic container size

  const MIN_SIZE = 50; // Minimum size
  const MAX_SIZE = 200; // Maximum size
  const minScale = 0.1; // Minimum scale value
  const maxScale = 1.0; // Maximum scale value
  const MIN_POSITION = 0.1; // Minimum normalized position offset

  useEffect(() => {
    setTarget(targetRef.current);

    // Dynamically adjust the card size based on window dimensions
    const updateCardSize = () => {
      const width = Math.min(window.innerWidth * 0.8, 300);
      const height = Math.min(window.innerHeight * 0.8, 300);
      setCardSize({ width, height });
    };

    updateCardSize();
    window.addEventListener("resize", updateCardSize);
    return () => window.removeEventListener("resize", updateCardSize);
  }, []);

  const updatePosition = (left: number, top: number) => {
    const maxLeft = cardSize.width - size.width;
    const maxTop = cardSize.height - size.height;

    const normalizedPosition = {
      x: Math.max(MIN_POSITION * cardSize.width, Math.min(left, maxLeft)),
      y: Math.max(MIN_POSITION * cardSize.height, Math.min(top, maxTop)),
    };

    setPosition(normalizedPosition);
  };

  const calculateNormalizedScale = () => {
    const dimension = Math.max(size.width, size.height);
    const scale =
      minScale +
      ((dimension - MIN_SIZE) / (MAX_SIZE - MIN_SIZE)) * (maxScale - minScale);

    return scale.toFixed(2);
  };

  const logTransformations = () => {
    // Normalize the position values so that they fit within 0 to 1 range
    const normalizedX = Math.min(1.0, position.x / cardSize.width);
    const normalizedY = Math.min(1.0, position.y / cardSize.height);

    // Ensure the normalized values are capped to 0.99 for corner positions
    const x = normalizedX === 1.0 ? 0.99 : normalizedX;
    const y = normalizedY === 1.0 ? 0.99 : normalizedY;

    const uniformScale = calculateNormalizedScale();

    setNormalizedPosition({
      x: parseFloat(x.toFixed(2)),
      y: parseFloat(y.toFixed(2)),
    });
    setNormalizedScale(uniformScale);

    console.log({
      normalizedPosition: {
        x: x.toFixed(2),
        y: y.toFixed(2),
      },
      scale: uniformScale,
      rotation_degree: rotation.toFixed(1),
    });
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/assets/transparent-background.png")',
        position: "relative",
        width: `${cardSize.width}px`,
        height: `${cardSize.height}px`,
        backgroundColor: "#d1d5db",
        overflow: "hidden",
        objectFit: "cover",
        borderRadius: "10px",
        backgroundSize: "contain",
      }}
    >
      <img
        ref={targetRef}
        src={img_url}
        alt="Moveable Image"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
      />

      {target && (
        <Moveable
          target={target}
          container={null}
          origin
          draggable
          throttleDrag={0}
          onDrag={(e: OnDrag) => {
            const { left, top } = e;
            updatePosition(left, top);
            logTransformations();
          }}
          onResize={(e: OnResize) => {
            let { width, height } = e;

            width = Math.max(MIN_SIZE, Math.min(MAX_SIZE, width));
            height = Math.max(MIN_SIZE, Math.min(MAX_SIZE, height));

            setSize({ width, height });
            updatePosition(position.x, position.y);
            logTransformations();
          }}
          onRotate={(e: OnRotate) => {
            const { beforeRotate } = e;
            setRotation(parseFloat(beforeRotate.toFixed(1)));
            logTransformations();

            const maxLeft = cardSize.width - size.width;
            const maxTop = cardSize.height - size.height;

            const normalizedPosition = {
              x: Math.min(
                Math.max(MIN_POSITION * cardSize.width, position.x),
                maxLeft
              ),
              y: Math.min(
                Math.max(MIN_POSITION * cardSize.height, position.y),
                maxTop
              ),
            };

            setPosition(normalizedPosition);
          }}
          rotatable
          resizable
          throttleRotate={0}
          throttleResize={0}
        />
      )}
    </div>
  );
};

export default ResizableRotatableImages;
