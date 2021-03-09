export enum Category {
  CulturaYPatrimonio = 'Cultura y Patrimonio',
  Enoturismo = 'Enoturismo',
  Playas = 'Playas'
}

export enum SubcategoryCYP {
  Concierto = 'Concierto',
  Espectaculo = 'Espectáculo',
  Excursion = 'Excursión',
  Festivales = 'Festivales',
  VisitaGuiada = 'Visita Guiada',
  Museo = 'Museo',
  Monumento = 'Monumento'
}

export enum SubcategoryEno {
  Bodega = 'Bodega',
  CataDeProductos = 'Cata de Productos',
  Excursion = 'Excursión',
  MuseoDelVino = 'Museo del Vino',
  VisitaGuiada = 'Visita Guiada'
}

export enum SubcategoryPlaya {
  ActividadNautica = 'Actividad Náutica',
  Cala = 'Cala',
  Concierto = 'Concierto',
  Excursion = 'Excursión',
  Taller = 'Taller'
}

export enum Languages {
  Ingles = 'Inglés',
  Catalan = 'Catalán',
  Espanol = 'Español',
  Frances = 'Francés',
  Aleman = 'Alemán'
}

interface IActivity {
  readonly id?: number;
  readonly adminId: number;
  readonly name: string;
  readonly description: string;
  readonly category: Category;
  readonly subcategory: SubcategoryCYP | SubcategoryEno | SubcategoryPlaya;
  readonly price: number;
  readonly language: Languages;
  readonly date: string;
  peopleRegistered: Array<number>;
}

export class Activity implements IActivity {
  constructor(
    public adminId: number,
    public name: string,
    public description: string,
    public category: Category,
    public subcategory: SubcategoryCYP | SubcategoryEno | SubcategoryPlaya,
    public price: number,
    public language: Languages,
    public date: string,
    public peopleRegistered: Array<number>,
    public id?: number,
  ) {}
}

