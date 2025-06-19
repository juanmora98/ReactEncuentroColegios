// Importar todas las imágenes de la carpeta ojos
import ojos1 from "resources/img/Sistemas/ActDiaIngeniero/ojos/ojos1.png";
import ojos2 from "resources/img/Sistemas/ActDiaIngeniero/ojos/ojos2.png";
import ojos3 from "resources/img/Sistemas/ActDiaIngeniero/ojos/ojos3.png";
import ojos4 from "resources/img/Sistemas/ActDiaIngeniero/ojos/ojos4.png";
// Agregar más imágenes aquí cuando las tengas:
import sonrisa1 from "resources/img/Sistemas/ActDiaIngeniero/bocas/sonrisa1.png";
import sonrisa2 from "resources/img/Sistemas/ActDiaIngeniero/bocas/sonrisa2.png";
import sonrisa3 from "resources/img/Sistemas/ActDiaIngeniero/bocas/sonrisa3.png";
import sonrisa4 from "resources/img/Sistemas/ActDiaIngeniero/bocas/sonrisa4.png";
import nariz1 from "resources/img/Sistemas/ActDiaIngeniero/narices/nariz1.png";
import nariz2 from "resources/img/Sistemas/ActDiaIngeniero/narices/nariz2.png";
import nariz3 from "resources/img/Sistemas/ActDiaIngeniero/narices/nariz3.png";
import nariz4 from "resources/img/Sistemas/ActDiaIngeniero/narices/nariz4.png";

// Crear un objeto que contenga todas las imágenes
export const FaceImages = {
  ojos: {
    ojo1: ojos1,
    ojo2: ojos2,
    ojo3: ojos3,
    ojo4: ojos4
  },
  sonrisas: {
    sonrisa1: sonrisa1,
    sonrisa2: sonrisa2,
    sonrisa3: sonrisa3,
    sonrisa4: sonrisa4,
  },
  narices:{
    nariz1: nariz1,
    nariz2: nariz2,
    nariz3: nariz3,
    nariz4: nariz4
  }
};

// Función helper para obtener imágenes por categoría
export const getImagesByCategory = (category: keyof typeof FaceImages) => {
  return FaceImages[category] || {};
};

// Función helper para obtener una imagen específica
export const getImage = (category: keyof typeof FaceImages, imageName: string) => {
  const categoryImages = FaceImages[category];
  return categoryImages ? categoryImages[imageName as keyof typeof categoryImages] : null;
};
