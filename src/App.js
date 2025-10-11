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
import '@coreui/coreui/dist/css/coreui.min.css'
import "./App.css";
import { useLocalStorage } from './hooks/useLocalStorage';
import { useEffect } from 'react';

export const App = () => {
  const { groupId } = useParams();
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [person, , popout] = usePerson();
  const [babies, addBaby, deleteBabies, getBaby, updateBaby] = useBabies({ userId: person.vkId });
  const [selectedBaby, setSelectedBaby] = useLocalStorage("selected.baby", null);//TODO
  const [records, addRecord,
    deleteRecords, updateRecord, getByBabyAndGroup,
    getRecord, refreshRecord] = useActivityRecords({ userId: person.vkId, babyId: selectedBaby?.id, groupId: groupId });
  const [activities, , , getActivityById] = useActivities({ groupId });
  const [groups] = useActivityGroups();


  const onChangeBaby = (newBaby) => {
    setSelectedBaby({ ...newBaby });
  }

  useEffect(() => {
    if (babies != null && selectedBaby != null) {
      const id = babies.find(item => item.id === selectedBaby.id);
      if (id == null) {
        setSelectedBaby(null);
      }
    }
  }, [babies, selectedBaby]);

  return (
    <SplitLayout>
      <SplitCol>
        <AppModalRoot
          person={person}
          addBaby={addBaby}
          getBaby={getBaby}
          updateBaby={updateBaby}
          getRecord={getRecord}
          updateRecord={updateRecord}
          getActivityById={getActivityById}
          refreshRecord={refreshRecord} />
        {babies && <View activePanel={activePanel}>
          <Home
            id="home"
            getActivityById={getActivityById}
            babies={babies}
            selectedBaby={selectedBaby}
            onChangeBaby={onChangeBaby}
            records={records}
            groups={groups}
            deleteRecords={deleteRecords}/>
          <Activities
            id="activities"
            getActivityById={getActivityById}
            activities={activities}
            selectedBaby={selectedBaby}
            babies={babies}
            createRecord={addRecord}
            records={records}
            deleteRecords={deleteRecords}>
          </Activities>
          <Settings id="settings" person={person}
            babies={babies} deleteBabies={deleteBabies} selectedBaby={selectedBaby}></Settings>
        </View>}
      </SplitCol>
      {/* {popout} */}
    </SplitLayout>
  );
};
