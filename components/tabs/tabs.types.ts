export interface TabsProps {
  tab: number;
  tabs: ReadonlyArray<string>;
  setTab: (tab: number) => void;
}
