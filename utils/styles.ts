import { CSS, globalCss } from 'stitches.config';

export const globalStyles = globalCss({
  body: {
    fontFamily: '$body',
    WebkitFontSmoothing: 'antialiased',
    color: '$black100',
    transition: 'background-color $2 $ease',
    overflowX: 'hidden',
  },
});

export const hasError = (meta: any, forceError: boolean): boolean =>
  (meta.error && meta.touched) || (meta.error && forceError);

export const getErrorStyles = (errorVisible: boolean): CSS => {
  const inputShadow = `inset 0 0 0 2px #F93A3A, 0px 10px 20px rgba(0,0,0,0.1)`;
  if (errorVisible) {
    return {
      boxShadow: inputShadow,
      '&:focus': {
        boxShadow: inputShadow,
      },
    };
  }
};

// Hack: gradient must be used for multiple background layers are merged
// See https://css-tricks.com/tinted-images-multiple-backgrounds/
const createBackgroundImageColorLayer = (
  r: number,
  g: number,
  b: number,
  a: number
): string => {
  const color = `rgba(${r}, ${g}, ${b}, ${a})`;
  return `linear-gradient(${color}, ${color})`;
};

type CanvasBackgroundOptions = {
  imageUrl?: string;
  patternBackgroundSize?: string;
};
export const createCanvasBackground = ({
  imageUrl,
  patternBackgroundSize = 'auto',
}: CanvasBackgroundOptions): CSS => {
  const patternLayer = 'url(/images/patterns/canvas-grid.svg)';
  const tintLayer = createBackgroundImageColorLayer(0, 0, 0, 0.2);
  const imageLayer = `url(${imageUrl})`;
  const baseLayer = createBackgroundImageColorLayer(0, 0, 0, 1);

  return {
    backgroundImage: imageUrl
      ? `${patternLayer}, ${tintLayer}, ${imageLayer}, ${baseLayer}`
      : `${patternLayer}, ${baseLayer}`,
    backgroundSize: imageUrl
      ? `${patternBackgroundSize}, auto, cover, auto`
      : `${patternBackgroundSize}, auto`,
    backgroundPosition: 'center',
  };
};

type GridAttribute = 'marginBottom' | 'gap';

export const getGridSpacingStyles = (attribute: GridAttribute): CSS => {
  return {
    [attribute]: '$4',
    '@bp2': {
      [attribute]: '$6',
    },
    '@bp4': {
      [attribute]: '$7',
    },
  };
};

const BASELINE_GRID = 4;
const toPx = (value: number) => `${value}px`;

export function onGridPx(multiplier: number) {
  return toPx(onGrid(multiplier));
}

export function onGrid(multiplier: number) {
  return BASELINE_GRID * multiplier;
}

export function supportsHover() {
  if (typeof window === 'undefined') {
    return true;
  }

  const isTouchDevice =
    'ontouchstart' in window.document.documentElement ||
    window.navigator.maxTouchPoints > 0;

  return isTouchDevice === false;
}
