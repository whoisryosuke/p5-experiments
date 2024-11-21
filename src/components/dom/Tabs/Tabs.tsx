import React, { ReactElement, useEffect, useState } from "react";
import { TabsConfig } from "./tab-types";
import TabButtons from "./TabButtons";

type Props = {
  tabs: TabsConfig;
  defaultTab: string;
};

const Tabs = ({ tabs, defaultTab }: Props) => {
  const [currentTab, setCurrentTab] = useState(defaultTab);

  return (
    <div>
      <TabButtons
        tabs={tabs}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      {tabs[currentTab].content}
    </div>
  );
};

export default Tabs;
