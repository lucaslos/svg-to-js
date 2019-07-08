import iconsSet from 'data/icons.ts';
import * as React from 'react';
import { colorPrimary } from 'style/theme';
import { obj } from 'typings/utils';

export type JsonIcon = {
  viewBox?: string;
  paths?: (obj | string)[];
};

export type Icons = keyof typeof iconsSet;

type Icon = {
  name?: Icons;
  iconObj?: JsonIcon;
  color?: string;
  size?: number;
};

const Icon = ({ name, color = colorPrimary, size = 24, iconObj }: Icon) => {
  if (__DEV__) {
    if (name && !iconsSet[name]) throw new Error(`Icon ${name} do not exists`);
  }

  const { viewBox, paths }: JsonIcon =
    iconObj || (name ? iconsSet[name] : {});

  return (
    <svg
      css={{
        height: size,
        width: size,
        fill: color,
      }}
      className="icon"
      viewBox={viewBox}
    >
      {paths &&
        paths.map((attributes, i) => (
          <path
            key={i}
            {...(typeof attributes === 'string'
              ? { d: attributes }
              : attributes
            )}
          />
        ))}
    </svg>
  );
};

export default Icon;
