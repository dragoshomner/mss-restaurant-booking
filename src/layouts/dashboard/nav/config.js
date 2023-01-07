// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'restaurants',
    path: '/dashboard/restaurants',
    icon: icon('ic_restaurant'),
  },
  {
    title: 'orders',
    path: '/dashboard/orders',
    icon: icon('ic_orders'),
  },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: icon('ic_products'),
  },
];

export default navConfig;
