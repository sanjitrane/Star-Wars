import { render, screen, fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import { useClickedOutside } from '../../hooks/useClickedOutside';

type TestComponentProps = {
  callback: (event: MouseEvent | TouchEvent) => void;
};

const TestComponent = ({ callback }: { callback: jest.Mock }) => {
  const ref:any = useRef<HTMLDivElement>(null);
  useClickedOutside(ref, callback);

  return (
    <div>
      <div data-testid="inside" ref={ref}>
        Inside
      </div>
      <div data-testid="outside">Outside</div>
    </div>
  );
};

describe('useClickedOutside', () => {
  it('calls the callback when clicking outside the referenced element', () => {
    const callback = jest.fn();    
    render(<TestComponent callback={callback} />);
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call the callback when clicking inside the referenced element', () => {
    const callback = jest.fn();
    render(<TestComponent callback={callback} />);
    fireEvent.mouseDown(screen.getByTestId('inside'));
    expect(callback).not.toHaveBeenCalled();
  });

  it('calls the callback when touch starts outside the referenced element', () => {
    const callback = jest.fn();
    render(<TestComponent callback={callback} />);
    fireEvent.touchStart(screen.getByTestId('outside'));
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('does not call the callback when touch starts inside the referenced element', () => {
    const callback = jest.fn();
    render(<TestComponent callback={callback} />);
    fireEvent.touchStart(screen.getByTestId('inside'));
    expect(callback).not.toHaveBeenCalled();
  });
});
