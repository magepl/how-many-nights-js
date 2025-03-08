let timesArr = [];

const form = document.getElementById("dateForm");
const timeFeed = document.getElementById("time-feed");
const startDate = document.getElementById("start-date-el").value;
const endDate = document.getElementById("end-date-el").value;

function calculateNights(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end.getTime() - start.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return Math.abs(Math.round(daysDifference));
}

// For testing
// console.log(calculateNights("01/01/0001", "01/03/0001"));

form?.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const newTime = {
    startTime: formData.get("startDate"),
    endTime: formData.get("endTime"),
    totalNights: calculateNights(
      formData.get("startDate"),
      formData.get("endDate")
    ),
  };
  timesArr.push(newTime);
  form.reset();
  renderTimes();
});

// document.getElementById("dateForm")?.addEventListener("submit", getTimes);

// Render times
function renderTimes() {
  let timesData = [];
  if (timesArr.length === 0) {
    timesData = "<p class='text-center'>No times to display!</p>";
  } else {
    for (let i = 0; i < timesArr.length; i++) {
      timesData += `<div class="w-full ">
      <div class="grid grid-cols-4 gap-4 items-center border-collapse border-y border-magegreen py-2">
      <p class="text-center">Start date: ${timesArr[i].startTime}</p>
      <p class="text-center">End date: ${timesArr[i].endTime}</p>
      <p class="text-center">Total nights: </p>
      <div class="flex justify-center items-center">
      <button id="delete-btn" class="cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
      </button>
      </div>
      </div>
      `;
    }
  }
  timeFeed.innerHTML = timesData;
}

// Reset button
document.getElementById("reset-btn")?.addEventListener("click", resetTimes);
function resetTimes() {
  timesArr = [];
  renderTimes();
  console.log("reset all times clicked");
}

// Delete button
document.getElementById("delete-btn")?.addEventListener("click", deleteTime);
function deleteTime() {
  console.log("delete time clicked");
}

// let timesArr: Object[] = [];
// if (timesArr) {
//   renderTimes();
// }
// timesArr = [];
// timeFeed.textContent = timesArr.join(", ");
