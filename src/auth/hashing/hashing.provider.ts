export abstract class HashingProvider {
  public abstract hashGenerator(password: string): Promise<string>;
  public abstract compareto(
    password: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
