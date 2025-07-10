import { Panel, PanelHeader } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { SettingsButton } from '../settings/SettingsButton';
import { BackButton } from './BackButton';
import { DEFAULT_VIEW_PANELS } from '../../routes';

export const Wrapp = ({ id, children }) => {
  const ifSettings = () => {
    return id === DEFAULT_VIEW_PANELS.SETTINGS;
  }

  const ifHome = () => {
    return id === DEFAULT_VIEW_PANELS.HOME;
  }

  return (
    <Panel id={id}>
      <PanelHeader
        before={!ifHome() && <BackButton></BackButton>}
        after={!ifSettings() && <SettingsButton></SettingsButton>}>
      </PanelHeader>
      {children}
    </Panel>
  );
};

Wrapp.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any
};