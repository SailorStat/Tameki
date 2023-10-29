class Tips {
  static addToColumnIdInWorkspace = ({ name, columnId }: { columnId: string; name: string }) =>
    `Add "${name}" to column "${columnId}" settings in Workspace"`;

  static checkComponentParam = ({ name }: { name: string }) =>
    `Сheck if the parameter ${name} is contained in the component`;

  static checkIsComboBoxStateProviderPluggedIn = () =>
    "Make sure you have the correct combobox state provider plugged in";

  static checkIsProviderPluggedIn = () => "Make sure you have the correct store provider plugged in";

  static checkResponse = () => "Check if there is a value in the response";

  static currentFilterCannotBeSaved = () => "The current filter cannot be saved without a name or value";

  static currentNavigatePageHaveNotNestedPages = () => "The current navigation page doesn't have any nested pages";

  static setStoreInfo = ({ name, store }: { name: string; store: string }) => `Set "${name}" to "${store}" info"`;

  static viewCannotBeSaved = () => "The view cannot be saved without a name or with empty checked column ids";

  static addRootToDocument = () => "Добавь root класс в html-разметку";
}

export default Tips;
