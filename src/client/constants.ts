import { CrudAction } from './types';

export const PATHS = {
  HOME: '/',
  CLASSES: '/classes',
  MEMBERS: '/members',
  CONFIGURATIONS: '/config',
  LOGIN: '/login',
  VISIT: '/visit',
};

export const GENERAL_ERROR_MESSAGES: Record<CrudAction, string> = {
  adding: 'Hubo un error al agregando los datos, intentalo nuevamente',
  deleting:
    'Hubo un error al tratar de eliminar el registro, intentalo nuevamente',
  loading:
    'Hubo un error al cargar la información, intentalo nuevamente refrescando la pagina',
  updating:
    'Hubo un error al tratar de actualizar el registro, intentalo nuevamente',
};
