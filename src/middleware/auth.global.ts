import { defineNuxtRouteMiddleware, navigateTo, useUserSession } from "#imports";

export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();
  const anonymousRoutes = ['/register', '/login'];

  // Si el usuario no está logueado y no está yendo a /login, redirigir a /login
  if (!loggedIn.value && !anonymousRoutes.includes(to.path)) {
    return navigateTo('/login');
  }

  // Si el usuario está logueado y trata de ir a /login, redirigir a la página de inicio
  if (loggedIn.value && to.path === '/login') {
    return navigateTo('/');
  }

})