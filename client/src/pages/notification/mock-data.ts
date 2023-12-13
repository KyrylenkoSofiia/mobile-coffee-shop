import { type notificationType } from './notification.type';

export const mockNotification: notificationType[] = [
  {
    id: '1',
    title: 'Package Delivered',
    message: 'Your package has been successfully delivered. Check your doorstep.',
  },
  {
    id: '2',
    title: 'Shipment Update',
    message: 'Your order #123456 is on its way. Expected delivery in 2 days.',
  },
  {
    id: '3',
    title: 'Delivery Confirmation',
    message: 'Thank you for choosing our service. Your parcel has been delivered.',
  },
  {
    id: '4',
    title: 'Shipping Information',
    message: 'Track your shipment with tracking number #789012345. Click here to check.',
  },
  {
    id: '5',
    title: 'Delivery Status',
    message: 'Your item is out for delivery. Expected delivery time: 4:00 PM - 6:00 PM.',
  },
  {
    id: '6',
    title: 'Package Received',
    message: 'We have received your package at our distribution center.',
  },
  {
    id: '7',
    title: 'Shipping Update',
    message: 'Good news! Your order is now out for delivery.',
  },
  {
    id: '8',
    title: 'Delivery Notification',
    message: 'Your parcel is scheduled for delivery today. Be available to receive it.',
  },
  {
    id: '9',
    title: 'Shipping Confirmation',
    message: 'Your order has been processed and is ready for shipment.',
  },
];
