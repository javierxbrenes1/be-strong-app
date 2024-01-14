import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

const MemberContext = createContext<{
  reloadMeasures: boolean;
  reloadLastMeasure: boolean;
  lastMeasureId: number;
  setLastMeasureId: (id: number) => void;
  triggerReloadMeasures: () => void;
  triggerReloadLastMeasure: () => void;
}>({
  reloadMeasures: false,
  reloadLastMeasure: false,
  lastMeasureId: -1,
  setLastMeasureId: () => {},
  triggerReloadMeasures: () => {},
  triggerReloadLastMeasure: () => {},
});

export function MemberContextProvider(props: {
  children: ReactNode | ReactNode[];
}) {
  const { children } = props;
  const [reloadMeasures, setReloadMeasures] = useState(false);
  const [reloadLastMeasure, setReloadLastMeasure] = useState(false);
  const [lastMeasureId, setLastMeasureId] = useState(-1);

  const triggerReloadMeasures = () => {
    setReloadMeasures(true);
    setTimeout(() => {
      setReloadMeasures(false);
    }, 100);
  };

  const triggerReloadLastMeasure = () => {
    setReloadLastMeasure(true);
    setTimeout(() => {
      setReloadLastMeasure(false);
    }, 100);
  };

  const value = useMemo(
    () => ({
      reloadLastMeasure,
      reloadMeasures,
      triggerReloadMeasures,
      triggerReloadLastMeasure,
      lastMeasureId,
      setLastMeasureId,
    }),
    [reloadMeasures, reloadLastMeasure, lastMeasureId]
  );

  return (
    <MemberContext.Provider value={value}>{children}</MemberContext.Provider>
  );
}

export function useMemberContext() {
  const context = useContext(MemberContext);
  return context;
}
