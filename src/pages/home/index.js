const renderFinanceElements = (data) => {
  const totalItens = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const totalValue = revenues - expenses;

  //total
  const financeCard1 = document.getElementById("finance-card-1");
  const totalText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalItens)
  );
  const totalElement = document.createElement("h2");
  totalElement.className = "mt smaller";
  totalElement.appendChild(totalText);
  financeCard1.appendChild(totalElement);

  //revenue
  const financeCard2 = document.getElementById("finance-card-2");
  const revenueText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(revenues)
  );
  const revenueTextElement = document.createElement("h2");
  revenueTextElement.className = "mt smaller";
  revenueTextElement.appendChild(revenueText);
  financeCard2.appendChild(revenueTextElement);

  //expenses
  const financeCard3 = document.getElementById("finance-card-3");
  const expensesText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(expenses)
  );
  const expensesElement = document.createElement("h2");
  expensesElement.className = "mt smaller";
  expensesElement.appendChild(expensesText);
  financeCard3.appendChild(expensesElement);

  //balance
  const financeCard4 = document.getElementById("finance-card-4");
  const balanceText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalValue)
  );
  const balanceElement = document.createElement("h2");
  balanceElement.className = "mt smaller";
  balanceElement.style.color = "#5936cd";
  balanceElement.appendChild(balanceText);
  financeCard4.appendChild(balanceElement);
};

const onLoadFinecesData = async () => {
  try {
    const date = "2022-12-15";
    const email = localStorage.getItem("@Walletapp:userEmail");
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      {
        method: "GET",
        headers: {
          email: email,
        },
      }
    );
    const data = await result.json();
    renderFinanceElements(data);
    console.log(data);
    return data;
  } catch (error) {
    return { error };
  }
};

const onloadUserInfo = () => {
  const email = localStorage.getItem("@Walletapp:userEmail");
  const name = localStorage.getItem("@Walletapp:userName");

  const navbarUserInfo = document.getElementById("navbar-user-container");
  const navBarUserAvatar = document.getElementById("navbar-user-avatar");

  // add user email
  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navbarUserInfo.appendChild(emailElement);

  // add logout link
  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("sair");
  logoutElement.appendChild(logoutText);
  navbarUserInfo.appendChild(logoutElement);

  // add user first letter inside avatar
  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name.charAt(0));
  nameElement.appendChild(nameText);
  navBarUserAvatar.appendChild(nameElement);
};

window.onload = () => {
  onloadUserInfo();
  onLoadFinecesData();
};
