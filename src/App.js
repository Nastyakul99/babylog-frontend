import { useEffect, useState } from 'react';
import { useParams } from '@vkontakte/vk-mini-apps-router';
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { usePerson } from './hooks/usePerson';
import { Activities } from './panels/Activities';
import { Settings } from './panels/settings/Settings';
import AppModalRoot from './components/modals/AppModalRoot';
import { useBabies } from './hooks/useBabies';
import { useActivityRecords } from './hooks/useActivityRecords';
import { useActivities } from './hooks/useActivities';
import { useActivityGroups } from './hooks/useActivityGroups';
import "./App.css";

export const App = () => {
  const { groupId } = useParams();
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [person, , popout] = usePerson();
  const [babies, addBaby, deleteBabies, getBaby, updateBaby] = useBabies({ userId: person.vkId });
  const [selectedBaby, setSelectedBaby] = useState(babies[0] || null);//TODO брать из истории
  const [records, addRecord,
    deleteRecords, updateRecord,
    getRecord, refreshRecord] = useActivityRecords({ userId: person.vkId, babyId: selectedBaby?.id, groupId: groupId });

  const [activities, , , getActivityById] = useActivities({ groupId });
  const [groups] = useActivityGroups();


  const onChangeBaby = (newBaby) => {
    setSelectedBaby({ ...newBaby });
  }

  return (
    <SplitLayout>
      <SplitCol>
        <AppModalRoot person={person} addBaby={addBaby} getBaby={getBaby} updateBaby={updateBaby} />
        <View activePanel={activePanel}>
          <Home id="home" getActivityById={getActivityById} babies={babies}
            selectedBaby={selectedBaby} onChangeBaby={onChangeBaby} records={records} groups={groups}/>
          <Activities id="activities" getActivityById={getActivityById} activities={activities} baby={selectedBaby} createRecord={addRecord} records={records}></Activities>
          <Settings id="settings" person={person}
            babies={babies} deleteBabies={deleteBabies}></Settings>
        </View>
      </SplitCol>
      {/* {popout} */}
    </SplitLayout>
  );
};
