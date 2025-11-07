import { Panel, PanelHeader } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { SettingsButton } from '../settings/SettingsButton';
import { ChartButton } from '../../components/ChartButton';
import { BackButton } from './BackButton';
import { DEFAULT_VIEW_PANELS } from '../../routes';
import { BabyDropdown } from '../../components/BabyDropdown';
import { ActivityRecordsLog } from '../../components/ActivityRecordsLog/ActivityRecordsLog';
import "./Wrapp.css"
import { InfoAlert } from './InfoAlert';
import { FixedLayout } from '@vkontakte/vkui';
import { RecordEditor } from '../../components/RecordEditor/RecordEditor';

export const Wrapp = ({ id, children, babies = [],
  selectedBaby = null, onChangeBaby = () => { },
  records = [], getActivityById = () => { },
  deleteRecords = async () => { },
  content,
  unfinishedRecord,
  updateRecord = () => { },
  setUnfinishedRecord = () => { } }) => {

  const ifSettings = () => {
    return id === DEFAULT_VIEW_PANELS.SETTINGS;
  }

  const ifHome = () => {
    return id === DEFAULT_VIEW_PANELS.HOME;
  }

  const before = ifHome() ? <BabyDropdown babies={babies}
    selectedBabyId={selectedBaby?.id || null} onChangeBaby={onChangeBaby}>
  </BabyDropdown> : <BackButton></BackButton>;

  let info = (babies.length == 0 && "Добавьте малыша в настройках") || (selectedBaby == null && "Выберите малыша") || "";

  return (
    <Panel id={id}>
      <div className="Wrapp">
        <FixedLayout vertical="top">
          <PanelHeader
            className='Wrapp__PanelHeader'
            fixed
            before={before}
            after={!ifSettings() && <><SettingsButton></SettingsButton>
              <ChartButton></ChartButton></>}>
          </PanelHeader>
          {children}
        </FixedLayout>
        <div className="Wrapp__content">
          {content}
          {unfinishedRecord &&
            <RecordEditor
              getActivityById={getActivityById}
              update={updateRecord}
              selectedRecord={unfinishedRecord}
              setSelectedRecord={setUnfinishedRecord}>
            </RecordEditor>}
          {records.length > 0 && <ActivityRecordsLog
            getActivityById={getActivityById}
            records={records}
            deleteRecords={deleteRecords}>
          </ActivityRecordsLog>}
          <InfoAlert info={info}></InfoAlert>
        </div>
      </div>
    </Panel>
  );
};

Wrapp.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  babies: PropTypes.array,
  selectedBaby: PropTypes.object,
  onChangeBaby: PropTypes.func,
  records: PropTypes.array,
  getActivityById: PropTypes.func,
  content: PropTypes.element
};