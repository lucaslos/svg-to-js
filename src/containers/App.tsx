import { css } from '@emotion/core';
import Input from 'containers/Input';
import Output from 'containers/Output';
import React, { useEffect, useState } from 'react';
import { fillContainer } from 'style/modifiers';
import { colorBg, colorPrimary } from 'style/theme';
import useDebounce from 'utils/hooks/useDebounce';
import svgToJson from 'utils/svgToJson';

export type IconSet = {
  id: number;
  name: string;
  svg: string;
}[];

export const appContainerStyle = css`
  ${fillContainer};
  overflow: hidden;
  padding: 16px;

  background: ${colorBg};
  color: ${colorPrimary};

  display: grid;
  grid-template-columns: 1fr minmax(0, 1fr);
  grid-template-rows: auto 1fr;

  gap: 16px;
`;

let uniqueId = 1;

const App = () => {
  const [iconSet, setIconSet] = useState<IconSet>([
    {
      id: 0,
      name: 'iconName',
      svg: '',
    },
  ]);
  const [output, setOutput] = useState('');
  const [outputError, setOutputError] = useState(false);

  const debounceInput = useDebounce(iconSet, 500);

  function onChangeName(id: number, newName: string) {
    setIconSet(
      iconSet.map(icon => (icon.id === id ? { ...icon, name: newName } : icon)),
    );
  }

  function onChangeSvg(id: number, newSvg: string) {
    setIconSet(
      iconSet.map(icon => (icon.id === id ? { ...icon, svg: newSvg } : icon)),
    );
  }

  function deleteIcon(id: number) {
    setIconSet(iconSet.filter(icon => icon.id !== id));
  }

  function addIcon() {
    setIconSet([
      ...iconSet,
      {
        id: uniqueId++,
        name: `iconName${uniqueId}`,
        svg: '',
      },
    ]);
  }

  useEffect(() => {
    svgToJson(iconSet).then(
      outPut => {
        setOutput(outPut);
        setOutputError(false);
      },
      (err: Error | string) => {
        console.log(err);
        setOutputError(true);
        setOutput(typeof err === 'string' ? err : err.message);
      },
    );
  }, [debounceInput]);

  return (
    <>
      <Input
        input={iconSet}
        deleteIcon={deleteIcon}
        onChangeName={onChangeName}
        onChangeSvg={onChangeSvg}
        addIcon={addIcon}
      />
      <Output output={output} error={outputError} />
    </>
  );
};

export default App;
