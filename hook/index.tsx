import { useState } from "react";
import { useApp } from "@/context";

export const useTile = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const { appState } = useApp();
  const { easyMode } = appState;

  const continueBonusTable = {
    4: 3,
    5: 5,
    6: 7,
  };

  const handleOnPress = (n: number) => {
    if (selected.length >= 6) return;
    setSelected([...selected, n]);
  };

  const continueBonus = easyMode
    ? selected.length > 3
      ? continueBonusTable[selected.length as keyof typeof continueBonusTable]
      : 0
    : selected.length >= 6
    ? 6
    : 0;

  const tileScore = selected.reduce((a, b) => a + b, 0);

  const selectAll = () => {
    setSelected([1, 2, 3, 4, 5, 6]);
  };

  const reset = () => {
    setSelected([]);
  };
  return {
    selected,
    setSelected,
    handleOnPress,
    continueBonus,
    tileScore,
    selectAll,
    reset,
  };
};
