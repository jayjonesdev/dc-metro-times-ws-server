declare global {
  namespace NodeJS {
    interface ProcessEnv {
        WMATA_API_KEY: string;
    }
  }
}
export {};
