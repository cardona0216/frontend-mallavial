// types.ts
export interface Calzada {
    id: number;
    nombre: string;
    material: string;
  }
  
  export interface Bordillo {
    id: number;
    tipo: string;
    material: string;
  }
  
  export interface Segmento {
    id: number;
    nombre: string;
    calzadas: Calzada[];
    bordillos: Bordillo[];
  }
  