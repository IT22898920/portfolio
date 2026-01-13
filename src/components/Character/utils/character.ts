import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  onProgress?: (progress: number) => void
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = async () => {
    return new Promise<GLTF | null>((resolve, reject) => {
      // Track decryption progress (0-20%)
      if (onProgress) onProgress(0);

      decryptFile(
        "/models/character.enc",
        "Character3D#@",
        (decryptProgress) => {
          // Map decryption progress to 0-20% of total
          if (onProgress) {
            onProgress(Math.floor(decryptProgress * 0.2));
          }
        }
      )
        .then((encryptedBlob) => {
          // Decryption complete - 20%
          if (onProgress) onProgress(20);

          const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

          let character: THREE.Object3D;
          loader.load(
            blobUrl,
            async (gltf) => {
              character = gltf.scene;

              // Model loaded - 90%
              if (onProgress) onProgress(90);

              await renderer.compileAsync(character, camera, scene);

              // Compilation complete - 95%
              if (onProgress) onProgress(95);

              character.traverse((child: THREE.Object3D) => {
                if (child instanceof THREE.Mesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                  child.frustumCulled = true;
                }
              });

              // Final setup complete - 100%
              if (onProgress) onProgress(100);

              resolve(gltf);
              setCharTimeline(character, camera);
              setAllTimeline();
              character!.getObjectByName("footR")!.position.y = 3.36;
              character!.getObjectByName("footL")!.position.y = 3.36;
              dracoLoader.dispose();
            },
            (xhr) => {
              // Actual model download progress (20% to 90%)
              if (xhr.lengthComputable) {
                const loadProgress = (xhr.loaded / xhr.total) * 70; // 70% of total progress
                const totalProgress = 20 + loadProgress; // Add decryption progress
                if (onProgress) {
                  onProgress(Math.floor(totalProgress));
                }
              } else {
                // If not computable, estimate based on loaded bytes
                const estimatedProgress = Math.min(
                  20 + (xhr.loaded / 1000000) * 10,
                  85
                );
                if (onProgress) {
                  onProgress(Math.floor(estimatedProgress));
                }
              }
            },
            (error) => {
              console.error("Error loading GLTF model:", error);
              reject(error);
            }
          );
        })
        .catch((err) => {
          reject(err);
          console.error(err);
        });
    });
  };

  return { loadCharacter };
};

export default setCharacter;
