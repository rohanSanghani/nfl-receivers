const apiUrl = 'https://api.sportsdata.io/v3/nfl/stats/json/PlayerSeasonStats/2023?key=d9ae2493c49b49a7a8ff88f4b2f7786d';

document.getElementById('fetch-button').addEventListener('click', function() {
  fetchTopReceivers();
});

function fetchTopReceivers() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', apiUrl, true);

  xhr.onload = function() {
    if (this.status === 200) {
      const data = JSON.parse(this.responseText);
      displayTopReceivers(data);
    } else {
      console.error('Error fetching data');
    }
  };

  xhr.onerror = function() {
    console.error('Request error...');
  };

  xhr.send();
}

function displayTopReceivers(players) {
  const list = document.getElementById('receivers-list');
  list.innerHTML = ''; // Clear previous list

  //sort by receiving yards, select top 10
  const topReceivers = players.sort((a, b) => b.ReceivingYards - a.ReceivingYards).slice(0, 10);

  topReceivers.forEach(player => {
    const listItem = document.createElement('li');
    listItem.textContent = `${player.Name}: ${player.ReceivingYards} yards`;
    list.appendChild(listItem);
  });
}
