document.getElementById('show-register').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('.login-container').style.transform = 'translateX(-100%)';
  document.querySelector('.register-container').style.transform = 'translateX(0)';
});

document.getElementById('show-login').addEventListener('click', function(e) {
  e.preventDefault();
  document.querySelector('.login-container').style.transform = 'translateX(0)';
  document.querySelector('.register-container').style.transform = 'translateX(100%)';
});

const container = document.querySelector('.container');

for (let i = 0; i < 10; i++) {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  container.appendChild(snowflake);
}
