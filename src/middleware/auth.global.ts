export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useUserSession();

  // Si el usuario no está logueado y no está yendo a /login, redirigir a /login
  if (!loggedIn.value && to.path !== '/login') {
    return navigateTo('/login');
  }

  // Si el usuario está logueado y trata de ir a /login, redirigir a la página de inicio
  if (loggedIn.value && to.path === '/login') {
    return navigateTo('/');
  }

})