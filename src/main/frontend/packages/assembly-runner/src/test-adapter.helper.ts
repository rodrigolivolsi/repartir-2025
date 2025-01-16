export class TestAdapter  {

  async hacerAlgo(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

  async hacerAlgoConParametros(cadena: string, contador: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, 100);
    });
  }

  async hacerAlgoQueRetornaUnString(): Promise<string> {
    return new Promise((resolve) => setTimeout(() => resolve("hola mundo"), 100));
  }

  sumarLambda = async (n1: number, n2: number): Promise<number> => {
    return new Promise((resolve) => setTimeout(() => resolve(n1 + n2), 100));
  };

  async sumarNoLambda(n1: number, n2: number): Promise<number> {
    return new Promise((resolve) => setTimeout(() => resolve(n1 + n2), 100));
  }

  hacerAlgoSincrono(): string {
    return "resultado sincrónico";
  }
}

