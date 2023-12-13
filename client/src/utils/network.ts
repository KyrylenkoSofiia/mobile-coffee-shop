export const baseUrl = 'https://coffee-backend-c5mgeifuy-kyrylenkosofiia.vercel.app';

// user
export const baseUserUrl = `${baseUrl}/user`;

// auth
export const loginUrl = `${baseUrl}/auth/login`;
export const registerUrl = `${baseUrl}/auth/register`;
export const whoAmI = `${baseUserUrl}/me`;
export const logoutUrl = `${baseUrl}/auth/logout`;

// files
export const saveAvatar = `${baseUrl}/files/upload/avatars`;
export const addProductImage = `${baseUrl}/files/upload/products`;

// products
export const getAllProductsUrl = (query?: string) => `${baseUrl}/product/all${query ? `?search=${query}` : ''}`;
export const createProductUrl = `${baseUrl}/product/create`;
export const productByIdUrl = (id: string) => `${baseUrl}/product/${id}`

// user actions
export const favoriteUrl = `${baseUserUrl}/favorite`;
export const allBagUrl = `${baseUrl}/order/all`
export const favoriteByIdUrl = (id: string) => `${baseUserUrl}/favorite/${id}`
export const updateUserData = `${baseUserUrl}/update`;

// order actions
export const order = baseUrl + '/order';
export const createOrder = order + '/create';
export const updateOrder = order + '/update';
export const orderById = (id: string) => order + '/' + id;
