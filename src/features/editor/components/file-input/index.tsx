import { ChangeEvent, ReactNode, useCallback, useRef } from "react";

import styles from "./index.module.scss";

type Props = {
  onChange: (file: File | null | undefined) => void;
  className?: string;
  children?: ReactNode;
};

export default function FileInput({ onChange, className, children }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files == null || e.target.files.length !== 1) {
        onChange(null);
      } else {
        onChange(e.target.files[0]);
        e.target.value = ""; // Reset
      }
    },
    [onChange]
  );

  return (
    <>
      <button onClick={handleClick} className={className}>
        {children}
      </button>
      <input
        type="file"
        className={styles.input}
        ref={inputRef}
        onChange={handleChange}
      />
    </>
  );
}
