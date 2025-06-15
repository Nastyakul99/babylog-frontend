import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { View, SplitLayout, SplitCol, ScreenSpinner } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import { Persik, Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { PanelHeader, Panel } from '@vkontakte/vkui'
import { SettingsButton } from './pages/Settings/SettingsButton';
import { FamilySettings } from './pages/Settings/FamilySettings';
import { PanelHeaderButton } from '@vkontakte/vkui';
import { Icon28CameraOutline } from '@vkontakte/icons';
import { Icon28AddOutline } from '@vkontakte/icons';
import { createPerson } from './api/persons';

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [user, setUser] = useState();
  const [popout, setPopout] = useState(<ScreenSpinner />);

  useEffect(() => {
    async function fetchData() {
      const userTmp = await bridge.send('VKWebAppGetUserInfo');
      setUser(userTmp);
      setPopout(null);
      console.log(userTmp)
      createPerson(userTmp.id);
    }
    fetchData();

  }, []);

  return (
    <SplitLayout>
      <SplitCol>
        <View activePanel={activePanel}>
          <Home id="home" fetchedUser={user} />
          <Persik id="persik" />
          <FamilySettings id="family"></FamilySettings>
        </View>
      </SplitCol>
      {popout}
    </SplitLayout>
  );
};
