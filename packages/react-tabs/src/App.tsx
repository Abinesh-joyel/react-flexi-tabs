import { useState } from 'react';
import Tabs from './index';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const onSelectedTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div className="app">
      <Tabs value={activeTab} orientation="vertical">
        <Tabs.TabList onTabChange={onSelectedTab} type="line">
          <Tabs.Tab>
            <span className="label">Eye</span>
          </Tabs.Tab>
          <Tabs.Tab>
            <span className="label">Comments</span>
          </Tabs.Tab>
          <Tabs.Tab>
            <span className="label">Bell</span>
          </Tabs.Tab>
          <Tabs.Tab>
            <span className="label">Cog</span>
          </Tabs.Tab>
        </Tabs.TabList>

        <Tabs.TabPanel>
          <h3>Dashboard</h3>
          <p>Welcome to the Dashboard</p>
        </Tabs.TabPanel>

        <Tabs.TabPanel>
          <h3>Comments</h3>
          <p>Welcome to the Comments section</p>
        </Tabs.TabPanel>

        <Tabs.TabPanel>
          <h3>Notifications</h3>
          <p>No Notfications available</p>
        </Tabs.TabPanel>

        <Tabs.TabPanel>
          <h3>Settings</h3>
          <p>No Settings available</p>
        </Tabs.TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
