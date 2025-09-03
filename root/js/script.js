const timeline = document.getElementById('timeline');
const timelineData = [];
let dragSrcIndex = null;

function renderTimeline() {
  timeline.innerHTML = '';
  timelineData.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card collapsed';
    card.draggable = true;
    card.dataset.index = index;

    const header = document.createElement('div');
    header.className = 'card-header';
    header.textContent = item.title;

    const body = document.createElement('div');
    body.className = 'card-body';
    body.innerHTML = Object.entries(item.data)
      .map(([k, v]) => `<div><strong>${k}：</strong>${v}</div>`)
      .join('');

    header.addEventListener('click', () => card.classList.toggle('collapsed'));
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragover', handleDragOver);
    card.addEventListener('drop', handleDrop);

    card.appendChild(header);
    card.appendChild(body);
    timeline.appendChild(card);
  });
}

function handleDragStart(e) {
  dragSrcIndex = this.dataset.index;
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  const toIndex = this.dataset.index;
  if (dragSrcIndex === null || dragSrcIndex === toIndex) return;
  const item = timelineData.splice(dragSrcIndex, 1)[0];
  timelineData.splice(toIndex, 0, item);
  renderTimeline();
}

document.getElementById('add-departure').addEventListener('click', () => {
  const location = document.getElementById('dep-location').value;
  const time = document.getElementById('dep-time').value;
  const link = document.getElementById('dep-link').value;
  const data = { 地点: location, 时间: time, 链接: link };
  timelineData.push({ type: 'departure', title: `出发地 - ${location}`, data });
  renderTimeline();
});

function showTransportForm(type) {
  const container = document.getElementById('transport-form-container');
  container.innerHTML = '';
  const template = document.getElementById(`transport-${type}-template`);
  const node = template.content.cloneNode(true);
  node.querySelector('.confirm').addEventListener('click', () => {
    const inputs = node.querySelectorAll('input');
    const data = {};
    inputs.forEach((i) => (data[i.previousSibling.textContent] = i.value));
    let title = '';
    if (type === 'subway') {
      title = `地铁/自驾 ${data['起点']} → ${data['终点']}`;
    } else if (type === 'train') {
      title = `高铁/动车 ${data['车次']}`;
    } else if (type === 'plane') {
      title = `飞机 ${data['航班号']}`;
    }
    timelineData.push({ type, title, data });
    renderTimeline();
    container.innerHTML = '';
  });
  container.appendChild(node);
}

function showLocationForm(type) {
  const container = document.getElementById('location-form-container');
  container.innerHTML = '';
  const template = document.getElementById(`location-${type}-template`);
  const node = template.content.cloneNode(true);
  node.querySelector('.confirm').addEventListener('click', () => {
    const inputs = node.querySelectorAll('input');
    const data = {};
    inputs.forEach((i) => (data[i.previousSibling.textContent] = i.value));
    let title = '';
    if (type === 'hotel') title = `酒店 ${data['名称']}`;
    if (type === 'restaurant') title = `饭店 ${data['名称']}`;
    if (type === 'scenic') title = `景点 ${data['名称']}`;
    if (type === 'event') title = `活动会场 ${data['会场名'] || data['名称']}`;
    timelineData.push({ type, title, data });
    renderTimeline();
    container.innerHTML = '';
  });
  container.appendChild(node);
}

document.getElementById('export-json').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(timelineData, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'timeline.json';
  a.click();
  URL.revokeObjectURL(url);
});
