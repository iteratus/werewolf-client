import React, { useRef } from "react";
import classNames from "classnames";
import PropTypes from 'prop-types';

import styles from "./Button.module.scss";

const Button = (props:any): JSX.Element => {
  const {
    ariaLabel,
    children,
    className,
    disabled,
    name,
    onClick,
    size,
    type,
    ...other
  } = props;

  let generateId = 0;
  const buttonRef = useRef();
  const generateKey = ( prefix:string )  => {
    generateId += 1;
    return `${prefix || 'id'}-${generateId}`;
  }

  const key = generateKey('button');
  const buttonClassNames = [
    styles.button,
    styles[size],
    className,
  ];

  const Attributes = {
    className: classNames(buttonClassNames),
    children: [
      (children) && (
        <span key={`${key}-text`} className={styles.text}>
            {children}
          </span>
      )],
    disabled,
    onClick,
    type,
    ...other,
  };

  return (
    <button
      {...Attributes}
      aria-label={ariaLabel}
    />
  );
};

Button.propTypes = {
  /** Label for screen reader */
  ariaLabel:  PropTypes.string,
  /** @ignore */
  children: PropTypes.node,
  /** @ignore */
  className: PropTypes.string,
  /** Disabled button state */
  disabled: PropTypes.bool,
  /** Name from button */
  name: PropTypes.string,
  /** Fired after button click*/
  onClick: PropTypes.func,
  /** Size of the button */
  size: PropTypes.oneOf(['regular', 'large']),
  /** Type of the button */
  type: PropTypes.oneOf(['button', 'submit']),
}

Button.defaultProps = {
  ariaLabel: null,
  children: null,
  className: null,
  disabled: false,
  onClick: {},
  size: 'regular',
  type: 'button',
}

export default Button;
