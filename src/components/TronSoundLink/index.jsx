import React from 'react';
import { useTronHoverSound } from '../../hooks/useTronHoverSound';

export const TronSoundLink = ({ children, ...props }) => {
  const handleHover = useTronHoverSound();

  return React.cloneElement(children, {
    ...props,
    onMouseEnter: (e) => {
      handleHover();
      // Call the original onMouseEnter if it exists
      children.props.onMouseEnter?.(e);
    }
  });
}; 