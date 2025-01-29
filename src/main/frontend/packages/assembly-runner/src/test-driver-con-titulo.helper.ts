export class TestDriverConTitulo  {

    titulo: string;

    constructor(titulo: string) {
      this.titulo = titulo;
    }

    async hacerAlgoQueRetornaElTitulo(): Promise<string> {
      return new Promise((resolve) => setTimeout(() => resolve(this.titulo), 100));
    }
}
