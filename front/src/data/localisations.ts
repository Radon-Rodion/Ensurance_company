export interface ILocalisation {
  key: number;
  language: string;
  select: string;
  signIn: string;
  signUp: string;
  emailInvalid: string;
  username: string;
  usernameInvalid: string;
  passwordInvalid: string;
  passwordRepeatInvalid: string;
  requiredFieldInvalid: string;
  menu: string;
  proposal: string;
  name: string;
  description: string;
  catalogue: string;
  price: string;
  addToCatalogue: string;
  addToSelected: string;
  selected: string;
  contracts: string;
  ensurance_requests: string;
  comment: string;
  photo: string;
  users: string;
  login: string;
  register: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordRepeat: string;
  email: string;
  passportNumber: string;
  phoneNumber: string;
  bankNumber: string;
  roleId: string;
  status: string;
  roles: string;
  contract_transactions: string;
  transactions: string;
  sum: string;
  sender: string;
  reciever: string;
  contractId: string;
  transactionId: string;
  date: string;
  enter: string;
  cancel: string;
  invalidEnter: string;
  create: string;
  requireContract: string;
  exit: string;
}

const localisations: Array<ILocalisation> = [
  {
    key: 0,
    language: "English",
    select: "Language",
    signIn: "Sign In",
    signUp: "Sign Up",
    emailInvalid: "Please, enter email fitting placeholder example!",
    username: "User name",
    usernameInvalid: "Please, use up to 16 latin letters or digits!",
    passwordInvalid: "8 to 16 latin symbols in all cases, numbers and _ symbols!",
    passwordRepeatInvalid: "Password and password repeat aren't equal!",
    requiredFieldInvalid: "This field is required!",
    menu: "Menu",
    proposal: "Proposal",
    name: "Name",
    description: "Description",
    catalogue: "Catalogue",
    price: "Price per Year",
    addToCatalogue: "Add to catalogue",
    addToSelected: "Add to selected",
    selected: "Selected",
    contracts: "Contracts",
    ensurance_requests: "Ensurance requests",
    comment: "Comment",
    photo: "Photo approvement link",
    users: "users",
    login: "Login",
    register: "Register",
    firstName: "First name",
    lastName: "Last Name",
    password: "Password",
    passwordRepeat: "Repeat password",
    email: "Email",
    passportNumber: "Passport number",
    phoneNumber: "Phone number",
    bankNumber: "Bank number",
    roleId: "Role id",
    status: "Status",
    roles: "roles",
    contract_transactions: "Contract transactions",
    transactions: "transactions",
    sum: "Transaction sum ($)",
    sender: "Sender bank number",
    reciever: "Reciever bank number",
    contractId: "Contract Id",
    transactionId: "Transaction Id",
    date: "Date",
    enter: "Enter",
    cancel: "Cancel",
    invalidEnter: "Invalid enter!",
    create: "Create new",
    requireContract: "Require contract",
    exit: "Exit",
  },
  {
    key: 1,
    language: "Русский",
    select: "Язык",
    signIn: "Вход",
    signUp: "Регистрация",
    emailInvalid: "Пожалуйста, введите Email сообразно примеру!",
    username: "Имя пользователя",
    usernameInvalid: "Пожалуйста, используйте только до 16 латинских символов и цифр",
    password: "Пароль",
    passwordInvalid: "От 8 до 16 латинских символов в обоих регистрах, цифр и символов _!",
    passwordRepeat: "Повтор пароля",
    passwordRepeatInvalid: "Пароль и повтор пароля не совпадают!",
    requiredFieldInvalid: "Данное поле обязательно!",
    menu: "Меню",
    proposal: "Предложения",
    name: "Имя",
    description: "Описание",
    catalogue: "Каталог",
    addToCatalogue: "Добавить в каталог",
    addToSelected: "Добавить в избранное",
    price: "Цена в год",
    selected: "Избранное",
    contracts: "Контракты",
    ensurance_requests: "Запросы на страхование",
    comment: "Комментарий",
    photo: "Ссылка на подтверждающее фото",
    users: "Пользователи",
    login: "Вход",
    register: "Регистрация",
    firstName: "Имя",
    lastName: "Фамилия",
    email: "Email",
    passportNumber: "Серия и номер паспорта",
    phoneNumber: "Номер телефона",
    bankNumber: "Банковский номер",
    roleId: "Id роли",
    status: "Статус",
    roles: "Роли",
    contract_transactions: "Транзакции по контрактам",
    transactions: "Транзакции",
    sum: "Сумма транзакции",
    sender: "Банковский номер отправителя",
    reciever: "Банковский номер получателя",
    contractId: "Id контракта",
    transactionId: "Id транзакции",
    date: "Дата",
    enter: "ввод",
    cancel: "отмена",
    invalidEnter: "некорректный ввод",
    create: "создать",
    requireContract: "Запросить договор",
    exit: "Выход",
  },
];

export default localisations;
