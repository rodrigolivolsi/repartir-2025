export class TestAdapterConTitulo  {

  async hacerAlgoQueRetornaElTitulo(): Promise<string> {
    return new Promise((resolve) => setTimeout(() => resolve("hola mundo"), 100));
  }
}

