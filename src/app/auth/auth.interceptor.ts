import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

// Uso un interceptor en forma de función en lugar de clase, porque asi funciona en las nuevas versiones de Angular
export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('token');
  const router = inject(Router);

  let clonedReq = req;

  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthRequest = req.url.includes('/auth/login') || req.url.includes('/auth/register');

      if (error.status === 401 && !isAuthRequest) {
        alert('Tu sesión ha expirado. Por favor iniciá sesión nuevamente.');
        localStorage.removeItem('token');
        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    })
  );
};
