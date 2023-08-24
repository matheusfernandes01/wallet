const onCallRegister = async (email, name) => {
  try {
    const data = {
      email,
      name,
    };

    const response = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/users`,
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const user = await response.json();
    return user;
  } catch (error) {
    return { error };
  }
};

const onRegister = async () => {
  const email = document.getElementById("input-email").value;
  const name = document.getElementById("input-name").value;

  if (name.length < 3) {
    alert("nome deve conter mais do que 3 caracteres.");
    return;
  }

  if (email.length < 5 || !email.includes("@")) {
    alert("email negado");
    return;
  }

  const result = await onCallRegister(email, name);

  if (result.error) {
    alert("falha ao validar email");
    return;
  }
  localStorage.setItem("@Walletapp:userEmail", result.email);
  localStorage.setItem("@Walletapp:userName", result.name);
  localStorage.setItem("@Walletapp:userId", result.id);
  window.open("../home/index.html", "_self");
};

window.onload = () => {
  const form = document.getElementById("form-register");
  form.onsubmit = (event) => {
    event.preventDefault();
    onRegister();
  };
};
