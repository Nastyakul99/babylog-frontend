import PropTypes from 'prop-types';
import { Wrapp } from './wrapp/Wrapp';
import { PanelActivities } from './wrapp/PanelGroups/PanelActivities';

export const Activities = ({ id, selectedBaby, createRecord = () => { }, activities = [], ...props }) => {
  return (
    <Wrapp id={id} selectedBaby={selectedBaby} {...props}>{
      selectedBaby && <PanelActivities activities={activities} babyId={selectedBaby.id} createRecord={createRecord}>
      </PanelActivities>}
    </Wrapp>
  );
};

Activities.propTypes = {
  id: PropTypes.string.isRequired,
  selectedBaby: PropTypes.object,
  createRecord: PropTypes.func,
  activities: PropTypes.array,
};
