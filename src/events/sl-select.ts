import type SlMenuItem from '../components/menu-item/menu-item';

type SlSelectEvent = CustomEvent<{ item: SlMenuItem }>;

export default SlSelectEvent;
