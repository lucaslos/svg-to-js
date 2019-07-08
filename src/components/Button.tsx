import css from '@emotion/css';
import styled from '@emotion/styled';
import Icon, { Icons } from 'components/Icon';
import React from 'react';
import { letterSpacing } from 'style/helpers';
import { centerContent, fillContainer } from 'style/modifiers';
import { colorPrimary, colorGradient, colorBg } from 'style/theme';

type Props = {
  label?: string;
  onClick?: () => any;
  className?: string;
  href?: string;
  noNewTab?: boolean;
  icon?: Icons;
  bgColor?: string;
  iconColor?: string;
  iconSize?: number;
  disabled?: boolean;
};

const Container = styled.a<{ as?: string; disabled?: boolean }>`
  ${centerContent};
  position: relative;
  padding: 0 16px;
  height: 24px;
  margin: 4px;
  display: inline-flex;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  color: ${colorBg};
  cursor: ${p => (p.disabled ? 'auto' : 'pointer')};
  opacity: ${p => (p.disabled ? 0.5 : 1)};

  &::before {
    ${fillContainer};
    content: '';
    background: ${colorGradient()};
    opacity: 0.85;
    transition: 160ms;
    border-radius: 8px;
  }

  &:hover::before {
    opacity: ${p => (p.disabled ? 0.85 : 1)};
  }

  span {
    ${letterSpacing(12)};
  }
`;

const Button = ({
  label,
  onClick,
  className,
  href,
  icon,
  iconColor = colorPrimary,
  disabled,
  noNewTab,
  iconSize,
}: Props) => (
  <Container
    className={className}
    as={!href ? 'button' : undefined}
    type={!href ? 'button' : undefined}
    href={href}
    onClick={onClick}
    disabled={disabled}
    target={!href || noNewTab ? undefined : '_blank'}
  >
    {icon && (
      <Icon
        size={iconSize}
        css={label && { marginRight: 16 }}
        name={icon}
        color={iconColor}
      />
    )}
    {label && <span>{label}</span>}
  </Container>
);

export default Button;
