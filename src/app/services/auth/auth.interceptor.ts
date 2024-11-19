import { HttpInterceptorFn } from '@angular/common/http';

const publicUrls = [
  '/api/usuario/profile',
  '/api/usuario/login',
  '/api/usuario/'

];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
  return next(req);
};
