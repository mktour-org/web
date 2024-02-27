import { tabs } from '@/app/tournament/components/mocks';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRef } from 'react';

const TabsContainer = ({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: (value: string) => void;
}) => {
  const value = currentTab || 'main';
  const tabRef = useRef<HTMLDivElement>(null);

  const handleChange = (value: string) => {
    const index = tabs.indexOf(value);
    setCurrentTab(value);
    tabRef?.current?.children[index].scrollIntoView({ behavior: 'smooth' });
  };

  const TabsIteratee = () => (
    <>
      {tabs.map((tab) => (
        <TabsTrigger key={tab} className="w-full" value={tab}>
          {tab}
        </TabsTrigger>
      ))}
    </>
  );

  return (
    <Tabs
      defaultValue="main"
      onValueChange={(value) => handleChange(value)}
      value={value}
      className="w-full"
    >
      <TabsList
        ref={tabRef}
        className="tabs-list flex w-full flex-row justify-between overflow-scroll"
      >
        <TabsIteratee />
      </TabsList>
    </Tabs>
  );
};

export default TabsContainer;
