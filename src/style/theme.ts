import rgba from 'utils/rgba';

/* colors hex */
export const colorPrimary = '#C1FE00';
export const colorSecondary = '#28B1FF';
export const colorBg = '#111';
export const colorRed = '#E53558';

/* gradients */
export const colorGradient = (
  alpha: number = 1,
  deg: number = 45,
) => `linear-gradient(${deg}deg, ${rgba(colorPrimary, alpha)} 0%, ${rgba(
  colorSecondary,
  alpha,
)} 100%);
`;

/* fonts */
export const fontPrimary = 'Source Code Pro, sans-serif';
export const fontSecondary = 'Source Sans Pro, sans-serif';

export const easeInOut = 'cubic-bezier(0.4, 0, 0.2, 1)';
export const easeOut = 'cubic-bezier(0, 0, 0.2, 1)';
