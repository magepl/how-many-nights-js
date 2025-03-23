let timesArr = [];

const form = document.getElementById("dateForm");
const timeFeed = document.getElementById("time-feed");
const startDate = document.getElementById("start-date-el").value;
const endDate = document.getElementById("end-date-el").value;
const overallNightsEl = document.getElementById("overall-nights");

function calculateNights(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const timeDifference = end.getTime() - start.getTime();
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return Math.abs(Math.round(daysDifference));
}

let runningTotalNights = 0;

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

// For testing
// console.log(calculateNights("01/01/0001", "01/03/0001"));

form?.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const nightsForThisDate = calculateNights(
    formData.get("startDate"),
    formData.get("endDate")
  );
  runningTotalNights += nightsForThisDate;

  const newTime = {
    startTime: formData.get("startDate"),
    endTime: formData.get("endDate"),
    totalNights: nightsForThisDate,
    runningTotalNights: runningTotalNights,
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
      <p class="text-center">Start date: ${formatDate(
        timesArr[i].startTime
      )}</p>
      <p class="text-center">End date: ${formatDate(timesArr[i].endTime)}</p>
      <p class="text-center">Total nights: ${timesArr[i].totalNights}</p>
      <div class="flex justify-center items-center">
      <button class="delete-btn cursor-pointer" data-index="${i}">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
      </button>
      </div>
      </div>
      `;
    }
    overallNightsEl.innerHTML = `Total overall nights: ${runningTotalNights}`;
  }
  timeFeed.innerHTML = timesData;
}

// Reset button
document.getElementById("reset-btn")?.addEventListener("click", resetTimes);
function resetTimes() {
  timesArr = [];
  renderTimes();
}

// Delete button
timeFeed.addEventListener("click", function (e) {
  const deleteBtn = e.target.closest(".delete-btn");
  if (deleteBtn) {
    const index = parseInt(deleteBtn.dataset.index);
    timesArr.splice(index, 1);
    renderTimes();
  }
});
