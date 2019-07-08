const iconSet = {
  add: {
    viewBox: '0 0 32 32',
    paths: [
      {
        d: 'M17 15V7h-2v8H7v2h8v8h2v-8h8v-2h-8z',
      },
    ],
  },
  subtract: {
    viewBox: '0 0 32 32',
    paths: [
      {
        d: 'M7 15h18v2H7z',
      },
    ],
  },
};

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const testIconTypes: {
    [k: string]: {
      viewBox: string;
      paths: {
        d: string;
      }[];
    };
  } = iconSet;
}

export default iconSet;
