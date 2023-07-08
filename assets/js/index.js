const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");
const ageCalculate = document.getElementById("btn-calculate");
const result = document.getElementById("result");

ageCalculate.addEventListener("click", () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  const birthYear = parseInt(year.value);
  const birthMonth = parseInt(month.value);
  const birthDay = parseInt(day.value);

  if (
    birthMonth < 1 ||
    birthMonth > 12 ||
    birthDay < 1 ||
    birthDay > getDaysInMonth(birthYear, birthMonth)
  ) {
    result.innerHTML = `
        <div class="error-content">
          <p>Por favor, insira uma data válida.</p>
        </div>
      `;
    return;
  }

  let years = currentYear - birthYear;
  let months = currentMonth - birthMonth;
  let days = currentDay - birthDay;

  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    const prevMonthDate = new Date(currentYear, currentMonth - 1, 0);
    days += prevMonthDate.getDate();
    months--;
  }

  result.innerHTML = `
      <div class="result-content">
        <p>${years} <span>years</span></p>
        <p>${months} <span>months</span></p>
        <p>${days} <span>days</span></p>
      </div>
    `;
});

function getDaysInMonth(year, month) {
  if (month === 2) {
    return isLeapYear(year) ? 29 : 28;
  } else if ([4, 6, 9, 11].includes(month)) {
    return 30;
  } else {
    return 31;
  }
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
