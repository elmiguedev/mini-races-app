export function useActions(): Record<string, any> {
  // @ts-ignore
  const nitroApp = useNitroApp()
  // @ts-ignore
  return nitroApp.actions;
}