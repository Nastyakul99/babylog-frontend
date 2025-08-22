import { ModalRoot, ModalPage } from '@vkontakte/vkui';
import {
  useActiveVkuiLocation,
  useRouteNavigator,
  useSearchParams,
} from '@vkontakte/vk-mini-apps-router';
import { MODALS } from '../../routes';
import { EditBabyModal } from './EditBabyModal';

const AppModalRoot = ({ person = {}, addBaby = async () => { },
  getBaby = async () => { },
  updateBaby = async () => { } }) => {
  const { modal: activeModal } = useActiveVkuiLocation();
  const routeNavigator = useRouteNavigator();
  const [searchParams] = useSearchParams();

  const onClose = () => {
    routeNavigator.hideModal(Boolean(searchParams.get('stepBack')));
  };

  return (
    <ModalRoot activeModal={activeModal} onClose={onClose}>
      <ModalPage id={MODALS.EDIT_BABY_MODAL} onClose={onClose}>
        <EditBabyModal person={person} onClose={onClose}
          add={addBaby} get={getBaby} update={updateBaby}>
        </EditBabyModal>
      </ModalPage>
    </ModalRoot>
  );
};

export default AppModalRoot;
