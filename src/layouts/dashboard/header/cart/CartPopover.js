import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import { noCase } from 'change-case';
import { faker } from '@faker-js/faker';
import { useState } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListItem,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  Stack, 
} from '@mui/material';
// utils
import { fToNow } from '../../../../utils/formatTime';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import { useCart } from './CartProvider';
import { MODAL_TYPES, useGlobalModalContext } from 'src/components/dialogs/DialogProvider';

// ----------------------------------------------------------------------

export default function CartPopover() {
  const { cart, clearCart } = useCart();
  const { showModal } = useGlobalModalContext();

  const totalProducts = cart.products.length;
  const totalPrice = cart.products.reduce((accumulator, current) => accumulator + current.price * current.quantity, 0);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleClearCart = () => {
    showModal(MODAL_TYPES.CONFIRM_MODAL, {
      title: "Are you sure you want to clear the cart?",
      description: "By clearing the entire cart, you will lose the current selected products.",
      confirmCallback: () => clearCart()
    })
  }

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalProducts} color="error">
          <Iconify icon="ic:round-shopping-cart" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Your cart</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Your total: {totalPrice} RON
            </Typography>
          </Box>

          {totalProducts > 0 && (
            <Tooltip title="Empty cart">
              <IconButton color="primary" onClick={handleClearCart}>
                <Iconify icon="mdi:trash-can" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        { totalProducts > 0 && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />

            <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
              <List
                disablePadding
              >
                {cart.products.map((product, index) => (
                  <CartItem key={`cart-item-${index}`} product={product} />
                ))}
              </List>
            </Scrollbar>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Box sx={{ p: 1 }}>
              <Button fullWidth disableRipple>
                Place order
              </Button>
            </Box>
          </>
        )}
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

CartItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function CartItem({ product }) {
  const { changeProductQuantity } = useCart();
  const { title } = renderContent(product);

  return (
    <Stack direction="row" justifyContent="center" alignItems="center">
      <ListItem
        sx={{
          py: 1.5,
          px: 2.5,
          mt: '1px',
        }}
      >
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled',
              }}
            >
              {product.quantity * product.price} RON
            </Typography>
          }
        />
      </ListItem>
      <Stack direction="row" alignItems="center" pr={2}>
        <IconButton aria-label="Decrease the quantity" onClick={() => changeProductQuantity(product, -1)}>
          <Iconify icon="ic:baseline-minus" />
        </IconButton>
        <Typography px={1}>{ product.quantity }</Typography>
        <IconButton aria-label="Increase the quantity" onClick={() => changeProductQuantity(product, 1)}>
          <Iconify icon="ic:baseline-plus" />
        </IconButton>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.productName}
    </Typography>
  );

  return { title };
}
