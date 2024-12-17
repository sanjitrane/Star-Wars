import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../../hooks/useDebounce";

jest.useFakeTimers(); 

describe("useDebounce hook", () => {
  let callback: jest.Mock;

  beforeEach(() => {
    callback = jest.fn();
  });

  it("should not call the function immediately", () => {
    const { result } = renderHook(() => useDebounce(callback, 1000));

    act(() => {
      result.current();
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it("should call the function after the debounce delay", () => {
    const { result } = renderHook(() => useDebounce(callback, 1000));

    act(() => {
      result.current();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should call the function immediately when immediate is true", () => {
    const { result } = renderHook(() => useDebounce(callback, 1000, true));

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should call the function after debounce delay when immediate is true", () => {
    const { result } = renderHook(() => useDebounce(callback, 1000, true));

    act(() => {
      result.current();
    });
    act(() => {
      result.current();
    });
    act(() => {
      result.current();
    });
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should clear the previous timer when called multiple times", () => {
    const { result } = renderHook(() => useDebounce(callback, 1000));

    act(() => {
      result.current();
    });
    act(() => {
      result.current();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });
});
