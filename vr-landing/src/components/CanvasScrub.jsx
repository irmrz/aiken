import { useEffect, useRef } from 'preact/hooks';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CanvasScrub({ startFrame, endFrame, folderPath, extension = 'webp' }) {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const images = useRef([]);
  const frameCount = endFrame - startFrame + 1; // Cantidad total de fotos
  const airplay = useRef({ frame: 0 });

  const preloadImages = () => {
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Calculamos el número actual: 242, 243...
      const currentNumber = startFrame + i;
      // Construimos el string exacto: TL00220 + número
      img.src = `${folderPath}/TL00220${currentNumber}.${extension}`;
      images.current.push(img);
    }
  };

  const render = () => {
    const img = images.current[airplay.current.frame];
    if (img && contextRef.current) {
      // Dibujar imagen cubriendo todo el canvas (estilo object-fit: cover)
      const canvas = canvasRef.current;
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
      contextRef.current.drawImage(
        img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  };

  useEffect(() => {
    contextRef.current = canvasRef.current.getContext('2d');
    preloadImages();

    // Sincronizar el tamaño del canvas con la pantalla
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;

    // Animación de GSAP
    gsap.to(airplay.current, {
      frame: frameCount - 1,
      snap: "frame", // Obliga a que el número sea entero
      ease: "none",
      scrollTrigger: {
        trigger: canvasRef.current,
        start: "top top",
        end: "+=300%", // La velocidad: 300% de la altura de pantalla
        scrub: 0.5,    // Suavizado (inercia)
        pin: true,     // Bloquea el canvas mientras scrolleas
      },
      onUpdate: render // Dibuja en cada cambio de frame
    });

    // Renderizar primer frame al cargar
    if (images.current) {
        images.current.onload = render;
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ display: 'block', width: '100vw', height: '100vh' }}
    />
  );
}