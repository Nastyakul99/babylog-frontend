import { Panel, PanelHeader } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { SettingsButton } from '../settings/SettingsButton';
import { BackButton } from './BackButton';
import { DEFAULT_VIEW_PANELS } from '../../routes';
import { BabyDropdown } from '../../components/BabyDropdown';
import { ActivityRecordsLog } from '../../components/ActivityRecordsLog/ActivityRecordsLog';

export const Wrapp = ({ id, children, babies = [],
  selectedBaby = null, onChangeBaby = () => { },
  records = [], getActivityById = () => { } }) => {

  const ifSettings = () => {
    return id === DEFAULT_VIEW_PANELS.SETTINGS;
  }

  const ifHome = () => {
    return id === DEFAULT_VIEW_PANELS.HOME;
  }

  const before = ifHome() ? <BabyDropdown babies={babies}
    selectedBabyId={selectedBaby?.id || null} onChangeBaby={onChangeBaby}>
  </BabyDropdown> : <BackButton></BackButton>;

  return (
    <Panel id={id}>
      <PanelHeader
        before={before}
        after={!ifSettings() && <SettingsButton></SettingsButton>}>
      </PanelHeader>
      {children}
      {records.length > 0 && <ActivityRecordsLog getActivityById={getActivityById} records={records}></ActivityRecordsLog>}
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
};