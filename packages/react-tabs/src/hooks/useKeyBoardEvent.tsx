import React from 'react';

interface KeyboardEvent {
  handleKeyDown: (event: React.KeyboardEvent) => void;
}

export default function usekeyBoardEvent(
  index: number,
  total: number,
  onChange: (index: number) => void
): KeyboardEvent {
  const onPrevTab = () => {
    const ind = index - 1;
    if (ind < 0) {
      onChange(total - 1);
    } else {
      onChange(ind);
    }
  };

  const onNextTab = () => {
    const ind = index + 1;
    if (ind < total) {
      onChange(ind);
    } else {
      onChange(0);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        onPrevTab();
        break;
      case 'ArrowRight':
        event.preventDefault();
        onNextTab();
        break;
      case 'Home':
        event.preventDefault();
        onChange(0);
        break;
      case 'End':
        event.preventDefault();
        onChange(total - 1);
        break;
      default:
        break;
    }
  };

  return { handleKeyDown };
}
