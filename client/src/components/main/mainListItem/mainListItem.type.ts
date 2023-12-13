import { type productItem } from '../../../store/products/store';

export interface mainListItemType {
  product: productItem;
  icon: React.JSX.Element;
  onClick: () => void
  timer?: string
}
