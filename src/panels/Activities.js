import PropTypes from 'prop-types';
import { Wrapp } from './wrapp/Wrapp';
import { PanelActivities } from './wrapp/PanelGroups/PanelActivities';

export const Activities = ({ id, baby, createRecord = () => { }, activities = [], ...props }) => {
  return (
    <Wrapp id={id} {...props}>{
      baby && <PanelActivities activities={activities} babyId={baby.id} createRecord={createRecord}>
      </PanelActivities> || "Добавьте малыша"}
    </Wrapp>
  );
};

Activities.propTypes = {
  id: PropTypes.string.isRequired,
  baby: PropTypes.object,
  createRecord: PropTypes.func,
  activities: PropTypes.array,
};
