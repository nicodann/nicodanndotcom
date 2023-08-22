export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_GOOGLE_API_KEY: string;
      REACT_APP_CALENDAR_ID: string;
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}