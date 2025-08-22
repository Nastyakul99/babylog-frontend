import { useEffect } from 'react';
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Persik, Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { usePerson } from './hooks/usePerson';
import { Activities } from './panels/Activities';
import { Settings } from './panels/settings/Settings';
import AppModalRoot from './components/modals/AppModalRoot';
import "./App.css";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [person, , popout] = usePerson();

  useEffect(() => {
  }, [])

 console.log(person)
  return (
    <SplitLayout>
      <SplitCol>
        <AppModalRoot person={person}/>
        <View activePanel={activePanel}>
          <Home id="home" user={person?.user} />
          <Activities id="activities"></Activities>
          <Persik id="persik" />
          <Settings id="settings" person={person}></Settings>
        </View>
      </SplitCol>
      {/* {popout} */}
    </SplitLayout>
  );
};
