import { useEffect } from 'react';
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Persik, Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { usePerson } from './hooks/usePerson';
import { Activities } from './panels/Activities';
import { Settings } from './panels/settings/Settings';
import AppModalRoot from './components/modals/AppModalRoot';
import { useBabies } from './hooks/useBabies';
import "./App.css";

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [person, , popout] = usePerson();
  const [babies, add, deleteBabies, getBaby, update] = useBabies({ userId: person.vkId });

  useEffect(() => {
  }, [])

  return (
    <SplitLayout>
      <SplitCol>
        <AppModalRoot person={person} addBaby={add} getBaby={getBaby} updateBaby={update} />
        <View activePanel={activePanel}>
          <Home id="home" user={person?.user} />
          <Activities id="activities"></Activities>
          <Persik id="persik" />
          <Settings id="settings" person={person}
            babies={babies} deleteBabies={deleteBabies}></Settings>
        </View>
      </SplitCol>
      {/* {popout} */}
    </SplitLayout>
  );
};
