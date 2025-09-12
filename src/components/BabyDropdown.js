import { Select } from "@vkontakte/vkui"
import PropTypes from "prop-types"
import { Baby } from "../api/types/types"

export const BabyDropdown = ({ babies = [], selectedBabyId, onChangeBaby = () => { } }) => {
    const options = babies.map((b) => { return { value: b.id, label: b.name } })
    return (
        <Select
            mode="plain"
            options={options}
            value={selectedBabyId}
            onChange={(_, newBabyId) => {
                const newBaby = babies.find((b) => String(b.id) === newBabyId);
                onChangeBaby(newBaby);
            }}>
        </Select>
    );
}

BabyDropdown.propTypes = {
  babies: PropTypes.arrayOf(PropTypes.instanceOf(Baby)),
  selectedBabyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeBaby: PropTypes.func,
};