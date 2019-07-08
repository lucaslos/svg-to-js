import React, { useState } from 'react';
import styled from '@emotion/styled';
import { colorPrimary, colorSecondary, colorRed } from 'style/theme';
import { Header } from 'components/Header';
import Button from 'components/Button';
import css from '@emotion/css';
import Icon from 'components/Icon';
import { centerContent } from 'style/modifiers';
import rgba from 'utils/rgba';
import removeUnneededQuotes from 'utils/removeUnneededQuotes';

type Props = {
  output: string;
  error: boolean;
};

const JsonOutput = styled.div`
  width: 100%;
  height: 100%;
  border: 1.5px solid ${colorPrimary};
  border-radius: 2px;
  overflow: auto;
  white-space: pre-wrap;

  padding: 12px;
  padding-bottom: 40px;
  padding-top: 4px;
  color: ${colorSecondary};
  font-size: 12px;
  line-height: 1.5;
`;

const IconsPreview = styled.div`
  ${centerContent};
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 8px;
  padding-bottom: 4px;
  border-bottom: 1px solid ${rgba(colorPrimary, 0.5)};
`;

const IconWrapper = styled.div`
  padding: 4px;
  margin: 4px;
  border: 1px dashed ${rgba(colorSecondary, 0.2)};

  svg {
    display: block;
  }
`;

const OutputWrapper = styled.div`
  margin-top: 4px;
`;

function JsonParseWithTryCatch(json: string) {
  try {
    return JSON.parse(json);
  } catch (err) {
    console.error(err);
    return false;
  }
}

const Output = ({ output, error }: Props) => {
  const [copyWarning, setCopyWarning] = useState('');
  const cleanOutput = removeUnneededQuotes(output);

  function showCopyWarning(text: string) {
    setCopyWarning(text);
    setTimeout(() => setCopyWarning(''), 2000);
  }

  function copyOutput() {
    if (cleanOutput !== '' && !error) {
      navigator.clipboard.writeText(cleanOutput).then(
        () => {
          showCopyWarning('✔ Copied');
        },
        err => {
          console.error('Could not copy text', err);
          showCopyWarning('Could not copy text');
        },
      );
    }
  }

  const parsedIcons = !!output && JsonParseWithTryCatch(`{${output}}`);

  return (
    <>
      <Header
        css={css`
          grid-column: 2;
          grid-row: 1;
        `}
      >
        JSON Icon
        <Button
          label="Copy"
          onClick={copyOutput}
          disabled={output === '' || error}
          css={css`
            margin: 0 12px;
          `}
        />
        {copyWarning}
      </Header>
      <JsonOutput>
        {parsedIcons && (
          <IconsPreview>
            {Object.keys(parsedIcons).map((iconName, i) => (
              <IconWrapper key={i} title={iconName}>
                <Icon iconObj={parsedIcons[iconName]} color={colorSecondary} />
              </IconWrapper>
            ))}
          </IconsPreview>
        )}
        <OutputWrapper style={{ color: error ? colorRed : undefined }}>
          {cleanOutput}
        </OutputWrapper>
      </JsonOutput>
    </>
  );
};

export default Output;
