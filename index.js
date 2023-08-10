const validateUser = async (email) => {
  try {
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/users?email=${email}`
    );

    const user = await result.json();
    return user;
  } catch (error) {}
  return { error };
};

const onClickLogin = async () => {
  const email = document.getElementById("input-email").value;
  if (email.length < 5 || !email.includes("@")) {
    alert("email negado");
    return;
  }

  const result = await validateUser(email);
  console.log(result);
  if (result.error) {
    alert("falha ao validar email");
    return;
  }
  localStorage.setItem("@Walletapp:userEmail", result.email);
  localStorage.setItem("@Walletapp:userName", result.name);
  localStorage.setItem("@Walletapp:userId", result.id);
  window.open("src/pages/home/index.html", "_self");
};
