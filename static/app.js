const pond = FilePond.create({
  multiple: false,
  name: 'filepond',
  server: "/upload"
});

pond.on('processfile', (e, file) => {
  const json = file.serverId;
  const data = JSON.parse(json);

  const id = data.id;

  const link = document.createElement('a');

  link.href = window.location + 'd/' + id;
  link.textContent = link.href;

  pond.element.remove();
  document.body.appendChild(link);
});

// Add it to the DOM
document.body.appendChild(pond.element);
