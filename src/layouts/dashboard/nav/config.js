// component
import SvgColor from '../../../components/svg-color';
// utils
import { ROLE_ADMIN, ROLE_DELIVERY, ROLE_RESTMAN, ROLE_USER } from 'src/sections/auth/login/constants';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
    roles: []
  },
  {
    title: 'restaurants',
    path: '/dashboard/restaurants',
    icon: icon('ic_restaurant'),
    roles: [ROLE_ADMIN, ROLE_USER]
  },
  {
    title: 'orders',
    path: '/dashboard/orders',
    icon: icon('ic_orders'),
    roles: [ROLE_ADMIN, ROLE_USER, ROLE_DELIVERY, ROLE_RESTMAN]
  },
  {
    title: 'products',
    path: '/dashboard/products',
    icon: icon('ic_products'),
    roles: [ROLE_RESTMAN]
  },
];

export default navConfig;
