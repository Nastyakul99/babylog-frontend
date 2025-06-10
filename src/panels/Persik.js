import { Panel, PanelHeader, PanelHeaderBack, Placeholder } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import PersikImage from '../assets/persik.png';
import { Wrapp } from './Wrapp';

export const Persik = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Wrapp id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        Persik
      </PanelHeader>
      <Placeholder>
        <img width={230} src={PersikImage} alt="Persik The Cat" />
      </Placeholder>
    </Wrapp>
  );
};

Persik.propTypes = {
  id: PropTypes.string.isRequired,
};
