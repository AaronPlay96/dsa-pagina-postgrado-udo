export interface Postgrado {
    name: string;
    pensum: Materia[];
}

export interface Materia {
    nombre: string;
    codigo: string;
    creditos: number;
}
