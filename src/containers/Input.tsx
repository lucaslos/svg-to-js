import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { colorPrimary, colorSecondary, colorRed } from 'style/theme';
import { Header } from 'components/Header';
import rgba from 'utils/rgba';
import Button from 'components/Button';
import css from '@emotion/css';
import { IconSet } from 'containers/App';
import iconSet from 'data/icons';

type Props = {
  input: IconSet;
  onChangeName: (id: number, newInput: string) => void;
  onChangeSvg: (id: number, newInput: string) => void;
  deleteIcon: (id: number) => void;
  addIcon: () => void;
};

type Event = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

const IconsContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px;

  border: 1.5px solid ${colorPrimary};
  border-radius: 2px;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
`;

const SvgIcon = styled.div`
  width: 100%;
  border: 1px dashed ${rgba(colorSecondary, 0.5)};
  border-radius: 2px;
  margin-bottom: 12px;

  font-size: 12px;
  line-height: 1.5;
`;

const IconName = styled.input`
  width: calc(100% - 24px);
  background: transparent;
  color: ${colorSecondary};
  outline: none;
  border: 0;
  padding: 12px 0;
  padding-right: 28px;
  margin: 0 12px;
  border-bottom: 1px solid ${rgba(colorPrimary, 0.5)};
`;

const SvgString = styled.textarea`
  display: block;
  color: ${colorSecondary};
  width: 100%;
  min-height: 78px;
  resize: vertical;
  border: 0;
  line-height: 1.5;

  padding: 12px;
  background: transparent;
  outline: none;
`;

const circularButtonStyle = css`
  width: 40px;
  height: 40px;
  padding: 0;
  margin: 0;
  margin-top: 4px;

  &::before {
    opacity: 0;
    background: ${colorPrimary};
  }

  &:hover::before {
    opacity: 0.1;
  }
`;

const deleteButton = css`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 30px;
  height: 30px;
  padding: 0;
  margin: 0;
  opacity: 0;
  transition: 160ms;

  &::before {
    border-radius: 40px;
    opacity: 0;
    background: ${colorRed};
  }

  &:hover::before {
    opacity: 0.1;
  }

  ${SvgIcon}:hover & {
    opacity: 1;
  }
`;

const Input = ({
  input,
  onChangeName,
  onChangeSvg,
  addIcon,
  deleteIcon,
}: Props) => (
  <>
    <Header>SVG</Header>
    <IconsContainer>
      {input.map((svgIcon, i) => (
        <SvgIcon key={i}>
          <IconName
            placeholder="Name"
            value={svgIcon.name}
            onChange={(e: Event) => onChangeName(svgIcon.id, e.target.value)}
            spellCheck={false}
          />
          <SvgString
            placeholder="SVG"
            value={svgIcon.svg}
            onChange={(e: Event) => onChangeSvg(svgIcon.id, e.target.value)}
            spellCheck={false}
          />
          <Button icon="subtract" onClick={() => deleteIcon(svgIcon.id)} css={deleteButton} iconColor={colorRed} />
        </SvgIcon>
      ))}
      <Button
        icon="add"
        onClick={addIcon}
        iconSize={32}
        css={circularButtonStyle}
      />
    </IconsContainer>
  </>
);

export default Input;
