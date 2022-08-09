import "styled-components";
import { color, media, spacing, fontSize } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    color: typeof color;
    media: typeof media;
    spacing: typeof spacing;
    fontSize: typeof fontSize;
  }
}
