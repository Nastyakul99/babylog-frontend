import { Header, Button, Group, Cell, Div, Avatar } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import { Wrapp } from './wrapp/Wrapp';
import { PanelActivityGroups } from './wrapp/PanelGroups/PanelActivityGroups';

export const Home = ({ id, user }) => {
  const { photo_200, city, first_name, last_name } = { ...user };
  const routeNavigator = useRouteNavigator();

  const onGroupClick = (group) => {
    routeNavigator.push(group?.id?.toString())
  }

  return (
    <Wrapp id={id}>
      <PanelActivityGroups onClick={onGroupClick}></PanelActivityGroups>
      {user && (
        <Group header={<Header size="s">User Data Fetched with VK Bridge</Header>}>
          <Cell before={photo_200 && <Avatar src={photo_200} />} subtitle={city?.title}>
            {`${first_name} ${last_name}`}
          </Cell>
        </Group>
      )}

      <Group header={<Header size="s">Navigation Example</Header>}>
        <Div>
          <Button stretched size="l" mode="secondary" onClick={() => routeNavigator.push('persik')}>
            Покажите Персика, пожалуйста!
          </Button>
        </Div>
      </Group>
    </Wrapp>
  );
};

Home.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    photo_200: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    city: PropTypes.shape({
      title: PropTypes.string,
    }),
  }),
};
