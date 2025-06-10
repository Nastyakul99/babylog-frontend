import { Panel, PanelHeader } from '@vkontakte/vkui';
import PropTypes from 'prop-types';
import { SettingsButton } from '../pages/Settings/SettingsButton';
import { Group, CardGrid, Card } from '@vkontakte/vkui';

export const Wrapp = ({ id, children }) => {

  return (
    <Panel id={id}>
      <PanelHeader after={<SettingsButton></SettingsButton>}>
      </PanelHeader>
      <Group description="Внутри Group">
        <CardGrid size="s">
          <Card>
            <div style={{ paddingBottom: '92%' }} />
          </Card>
          <Card>
            <div style={{ paddingBottom: '92%' }} />
          </Card>
          <Card>
            <div style={{ paddingBottom: '92%' }} />
          </Card>
        </CardGrid>
      </Group>
      {children}
    </Panel>
  );
};

Wrapp.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.any
};