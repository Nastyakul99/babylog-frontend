import { Group, Card } from '@vkontakte/vkui';
import { Image, IconButton, } from '@vkontakte/vkui';
import { CardScroll } from '@vkontakte/vkui';
import { Header } from '@vkontakte/vkui';
import { useState } from 'react';
import './PanelGroups.css';
import PropTypes from 'prop-types';

export const PanelGroups = ({ header, onClick, groups = [] }) => {

    const [selected, setSelected] = useState(null);

    return <Group className="PanelGroups Workspace" mode="plain" header={<Header size="s">{header}</Header>}>
        <CardScroll className="Workspace__content" size={false}>
            {groups.map((g) => {
                return <Card
                    key={g.id}
                    className='PanelGroups__card'
                    onMouseEnter={() => setSelected(g)}
                    onMouseLeave={() => setSelected(null)}
                    mode={selected?.name === g.name ? null : "plain"}
                    onClick={() => { if (onClick != null) { onClick(g) } }}>
                    <IconButton
                        disabled={onClick == null}
                        className='PanelGroups__iconButton'
                        label={g.name} title={g.name} hasHover={false} hasActive={false}>
                        <Image src={g.img}></Image>
                    </IconButton>
                    <span>{g.name}</span>
                </Card>
            })}
        </CardScroll>
    </Group>
}

PanelGroups.propTypes = {
    header: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            img: PropTypes.string,
        })
    ),
};