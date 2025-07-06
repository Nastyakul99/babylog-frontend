import { Panel, PanelHeader, Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import { Wrapp } from './wrapp/Wrapp';
import { PanelActivities } from './wrapp/PanelGroups/PanelActivities';
import { useParams } from '@vkontakte/vk-mini-apps-router';

export const Activities = ({ id }) => {
  const { groupId } = useParams();

  return (
    <Wrapp id={id}>
      <PanelActivities groupId={groupId}></PanelActivities>
    </Wrapp>
  );
};

Activities.propTypes = {
  id: PropTypes.string.isRequired,
};
