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
import '@coreui/coreui/dist/css/coreui.min.css'
import "./App.css";
import { useLocalStorage } from './hooks/useLocalStorage';
import { useEffect, useState } from 'react';
import { findUnfinished } from './calcRecords/calcRecords';
import { createContext } from 'react';
import { Info } from './panels/wrapp/InfoAlert/Info';
import { ALERT_TYPES } from './panels/wrapp/InfoAlert/AlertTypes';

export const ErrorContext = createContext();

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
  const [unfinishedRecords, setUnfinishedRecords] = useState([]);
  const [errors, setErrors] = useState([]);

  const addError = (newError) => {
    const exists = errors.some(error => error.id === newError.id);
    if (!exists) {
      setErrors([...errors, newError]);
    }
  }

  useEffect(() => {
    const unfinished = findUnfinished(records);
    if (unfinished.length > 0) {
      setUnfinishedRecords(unfinished);
      return;
    }
    setUnfinishedRecords([]);
  }, [records])

  useEffect(() => {
    if (babies) {
      let info = (babies.length === 0 && "Добавьте малыша в настройках") || (selectedBaby == null && "Выберите малыша") || null;

      if (info) addError(new Info(-1, info, ALERT_TYPES.INFO));
    }
  }, [babies, selectedBaby])

  const setUnfinishedRecord = (record) => {
    const unfinished = unfinishedRecords.map(r => r.id === record.id ? record : r);
    setUnfinishedRecords(unfinished);
  }


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
        <ErrorContext.Provider value={{ errors, setErrors, addError }}>
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
              setUnfinishedRecord={setUnfinishedRecord}>
            </Activities>
            <Settings
              id="settings"
              person={person}
              babies={babies}
              deleteBabies={deleteBabies}
              selectedBaby={selectedBaby}>
            </Settings>
            <Charts
              id="charts"
              getActivityById={getActivityById}
              babies={babies}
              selectedBaby={selectedBaby}
              onChangeBaby={onChangeBaby}
              records={records}
              groups={groups}
              deleteRecords={deleteRecords} >
            </Charts>
          </View>}
        </ErrorContext.Provider>
      </SplitCol>
      {/* {popout} */}
    </SplitLayout>
  );
};
