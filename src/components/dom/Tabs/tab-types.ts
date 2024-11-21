export type TabConfig = {
  title: string;
  icon?: string;
  content: ReactElement;
};
export type TabsConfig = Record<string, TabConfig>;
