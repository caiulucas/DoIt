import 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme {
    mode: string;

    colors: {
      background: string;
      text: string;
      border: string;
      placeholder: string;
    };
  }
}
