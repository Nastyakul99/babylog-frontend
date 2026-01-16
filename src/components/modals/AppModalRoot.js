import { ModalRoot, ModalPage } from '@vkontakte/vkui';
import {
  useActiveVkuiLocation,
  useRouteNavigator,
  useSearchParams,
} from '@vkontakte/vk-mini-apps-router';
import { MODALS } from '../../routes';
import { EditBabyModal } from './EditBabyModal';
import { EditRecordModal } from './EditRecordModal/EditRecordModal';
import { InfoAlerts } from '../../panels/wrapp/InfoAlert/InfoAlerts';

const AppModalRoot = ({ person, addBaby = async () => { },
  getBaby = async () => { },
  updateBaby = async () => { },
  getRecord = async () => { },
  updateRecord = async () => { },
  getActivityById = () => { },
  refreshRecord = () => { },
  records = [] }) => {
  const { modal: activeModal } = useActiveVkuiLocation();
  const routeNavigator = useRouteNavigator();
  const [searchParams] = useSearchParams();

  const onClose = () => {
    routeNavigator.hideModal(Boolean(searchParams.get('stepBack')));
  };

  return (
    person.vkId && <ModalRoot activeModal={activeModal} onClose={onClose}>
      <InfoAlerts></InfoAlerts>
      <ModalPage settlingHeight={99} id={MODALS.EDIT_BABY_MODAL} onClose={onClose}>
        <EditBabyModal onClose={onClose}
          add={addBaby} get={getBaby} update={updateBaby}>
        </EditBabyModal>
      </ModalPage>
      <ModalPage settlingHeight={99} id={MODALS.EDIT_RECORD} onClose={onClose}>
        <EditRecordModal
          onClose={onClose}
          get={getRecord}
          update={updateRecord}
          getActivityById={getActivityById}
          refreshRecord={refreshRecord}
          records={records}>
        </EditRecordModal>
      </ModalPage>
    </ModalRoot>
  );
};

export default AppModalRoot;
