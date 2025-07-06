import { Panel, PanelHeader } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { SettingsButton } from '../settings/SettingsButton';

export const Wrapp = ({ id, children }) => {

  return (
    <Panel id={id}>
      <PanelHeader after={<SettingsButton></SettingsButton>}>
      </PanelHeader>
      {children}
    </Panel>
  );
};

Wrapp.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any
};