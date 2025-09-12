import { Group, Card } from '@vkontakte/vkui';
import { Image, IconButton, } from '@vkontakte/vkui';
import { CardScroll } from '@vkontakte/vkui';
import { Header } from '@vkontakte/vkui';
import { useState } from 'react';
import './PanelGroups.css';
import PropTypes from 'prop-types';
import { ActivityGroup } from '../../../api/types/types';

export const PanelGroups = ({ header, onClick = () => { }, groups = [] }) => {

    const [selected, setSelected] = useState(null);

    return <Group header={<Header size="s">{header}</Header>}>
        <CardScroll size={false} padding={true}>
            {groups.map((g) => {
                return <Card
                    key={g.id}
                    className='PanelGroups__card'
                    onMouseEnter={() => setSelected(g)}
                    onMouseLeave={() => setSelected(null)}
                    mode={selected?.name === g.name ? null : "plain"} >
                    <IconButton
                        className='PanelGroups__iconButton'
                        onClick={() => { onClick(g) }}
                        label={g.name} title={g.name} hasHover={false}>
                        <Image src={g.img}></Image>
                    </IconButton>
                </Card>
            })}
        </CardScroll>
    </Group>
}

PanelGroups.propTypes = {
    header: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    groups: PropTypes.arrayOf(PropTypes.instanceOf(ActivityGroup)),
};