import React from "react";
import { TabsConfig } from "./tab-types";

type Props = {
  tabs: TabsConfig;
  currentTab: string;
  setCurrentTab: (newTab: string) => void;
};

const TabButtons = ({ tabs, currentTab, setCurrentTab }: Props) => {
  const tabKeys = Object.keys(tabs);

  const tabElements = tabKeys.map((tabKey) => (
    <button
      key={tabKey}
      style={{ backgroundColor: currentTab == tabKey ? "blue" : "gray" }}
      onClick={() => setCurrentTab(tabKey)}
    >
      {tabs[tabKey].title}
    </button>
  ));

  return <div>{tabElements}</div>;
};

export default TabButtons;
