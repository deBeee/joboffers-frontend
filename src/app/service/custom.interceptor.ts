// import { HttpInterceptorFn } from '@angular/common/http';
//
// export const customInterceptor: HttpInterceptorFn = (req, next) => {
//   debugger;
//
//   const token = localStorage.getItem('token');
//
//   const clonedRequest = req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//
//   return next(clonedRequest);
// };
