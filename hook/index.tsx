import { useState } from "react";
import { useApp } from "@/context";

export const useTile = () => {
  const [selected, setSelected] = useState<number[]>([]);
  const [_selected, set_selected] = useState<number[][]>([[]]);
  const { appState } = useApp();
  const { easyMode } = appState;

  const continueBonusTable = {
    4: 3,
    5: 5,
    6: 7,
  };

  const handleOnPress = (n: number, gameMode = false) => {
    if (selected.length >= 6 && !gameMode) return;

    if (selected.length >= 12) return;
    setSelected([...selected, n]);

    const __selected = [..._selected];

    if (_selected?.[_selected.length - 1]?.includes(n)) {
      __selected[_selected.length] = [n];
    } else {
      __selected[_selected.length - 1] = [
        ...__selected[_selected.length - 1],
        n,
      ];
    }
    set_selected(__selected);
  };

  const continueBonus = (() => {
    return _selected
      .map((s) =>
        easyMode
          ? s.length > 3
            ? continueBonusTable[s.length as keyof typeof continueBonusTable]
            : 0
          : s.length >= 6
          ? 6
          : 0
      )
      .reduce((a, b) => a + b, 0);
  })();

  const tileScore = selected.reduce((a, b) => a + b, 0);

  const selectAll = () => {
    setSelected([1, 2, 3, 4, 5, 6]);
  };

  const reset = () => {
    setSelected([]);
    set_selected([[]]);
  };
  return {
    selected,
    setSelected,
    handleOnPress,
    continueBonus,
    tileScore,
    selectAll,
    reset,
    set_selected,
  };
};
