import { useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";
import { IoMdArrowDropdown } from "react-icons/io";

export type SelectItem = {
  readonly label: string;
  readonly value: string | number;
};

export type SelectValue<T extends readonly SelectItem[]> = T[number]["value"];

type Props<T extends readonly SelectItem[]> = {
  value: SelectValue<T>;
  items: T;
  handleSelect: (value: SelectValue<T>) => void;
};

export default function Select<T extends readonly SelectItem[]>({
  value,
  items,
  handleSelect,
}: Props<T>) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handler = (ev: MouseEvent) => {
      if (ev.target && !divRef.current?.contains(ev.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, [isOpen]);

  return (
    <div ref={divRef} className={styles.wrap}>
      <button
        className={styles.indicator}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        {items.find((v) => v.value === value)?.label}
        <IoMdArrowDropdown size={30} />
      </button>
      {isOpen && (
        <div className={styles.menu}>
          {items.map((item) => (
            <button
              key={item.value}
              className={styles.btn}
              onClick={() => {
                handleSelect(item.value);
                setIsOpen(false);
              }}
              role="checkbox"
              aria-checked={value === item.value}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
