import { useParams } from '@vkontakte/vk-mini-apps-router';
import { View, SplitLayout, SplitCol } from '@vkontakte/vkui';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import { Home } from './panels';
import { DEFAULT_VIEW_PANELS } from './routes';
import { usePerson } from './hooks/usePerson';
import { Activities } from './panels/Activities';
import { Settings } from './panels/settings/Settings';
import { Charts } from './panels/charts/Charts';
import AppModalRoot from './components/modals/AppModalRoot';
import { useBabies } from './hooks/useBabies';
import { useActivityRecords } from './hooks/useActivityRecords';
import { useActivities } from './hooks/useActivities';
import { useActivityGroups } from './hooks/useActivityGroups';
import '@coreui/coreui/dist/css/coreui.min.css';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ErrorContext } from './contexts/ErrorContext';
import { useErrorHandling } from './hooks/useErrorHandling';
import { useUnfinishedRecords } from './hooks/useUnfinishedRecords';
import { useBabyValidation, useSelectedBabyCleanup } from './hooks/useBabyValidation';

const SELECTED_BABY_STORAGE_KEY = 'selected.baby';

export const App = () => {
  const { groupId } = useParams();
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();
  const [person] = usePerson();
  const [babies, addBaby, deleteBabies, getBaby, updateBaby] = useBabies({ userId: person.vkId });
  const [selectedBaby, setSelectedBaby] = useLocalStorage(SELECTED_BABY_STORAGE_KEY, null);
  
  const [records, addRecord, deleteRecords, updateRecord, , getRecord, refreshRecord] = 
    useActivityRecords({ userId: person.vkId, babyId: selectedBaby?.id, groupId });
  
  const [activities, , , getActivityById] = useActivities({ groupId });
  const [groups] = useActivityGroups();
  
  const { errors, setErrors, addError } = useErrorHandling();
  const [unfinishedRecords, setUnfinishedRecord] = useUnfinishedRecords(records);
  
  useBabyValidation(babies, selectedBaby, addError);
  useSelectedBabyCleanup(babies, selectedBaby, setSelectedBaby);

  const onChangeBaby = (newBaby) => {
    setSelectedBaby({ ...newBaby });
  };

  return (
    <SplitLayout>
      <SplitCol>
        <ErrorContext.Provider value={{ errors, setErrors, addError }}>
          <AppModalRoot
            person={person}
            addBaby={addBaby}
            getBaby={getBaby}
            updateBaby={updateBaby}
            getRecord={getRecord}
            updateRecord={updateRecord}
            getActivityById={getActivityById}
            refreshRecord={refreshRecord}
            records={records}/>
          {babies && <View activePanel={activePanel}>
            <Home
              id="home"
              getActivityById={getActivityById}
              babies={babies}
              selectedBaby={selectedBaby}
              onChangeBaby={onChangeBaby}
              records={records}
              groups={groups}
              deleteRecords={deleteRecords}
              unfinishedRecords={unfinishedRecords}
              setUnfinishedRecord={setUnfinishedRecord}
              updateRecord={updateRecord} />
            <Activities
              id="activities"
              getActivityById={getActivityById}
              activities={activities}
              selectedBaby={selectedBaby}
              babies={babies}
              createRecord={addRecord}
              records={records}
              deleteRecords={deleteRecords}
              unfinishedRecords={unfinishedRecords}
              updateRecord={updateRecord}
              setUnfinishedRecord={setUnfinishedRecord} />
            <Settings
              id="settings"
              person={person}
              babies={babies}
              deleteBabies={deleteBabies}
              selectedBaby={selectedBaby} />
            <Charts
              id="charts"
              getActivityById={getActivityById}
              babies={babies}
              selectedBaby={selectedBaby}
              onChangeBaby={onChangeBaby}
              records={records}
              groups={groups}
              deleteRecords={deleteRecords} />
          </View>}
        </ErrorContext.Provider>
      </SplitCol>
      {/* {popout} */}
    </SplitLayout>
  );
};
