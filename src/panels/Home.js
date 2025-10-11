import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import { Wrapp } from './wrapp/Wrapp';
import { PanelActivityGroups } from './wrapp/PanelGroups/PanelActivityGroups';

export const Home = ({
  id,
  babies = [],
  selectedBaby = null,
  onChangeBaby = () => { },
  groups = [],
  ...props }) => {
  const routeNavigator = useRouteNavigator();

  const onGroupClick = (group) => {
    if (group && group.id && selectedBaby) {
      routeNavigator.push(group?.id?.toString())
    }
  }

  return (
    <Wrapp id={id} babies={babies} selectedBaby={selectedBaby} onChangeBaby={onChangeBaby} {...props}>
      <PanelActivityGroups onClick={onGroupClick} groups={groups}></PanelActivityGroups>
    </Wrapp>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  babies: PropTypes.array,
  selectedBaby: PropTypes.object,
  onChangeBaby: PropTypes.func,
  groups: PropTypes.array,
};
